import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatHistory = ({ chatHistory, isLoading, error }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((message, index) => (
        <div key={index} className={`chat-message ${message.role}`}>
          {message.role === 'user' ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="chat-message assistant">
          <p></p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default ChatHistory; 