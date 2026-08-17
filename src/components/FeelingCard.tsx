'use client';

import React from 'react';
import Link from 'next/link';
import {
  CloudRain, Zap, Flame, Moon, CloudDrizzle, Heart, Sun, HelpCircle,
  ShieldAlert, Shield, Clock, ThumbsUp, CheckCircle2, Search,
  Coins, XCircle, Activity, Scale, UserX, EyeOff, Battery,
  Map, ActivitySquare, AlertTriangle, Droplet, Coffee, Frown, Mountain, Smile,
  GraduationCap, Compass, HeartPulse, Sparkles
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  sad: CloudRain, anxious: Zap, angry: Flame, lonely: Moon,
  depressed: CloudDrizzle, grateful: Heart, happy: Sun, confused: HelpCircle,
  scared: ShieldAlert, suicidal: Shield, bored: Clock, confident: ThumbsUp,
  content: CheckCircle2, doubtful: Search, greedy: Coins, guilty: XCircle,
  hurt: Activity, indecisive: Scale, hypocritical: UserX, jealous: EyeOff,
  lazy: Battery, lost: Map, nervous: ActivitySquare, overwhelmed: AlertTriangle,
  regret: Droplet, tired: Coffee, unloved: Frown, weak: Mountain,
  morning: Sun, evening: Moon, sleep: Moon, prayer: Sparkles,
  study: GraduationCap, travel: Compass, healing: HeartPulse, sustenance: Coins,
};

interface FeelingCardProps {
  name: string;
  arabicName: string;
  slug: string;
  count: number;
}

export const FeelingCard: React.FC<FeelingCardProps> = ({
  name,
  arabicName,
  slug,
  count,
}) => {
  const Icon = iconMap[slug.toLowerCase()] || Smile;

  return (
    <Link
      href={`/feeling/${slug}`}
      className="block h-full"
      aria-label={`${arabicName} — ${count} دعاء (${name})`}
    >
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
            <h3 className="mb-1 text-sm font-extrabold sm:text-base">
              {arabicName}
            </h3>
            <p className="theme-muted text-[10px] sm:text-xs">أذكار مخصصة للقلب</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
