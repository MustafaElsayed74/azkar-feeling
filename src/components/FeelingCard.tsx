'use client';

import React from 'react';
import Link from 'next/link';
import { getEmotionArabicName } from '@/lib/data';
import {
  CloudRain, Zap, Flame, Moon, CloudDrizzle, Heart, Sun, HelpCircle,
  ShieldAlert, Shield, Clock, ThumbsUp, CheckCircle2, Search,
  Coins, XCircle, Activity, Scale, UserX, EyeOff, Battery,
  Map, ActivitySquare, AlertTriangle, Droplet, Coffee, Frown, Mountain, Smile
} from 'lucide-react';

const iconMap: Record<string, any> = {
  sad: CloudRain, anxious: Zap, angry: Flame, lonely: Moon,
  depressed: CloudDrizzle, grateful: Heart, happy: Sun, confused: HelpCircle,
  scared: ShieldAlert, suicidal: Shield, bored: Clock, confident: ThumbsUp,
  content: CheckCircle2, doubtful: Search, greedy: Coins, guilty: XCircle,
  hurt: Activity, indecisive: Scale, hypocritical: UserX, jealous: EyeOff,
  lazy: Battery, lost: Map, nervous: ActivitySquare, overwhelmed: AlertTriangle,
  regret: Droplet, tired: Coffee, unloved: Frown, weak: Mountain,
};

interface FeelingCardProps { name: string; slug: string; count: number; }

export const FeelingCard: React.FC<FeelingCardProps> = ({ name, slug, count }) => {
  const arabicName = getEmotionArabicName(slug, name);
  const Icon = iconMap[slug.toLowerCase()] || Smile;

  return (
    <Link href={`/feeling/${slug}`} className="block h-full">
      <div className="theme-card relative overflow-hidden h-full p-4 sm:p-5">
        <div className="theme-orb" />
        <div className="flex flex-col h-full justify-between relative z-10 gap-4">
          <div className="flex justify-between items-start">
            <div className="theme-icon-wrap">
              <Icon size={20} />
            </div>
            <span className="theme-badge text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-lg">
              {count} دعاء
            </span>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 mb-1">
              {arabicName}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400">أذكار مخصصة للقلب</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
