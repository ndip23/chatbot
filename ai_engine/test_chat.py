import requests

print("==============================================")
print("🤖 TechStore AI (Gemini + RAG Mode)")
print("Type 'exit' to stop.")
print("==============================================\n")

while True:
    query = input("🧑 You: ")
    if query.lower() == 'exit': break

    try:
        # Send to Python AI Engine
        response = requests.post('http://127.0.0.1:8000/chat', json={"query": query})
        data = response.json()

        if response.status_code == 200:
            print(f"\n🤖 AI: {data['response']}")
            
            # This part proves it's using the TRAINING DATA
            print("\n🔍 [Knowledge Base Sources Used]:")
            for i, src in enumerate(data.get('sources', []), 1):
                print(f"   {i}. {src}")
            print("-" * 50)
        else:
            print(f"Error: {data.get('error')}")
    except Exception as e:
        print(f"Connection Error: {e}")