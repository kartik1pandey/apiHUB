import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, ThumbsUp, ThumbsDown, Bot, User, Copy, RotateCcw } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hi! I'm your APIhub assistant. I can help you with questions about APIs, authentication, rate limits, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    "How do I authenticate with the API?",
    "What are the rate limits?",
    "Show me API documentation",
    "How to handle API errors?",
    "What endpoints are available?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, timestamp: new Date() }]);
    setShowSuggestions(false);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    addMessage(userMessage);
    setInput('');
    simulateTyping();

    // Simulate API response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot'
      };
      addMessage(botResponse);
    }, 1500 + Math.random() * 1500);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('auth') || lowerQuery.includes('authenticate')) {
      return "For API authentication, you'll need to include your API key in the request headers. Use: `Authorization: Bearer YOUR_API_KEY`. You can get your API key from the APIhub dashboard under Settings → API Keys.";
    } else if (lowerQuery.includes('rate limit')) {
      return "Our API has the following rate limits:\n• Free tier: 100 requests/hour\n• Pro tier: 1,000 requests/hour\n• Enterprise: 10,000 requests/hour\n\nRate limit headers are included in every response to help you track usage.";
    } else if (lowerQuery.includes('endpoint') || lowerQuery.includes('documentation')) {
      return "Here are our main API endpoints:\n• GET /api/v1/data - Retrieve data\n• POST /api/v1/data - Create new data\n• PUT /api/v1/data/:id - Update existing data\n• DELETE /api/v1/data/:id - Delete data\n\nFull documentation is available at docs.apihub.com";
    } else if (lowerQuery.includes('error')) {
      return "Common API errors and solutions:\n• 401 Unauthorized: Check your API key\n• 429 Too Many Requests: You've hit rate limits\n• 500 Internal Server Error: Try again later\n• 400 Bad Request: Check your request format\n\nAll errors include detailed messages in the response body.";
    } else {
      return "I'm here to help with APIhub questions! You can ask me about authentication, rate limits, endpoints, error handling, or check our documentation. What specific topic would you like to explore?";
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatMessage = (text) => {
    // Simple formatting for code blocks and lists
    return text.split('\n').map((line, index) => (
      <div key={index} className={line.startsWith('•') ? 'ml-4' : ''}>
        {line.startsWith('`') && line.endsWith('`') ? (
          <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
            {line.slice(1, -1)}
          </code>
        ) : (
          line
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">APIhub Assistant</h1>
            <p className="text-sm text-gray-300">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`p-4 rounded-2xl backdrop-blur-xl border ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 text-white ml-auto'
                  : 'bg-black/20 border-white/10 text-gray-100'
              }`}>
                <div className="text-sm leading-relaxed">
                  {formatMessage(message.text)}
                </div>
                
                {/* Message Actions */}
                {message.sender === 'bot' && (
                  <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-white/10">
                    <button
                      onClick={() => copyMessage(message.text)}
                      className="p-1 hover:bg-white/10 rounded-md transition-colors"
                      title="Copy message"
                    >
                      <Copy className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded-md transition-colors" title="Like">
                      <ThumbsUp className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded-md transition-colors" title="Dislike">
                      <ThumbsDown className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Timestamp */}
              <div className={`text-xs text-gray-400 mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">AI is typing...</span>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && messages.length <= 1 && (
          <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-gray-400 text-center">Try asking about:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 transition-all duration-200 hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about APIhub..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl"
              rows="1"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            {/* Voice Input Button */}
            <button
              onClick={toggleListening}
              className={`absolute right-3 top-3 p-2 rounded-full transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 p-3 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed group"
            title="Send message"
          >
            <Send className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setMessages(messages.slice(0, 1));
                setShowSuggestions(true);
              }}
              className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;