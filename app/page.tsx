'use client';

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { useSocket } from './hooks/use-socket-hook';

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      message: 'Wanna talk, sweetie?)',
    },
  ]);

  const { sendMessage } = useSocket(
    'http://3.75.95.35:3000',
    (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    }
  );

  const handleSend = (message: string) => {
    const userMessage: Message = { message };
    setMessages((prev) => [...prev, userMessage]);

    sendMessage(message);
  };

  return (
    <div className="h-screen flex flex-col max-w-lg mx-auto p-4">
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
