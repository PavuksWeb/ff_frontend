'use client';

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { useSocket } from './hooks/use-socket-hook';

interface Message {
  message: string;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendMessage } = useSocket(
    process.env.API_URL as string,
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
