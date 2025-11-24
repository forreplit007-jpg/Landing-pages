import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SendIcon } from './Icons';
import { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Clove. How can I help you with your dental journey today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      let accumulatedText = '';
      
      // Create a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      await streamChatResponse(messages, userText, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text = accumulatedText;
          }
          return newMessages;
        });
      });
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink ${
          isOpen ? 'bg-brand-text text-white' : 'bg-brand-pink text-brand-text'
        }`}
      >
        {isOpen ? <CloseIcon className="w-6 h-6" /> : <ChatIcon className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden border border-gray-100 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 120px)', height: '500px' }}
      >
        {/* Header */}
        <div className="bg-brand-pink p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-xl">🦷</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-brand-text">Ask Clove</h3>
            <p className="text-xs text-gray-700">Virtual Receptionist</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 no-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-text text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1].text === '' && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-brand-green text-green-800 rounded-full hover:bg-green-200 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-600 flex items-center justify-center min-w-[40px]"
          >
             {isLoading ? (
               <div className="w-5 h-5 border-2 border-green-800 border-t-transparent rounded-full animate-spin" />
             ) : (
               <SendIcon className="w-5 h-5" />
             )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;