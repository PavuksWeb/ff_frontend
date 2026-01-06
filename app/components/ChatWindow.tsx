'use client';

import { FC, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-lg">
      {messages.map((msg, i) => (
        <ChatMessage message={msg.message} role={msg.role} key={i} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
