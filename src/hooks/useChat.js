import { useState, useEffect } from 'react';
import { getAiResponse } from '../services/aiService';

export const useChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } else {
      localStorage.removeItem('chatHistory');
    }
  }, [chatHistory]);

  const handlePromptSubmit = async (prompt) => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    const newUserPrompt = { role: 'user', content: prompt };
    const updatedHistory = [...chatHistory, newUserPrompt];
    
    setChatHistory(updatedHistory);

    try {
      const aiResponse = await getAiResponse(updatedHistory);
      setChatHistory(prevHistory => [...prevHistory, aiResponse]);
    } catch (err) {
      setError(err.message);
      // Revert the history if the API call fails
      setChatHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
  };

  return {
    chatHistory,
    isLoading,
    error,
    handlePromptSubmit,
    handleClearHistory,
  };
}; 