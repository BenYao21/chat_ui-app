import { useState, useEffect } from 'react';
import './App.css';
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);
console.log(import.meta.env.VITE_HF_TOKEN);

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [prompt, setPrompt] = useState('');
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
    }
  }, [chatHistory]);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    const newUserPrompt = { role: 'user', content: prompt };
    const updatedHistory = [...chatHistory, newUserPrompt];
    
    setChatHistory(updatedHistory);
    setPrompt('');

    try {
      const chatCompletion = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: updatedHistory
      });
      const aiResponse = chatCompletion.choices[0].message;

      setChatHistory(prevHistory => [...prevHistory, aiResponse]);

    } catch (err) {
      setError(err.message);
      setChatHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Chat</h1>
        {chatHistory.length > 0 && (
          <button onClick={handleClearHistory} className="clear-button">
            Clear History
          </button>
        )}
      </header>

      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message assistant">
            <p>Thinking...</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
      </div>

      <form onSubmit={handlePromptSubmit} className="prompt-form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default App;
