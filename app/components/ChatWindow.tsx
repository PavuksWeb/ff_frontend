'use client';

import { FC, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Spinner } from '@/components/ui/spinner';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const showSpinner =
    messages.length > 0 && messages[messages.length - 1].role === undefined;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 rounded-lg">
      {messages.map((msg, i) => (
        <ChatMessage message={msg.message} role={msg.role} key={i} />
      ))}

      {showSpinner && (
        <div className="flex justify-start mt-2">
          <div className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-xl">
            <Spinner />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
