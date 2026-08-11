'use client';

import React from 'react';
import { DuaCard } from './DuaCard';
import { FeelingGroup } from '@/types';
import { useBookmarks } from '@/hooks/useBookmarks';

interface DuaListClientProps {
  group: FeelingGroup & { arabic_name?: string };
}

export const DuaListClient: React.FC<DuaListClientProps> = ({ group }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="space-y-6 sm:space-y-8">
      {group.duas.map((dua, idx) => (
        <DuaCard
          key={`${dua.title}-${idx}`}
          dua={dua}
          feelingName={group.arabic_name || group.feeling}
          feelingSlug={group.slug}
          isBookmarked={isBookmarked(dua)}
          onToggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};
