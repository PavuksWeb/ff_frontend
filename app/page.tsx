'use client';

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { useSocket } from './hooks/use-socket-hook';
import { Role } from './enums/role';
import { Message } from './types/message';

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.assistant,
      text: 'Wanna talk, sweetie?)',
    },
  ]);

  const { sendMessage } = useSocket(
    process.env.NEXT_PUBLIC_API_URL as string,
    (msg: Message, isNew: boolean) => {
      setMessages((prev) => {
        if (isNew) {
          return [...prev, msg];
        } else {
          const lastMessage = prev[prev.length - 1];
          const updatedLast = {
            ...lastMessage,
            text: lastMessage.text + msg.text,
          };
          return [...prev.slice(0, -1), updatedLast];
        }
      });
    }
  );

  const handleSend = (message: string) => {
    const userMessage: Message = { text: message, role: Role.user };
    setMessages((prev) => [...prev, userMessage]);

    sendMessage(message, Role.user);
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
