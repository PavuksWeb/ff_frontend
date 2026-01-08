'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

export function useSocket(url: string, onMessage: (msg: Message) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WS connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('WS disconnected');
    });

    socket.on('ws_error', (err) => {
      toast.error(err.message);
      if (err.code === 'MODERATION_ERROR') {
        onMessage({
          role: 'assistant',
          message: '❌ The message has not passed moderation.',
        });
        return;
      }

      onMessage({
        role: 'assistant',
        message: `ERROR: ${err.message}`,
      });
    });

    socket.on('message_created', (data: Message) => {
      onMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    socketRef.current?.emit('send_message', { message } as Message);
  };

  return { sendMessage };
}
