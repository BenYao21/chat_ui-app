import './App.css';
import { useChat } from './hooks/useChat';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import PromptForm from './components/PromptForm';

function App() {
  const {
    chatHistory,
    isLoading,
    error,
    handlePromptSubmit,
    handleClearHistory,
  } = useChat();

  return (
    <div className="app-container">
      <Header 
        chatHistory={chatHistory} 
        onClearHistory={handleClearHistory} 
      />
      <ChatHistory
        chatHistory={chatHistory}
        isLoading={isLoading}
        error={error}
      />
      <PromptForm 
        onSubmit={handlePromptSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}

export default App;
