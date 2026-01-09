'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { Role } from '../enums/role';
import { Message } from '../types/message';

export function useSocket(
  url: string,
  onMessage: (msg: Message, isNew: boolean) => void
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let isStreaming = false;
    const socket = io(url, { transports: ['websocket'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WS connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('WS disconnected');
    });

    socket.on('ws_error', (err) => {
      toast.error(err.message || 'Something went wrong');
      if (err.code === 'MODERATION_BLOCKED') {
        onMessage(
          {
            role: Role.assistant,
            text: '❌ The message has not passed moderation.',
          },
          true
        );
        return;
      }

      onMessage(
        {
          role: Role.assistant,
          text: `ERROR: ${err.message}`,
        },
        true
      );
    });

    socket.on('message_stream', (chunk: string) => {
      if (!isStreaming) {
        isStreaming = true;
        onMessage({ role: Role.assistant, text: chunk }, true);
      } else {
        onMessage({ role: Role.assistant, text: chunk }, false);
      }
    });

    socket.on('stream_end', () => {
      isStreaming = false;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text: string, role: Role.user) => {
    socketRef.current?.emit('send_message', { text, role });
  };

  return { sendMessage };
}
