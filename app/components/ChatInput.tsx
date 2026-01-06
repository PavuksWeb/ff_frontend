'use client';

import { FC, useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input
        placeholder="Type message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default ChatInput;
