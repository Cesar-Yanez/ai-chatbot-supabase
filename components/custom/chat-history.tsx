import { Suspense } from 'react';


import { ChatHistoryClient } from './chat-history-client';
import { ChatHistorySkeleton } from './chat-history-skeleton';

import { getChatsByUserId } from '@/db/cached-queries';
export async function ChatHistory({ userId }: { userId: string }) {
  const chats = await getChatsByUserId(userId);

  return (
    <Suspense fallback={<ChatHistorySkeleton />}>
      <ChatHistoryClient initialChats={chats} userId={userId} />
    </Suspense>
  );
}
