import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Calendar as CalendarIcon, 
  CreditCard, 
  Settings, 
  Users, 
  Sparkles, 
  Search,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import { generateInsight } from '../services/geminiService';
import { Message } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your Lumina AI assistant. How can I help you manage your pipeline today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: KanbanSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'lists', label: 'Lists', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateInsight(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f3f4f6] text-gray-800 overflow-hidden font-light">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
              L
            </div>
            <span className="text-xl font-medium tracking-tight text-gray-900">Lumina</span>
          </div>

          <nav className="flex-1 px-4 space-y-1 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-gray-100 text-gray-900 font-medium shadow-sm ring-1 ring-gray-200' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
             <div className="flex items-center gap-3 px-3 py-2">
                <img src="https://picsum.photos/32/32" alt="User" className="w-8 h-8 rounded-full border border-gray-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Jane Doe</p>
                  <p className="text-xs text-gray-500 truncate">jane@lumina.so</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2 text-gray-600" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-medium capitalize text-gray-800 tracking-tight">{activeTab}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-indigo-100 transition-shadow">
              <Search size={14} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
              />
            </div>
            <button 
              onClick={() => setIsAiOpen(!isAiOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100 transition-all shadow-sm"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
          {children}
        </div>

        {/* AI Assistant Slide-over */}
        {isAiOpen && (
           <div className="absolute right-4 bottom-4 w-full sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/50 to-white rounded-t-2xl">
                <div className="flex items-center gap-2 text-indigo-900">
                  <Sparkles size={16} className="text-indigo-500" />
                  <span className="font-medium text-sm">Lumina Intelligence</span>
                </div>
                <button onClick={() => setIsAiOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`
                      max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-white border border-gray-100 text-gray-700 rounded-bl-none'}
                    `}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
                <form onSubmit={handleAiSubmit} className="flex gap-2">
                  <input
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
                    placeholder="Ask anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button type="submit" disabled={loading} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50">
                    <MessageSquare size={18} />
                  </button>
                </form>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};
