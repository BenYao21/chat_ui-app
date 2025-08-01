const Header = ({ chatHistory, onClearHistory }) => {
  return (
    <header className="app-header">
      <h1>AI Chat</h1>
      {chatHistory.length > 0 && (
        <button onClick={onClearHistory} className="clear-button">
          Clear History
        </button>
      )}
    </header>
  );
};

export default Header; 