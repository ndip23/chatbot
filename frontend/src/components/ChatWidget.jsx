import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Send, Bot, User, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ChatWidget() {
  const [sessionId] = useState(uuidv4());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: 'Hello! I am the AI Support System. Ask me anything about our services.' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const userMsgId = uuidv4();
    
    // 1. Add user message to the UI
    setMessages((prev) => [...prev, { id: userMsgId, role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. SEND THE REAL REQUEST TO NODE.JS (Port 5000)
      const res = await axios.post('http://localhost:5000/api/chat', { 
        message: userMsg 
      });

      // 3. ADD THE REAL AI RESPONSE TO THE UI
      setMessages((prev) => [...prev, { 
        id: uuidv4(), 
        role: 'assistant', 
        content: res.data.response // This comes from your Gemini AI
      }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { 
        id: uuidv4(), 
        role: 'assistant', 
        content: '⚠️ Error: AI Engine is offline. Please ensure Python app.py is running.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // FYP Requirement: Feedback Loop
  const handleFeedback = (msgId, type) => {
    console.log(`Feedback for ${msgId}: ${type}`);
    alert(`Feedback recorded: ${type}. This will be used to retrain the ML model.`);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-gray-200">
      <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
        <Bot size={24} className="text-white" />
        <div>
          <h2 className="text-white font-semibold text-lg">AI Support Agent</h2>
          <p className="text-slate-400 text-xs">Powered by RAG Architecture</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className="flex-shrink-0 mt-auto mb-1">
              {msg.role === 'user' ? 
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center"><User size={16} className="text-white"/></div> : 
                <div className="bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"><Bot size={16} className="text-white"/></div>
              }
            </div>
            <div>
              <div className={`p-4 rounded-2xl text-[15px] shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}`}>
                {msg.content}
              </div>
              {/* Feedback Loop UI for Bot Messages */}
              {msg.role === 'assistant' && msg.id !== '1' && (
                <div className="flex gap-2 mt-2 ml-2">
                  <button onClick={() => handleFeedback(msg.id, 'good')} className="text-slate-400 hover:text-green-500 transition-colors"><ThumbsUp size={14} /></button>
                  <button onClick={() => handleFeedback(msg.id, 'bad')} className="text-slate-400 hover:text-red-500 transition-colors"><ThumbsDown size={14} /></button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="self-start ml-11 text-sm text-slate-500 animate-pulse bg-white p-3 rounded-2xl shadow-sm border border-slate-200">Retrieving knowledge...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-200 flex gap-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your query..." disabled={isLoading} className="flex-1 border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
}