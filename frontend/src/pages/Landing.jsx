import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Shield, Clock } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Public Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <Bot className="text-blue-600" size={32} /> SupportAI
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-slate-600 font-medium hover:text-slate-900 px-4 py-2">Sign In</Link>
          <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mt-20 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Next-Generation <span className="text-blue-600">AI Customer Support</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Automate 90% of your customer queries with our advanced RAG machine learning models. Instantly resolve tickets, 24/7.
        </p>
        <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
          Create Free Account
        </Link>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 px-4 pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <Zap className="text-amber-500 mb-4" size={32} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Instant Answers</h3>
          <p className="text-slate-600">Our ML model understands natural language and provides immediate, accurate responses.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <Shield className="text-emerald-500 mb-4" size={32} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Enterprise RAG</h3>
          <p className="text-slate-600">The bot learns exclusively from YOUR knowledge base, meaning zero hallucinations.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <Clock className="text-blue-500 mb-4" size={32} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">24/7 Availability</h3>
          <p className="text-slate-600">Never let a customer wait. Provide round-the-clock support without hiring extra staff.</p>
        </div>
      </div>
    </div>
  );
}