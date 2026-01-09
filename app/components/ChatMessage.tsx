import { FC } from 'react';
import { Role } from '../types/role';

interface ChatMessageProps {
  message: string;
  role: Role;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, role }) => {
  return (
    <div
      className={`flex ${
        role === Role.assistant ? 'justify-start' : 'justify-end'
      } mb-4`}
    >
      <div
        className={`p-3 rounded-xl max-w-xs wrap-break-word ${
          role === Role.assistant
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
