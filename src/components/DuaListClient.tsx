'use client';

import React, { useState, useEffect } from 'react';
import { DuaCard } from './DuaCard';
import { FeelingGroup, DuaItem } from '@/types';

interface DuaListClientProps {
  group: FeelingGroup & { arabic_name?: string };
}

export const DuaListClient: React.FC<DuaListClientProps> = ({ group }) => {
  const [bookmarks, setBookmarks] = useState<DuaItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('azkar_bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const handleToggleBookmark = (dua: DuaItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.title === dua.title && b.arabic === dua.arabic);
      let updated: DuaItem[];
      if (exists) {
        updated = prev.filter((b) => !(b.title === dua.title && b.arabic === dua.arabic));
      } else {
        updated = [...prev, dua];
      }
      try {
        localStorage.setItem('azkar_bookmarks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {group.duas.map((dua, idx) => (
        <DuaCard
          key={`${dua.title}-${idx}`}
          dua={dua}
          feelingName={group.arabic_name || group.feeling}
          isBookmarked={bookmarks.some(
            (b) => b.title === dua.title && b.arabic === dua.arabic
          )}
          onToggleBookmark={handleToggleBookmark}
        />
      ))}
    </div>
  );
};
