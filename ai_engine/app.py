import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pathlib import Path

# LangChain Imports
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings

# --- LOAD ENV ---
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# --- GEMINI SDK CONFIGURATION ---
# Using 'rest' transport for better stability on Windows/Localhost
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"), transport='rest')

# Using the 'latest' model version we verified in list_models.py
model = genai.GenerativeModel("gemini-2.5-flash")

app = Flask(__name__)
CORS(app)

# =========================
# EMBEDDINGS (LOCAL)
# =========================
# Runs on your CPU, no API key needed for this part
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vector_db = None

# =========================
# STATUS ENDPOINT
# =========================
@app.route('/status', methods=['GET'])
def get_status():
    global vector_db
    if vector_db is None and os.path.exists("faiss_index"):
        vector_db = FAISS.load_local(
            "faiss_index",
            embeddings,
            allow_dangerous_deserialization=True
        )
    return jsonify({
        "is_trained": vector_db is not None,
        "vector_count": vector_db.index.ntotal if vector_db else 0,
        "engine": "Gemini-2.5-Flash + FAISS (RAG)"
    })

# =========================
# TRAIN ENDPOINT
# =========================
@app.route('/train', methods=['POST'])
def train_model():
    global vector_db
    data = request.json
    documents = data.get('documents', [])

    if not documents:
        return jsonify({"error": "No documents provided"}), 400

    try:
        splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=700, # Increased for better context retention
            chunk_overlap=100
        )

        chunks = splitter.create_documents(documents)

        # Create or update FAISS index
        vector_db = FAISS.from_documents(chunks, embeddings)
        vector_db.save_local("faiss_index")

        print(f"✅ Training successful. Chunks created: {len(chunks)}")
        return jsonify({
            "message": f"Trained on {len(documents)} documents",
            "vector_count": vector_db.index.ntotal
        })

    except Exception as e:
        print("TRAIN ERROR:", e)
        return jsonify({"error": str(e)}), 500

# =========================
# CHAT ENDPOINT
# =========================
@app.route('/chat', methods=['POST'])
def chat():
    global vector_db
    data = request.json
    user_query = data.get('query')

    if not user_query:
        return jsonify({"error": "Query is required"}), 400

    # Ensure memory is synced with the latest 'Sync' from Admin panel
    if os.path.exists("faiss_index"):
        vector_db = FAISS.load_local(
            "faiss_index",
            embeddings,
            allow_dangerous_deserialization=True
        )

    if vector_db is None:
        return jsonify({"response": "System is currently untrained. Please sync knowledge in Admin Dashboard."})

    try:
        # 1. Retrieve the top 3 most relevant rules/FAQs
        docs = vector_db.similarity_search(user_query, k=3)
        context = "\n".join([f"- {doc.page_content}" for doc in docs])

        # 2. Build a natural, conversational prompt
        # We give the AI a personality and clear instructions
        prompt = f"""
You are the official TechStore Customer Support AI. 
Your goal is to provide accurate help based ONLY on the company data provided below.

INSTRUCTIONS:
1. Use the Context section to answer the User Question.
2. If the answer is found in the context (like shipping to Alaska), confirm it clearly.
3. If the context does not contain the answer, say: "I'm sorry, I don't have specific information on that. Would you like to speak with a human agent?"
4. Keep the tone professional and friendly.

CONTEXT FROM DATABASE:
{context}

USER QUESTION:
{user_query}

YOUR RESPONSE:
"""

        # 3. Generate response using Gemini
        response = model.generate_content(prompt)

        return jsonify({
            "response": response.text.strip(),
            "sources": [doc.page_content for doc in docs]
        })

    except Exception as e:
        print("CHAT ERROR:", e)
        return jsonify({"error": "AI Engine Error. Please check terminal logs."}), 500

# =========================
# RUN SERVER
# =========================
if __name__ == '__main__':
    print("🚀 Python AI Server starting...")
    print("📍 URL: http://127.0.0.1:8000")
    app.run(port=8000, debug=True)