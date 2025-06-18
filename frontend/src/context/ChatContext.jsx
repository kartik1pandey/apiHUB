import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = async (message) => {
    setMessages((prev) => [...prev, message]);
    try {
      await axios.post('/api/messages', message);
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};