// Example React Component for the Chatbot Interface
import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Load chat history from localStorage
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setMessages(chatHistory);
  }, []);

  useEffect(() => {
    // Save chat history to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, user: 'customer', timestamp: new Date() }]);
      setInput('');
      // Simulate a response from the server
      setTimeout(() => {
        setMessages([...messages, { text: input, user: 'customer', timestamp: new Date() }, { text: 'Product details here', user: 'bot', timestamp: new Date() }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user}`}>
            <span className="timestamp">{msg.timestamp.toLocaleTimeString()}</span>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={() => setMessages([])}>Reset</button>
    </div>
  );
};

export default Chatbot;
