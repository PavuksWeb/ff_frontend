'use client';

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { Role } from '../types/role';
import { Message } from '../types/message';
import { moderationErrorText } from '../constants/moderationErrorText';
import { unknownMessageText } from '../constants/unknownErrorText';

export function useSocket(
  url: string,
  onMessage: (msg: Message, isNew: boolean) => void
) {
  const socketRef = useRef<Socket | null>(null);

  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  });

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
      toast.error(err.message || unknownMessageText);
      if (err.code === 'MODERATION_BLOCKED') {
        onMessageRef.current(
          {
            role: Role.assistant,
            text: moderationErrorText,
          },
          true
        );
        return;
      }

      onMessageRef.current(
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
        onMessageRef.current({ role: Role.assistant, text: chunk }, true);
      } else {
        onMessageRef.current({ role: Role.assistant, text: chunk }, false);
      }
    });

    socket.on('stream_end', () => {
      isStreaming = false;
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  const sendMessage = (text: string, role: Role.user) => {
    socketRef.current?.emit('send_message', { text, role });
  };

  return { sendMessage };
}
