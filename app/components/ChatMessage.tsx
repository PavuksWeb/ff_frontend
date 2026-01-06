import { FC } from 'react';

interface ChatMessageProps {
  message: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isUser = 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`p-3 rounded-xl max-w-xs wrap-break-word bg-blue-500 text-white`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
