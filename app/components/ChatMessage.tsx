import { FC } from 'react';

interface ChatMessageProps {
  message: string;
  role?: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, role }) => {
  return (
    <div
      className={`flex ${
        role === 'assistant' ? 'justify-start' : 'justify-end'
      } mb-4`}
    >
      <div
        className={`p-3 rounded-xl max-w-xs wrap-break-word ${
          role === 'assistant'
            ? 'bg-gray-200 text-black'
            : 'bg-blue-500 text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
