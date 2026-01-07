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
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-pink-200 flex items-center justify-center">
      <div className="h-[90vh] w-full max-w-lg bg-white border rounded-xl shadow-lg flex flex-col p-2">
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
