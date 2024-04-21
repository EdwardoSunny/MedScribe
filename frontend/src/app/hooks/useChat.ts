import { useState } from 'react';
import axios from 'axios'; // or use fetch

export function useChat({ api }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userMessage = { role: 'user', content: input, id: Date.now() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await axios.post(api, { message: input }); // replace with fetch if you prefer
    const botMessage = { role: 'bot', content: response.data.message, id: Date.now() + 1 };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInput('');
  };

  return { messages, input, handleInputChange, handleSubmit };
}