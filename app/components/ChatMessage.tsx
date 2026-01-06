import { FC } from 'react';

interface ChatMessageProps {
  message: string;
  role?: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, role }) => {
  console.log(role);

  return (
    <div
      className={`flex ${
        role === 'assistant' ? 'justify-start' : 'justify-end'
      } mb-2`}
    >
      <div
        className={`p-3 rounded-xl max-w-xs wrap-break-word bg-blue-500 text-white`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
