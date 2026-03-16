'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar } from '@/components/ui/Avatar';
import { FiSearch, FiSend, FiSmile, FiPaperclip, FiArrowLeft, FiMoreVertical, FiLoader } from 'react-icons/fi';
import { messagingApi } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useAnalytics } from '@/lib/useAnalytics';

export default function MessagesPage() {
  useAnalytics();
  const { user } = useAuth();
  const [activeConvo, setActiveConvo] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConversations() {
      setLoading(true);
      try {
        const res = await messagingApi.getConversations();
        setConversations(res.data?.data || res.data || []);
      } catch (err) {
        console.error('Messages fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!activeConvo) return;
    async function fetchMessages() {
      try {
        const res = await messagingApi.getConversation(activeConvo);
        setMessages(res.data?.data || res.data || []);
      } catch (err) {
        console.error('Message fetch error:', err);
      }
    }
    fetchMessages();
  }, [activeConvo]);

  const active = conversations.find(c => c.id === activeConvo);

  const handleSend = async () => {
    if (!newMsg.trim() || !activeConvo) return;
    try {
      await messagingApi.sendMessage(activeConvo, { content: newMsg });
      setMessages(prev => [...prev, { id: Date.now(), sender: 'me', text: newMsg, time: 'now' }]);
      setNewMsg('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex h-[calc(100vh-12rem)] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Sidebar */}
          <div className={`w-full sm:w-80 border-r border-gray-100 flex flex-col ${activeConvo ? 'hidden sm:flex' : 'flex'}`}>
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Messages</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="flex justify-center py-8">
                  <FiLoader className="w-6 h-6 animate-spin text-primary" />
                </div>
              )}
              {!loading && conversations.length === 0 && (
                <p className="text-center text-gray-500 py-8 text-sm">No conversations yet</p>
              )}
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConvo(c.id)}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition ${
                    activeConvo === c.id ? 'bg-primary/5' : ''
                  }`}
                >
                  <Avatar name={c.name} size="md" />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 truncate">{c.lastMsg || c.lastMessage || ''}</p>
                  </div>
                  <span className="text-xs text-gray-400">{c.time || ''}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!activeConvo ? 'hidden sm:flex' : 'flex'}`}>
            {active ? (
              <>
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <button onClick={() => setActiveConvo(null)} className="sm:hidden">
                    <FiArrowLeft />
                  </button>
                  <Avatar name={active.name} size="sm" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{active.name}</p>
                  </div>
                  <button><FiMoreVertical /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                        msg.sender === 'me' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'
                      }`}>
                        {msg.text || msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100 flex items-center gap-2">
                  <button><FiPaperclip className="text-gray-400" /></button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm"
                  />
                  <button><FiSmile className="text-gray-400" /></button>
                  <button onClick={handleSend} className="bg-primary text-white p-2 rounded-full">
                    <FiSend className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
