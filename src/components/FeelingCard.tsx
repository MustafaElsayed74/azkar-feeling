'use client';

import React from 'react';
import Link from 'next/link';
import { getEmotionArabicName } from '@/lib/data';
import { 
  CloudRain, Zap, Flame, Moon, CloudDrizzle, Heart, Sun, HelpCircle, 
  ShieldAlert, Shield, Clock, ThumbsUp, CheckCircle2, Search, 
  Coins, XCircle, Activity, Scale, UserX, EyeOff, Battery, 
  Map, ActivitySquare, AlertTriangle, Droplet, Coffee, Frown, Mountain,
  Smile
} from 'lucide-react';

const LAVENDER = '#CBA1D4';
const BUTTER = '#FEEB9C';

const iconMap: Record<string, any> = {
  sad: CloudRain,
  anxious: Zap,
  angry: Flame,
  lonely: Moon,
  depressed: CloudDrizzle,
  grateful: Heart,
  happy: Sun,
  confused: HelpCircle,
  scared: ShieldAlert,
  suicidal: Shield,
  bored: Clock,
  confident: ThumbsUp,
  content: CheckCircle2,
  doubtful: Search,
  greedy: Coins,
  guilty: XCircle,
  hurt: Activity,
  indecisive: Scale,
  hypocritical: UserX,
  jealous: EyeOff,
  lazy: Battery,
  lost: Map,
  nervous: ActivitySquare,
  overwhelmed: AlertTriangle,
  regret: Droplet,
  tired: Coffee,
  unloved: Frown,
  weak: Mountain,
};

interface FeelingCardProps {
  name: string;
  slug: string;
  count: number;
}

export const FeelingCard: React.FC<FeelingCardProps> = ({ name, slug, count }) => {
  const arabicName = getEmotionArabicName(slug, name);
  const Icon = iconMap[slug.toLowerCase()] || Smile;

  return (
    <Link href={`/feeling/${slug}`} className="block group h-full">
      <div
        className="relative overflow-hidden h-full p-4 sm:p-5 rounded-2xl border transition-all duration-300"
        style={{ background: 'linear-gradient(135deg, #0f172a, #0b1329)', borderColor: 'rgba(203,161,212,0.15)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = `${LAVENDER}66`)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(203,161,212,0.15)')}
      >
        {/* Glowing Orb */}
        <div
          className="absolute -right-6 -top-6 w-28 h-28 rounded-full blur-2xl"
          style={{ background: `linear-gradient(135deg, ${LAVENDER}, ${BUTTER})`, opacity: 0.12 }}
        />

        <div className="flex flex-col h-full justify-between relative z-10 gap-4">
          <div className="flex justify-between items-start">
            {/* Icon Circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${LAVENDER}18`, borderColor: `${LAVENDER}44`, color: BUTTER }}
            >
              <Icon size={20} />
            </div>

            {/* Count Badge */}
            <span
              className="text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-lg border"
              style={{ backgroundColor: `${BUTTER}18`, color: BUTTER, borderColor: `${BUTTER}44` }}
            >
              {count} دعاء
            </span>
          </div>

          <div>
            <h3
              className="text-sm sm:text-base font-bold mb-1 transition-colors duration-200"
              style={{ color: '#f1f5f9' }}
            >
              {arabicName}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400">
              أذكار مخصصة للقلب
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
