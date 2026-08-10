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
      <div className="relative overflow-hidden h-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0b1329] border border-slate-800 hover:border-[#CBA1D4]/50 transition-all duration-300">
        {/* Abstract Glowing Orb Background using Lavender & Butter Yellow */}
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 bg-gradient-to-br from-[#CBA1D4] to-[#FEEB9C] blur-2xl group-hover:opacity-25 transition-opacity duration-300" />
        
        <div className="flex flex-col h-full justify-between relative z-10 gap-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#CBA1D4]/10 border border-[#CBA1D4]/30 text-[#FEEB9C] group-hover:scale-110 transition-transform duration-300">
              <Icon size={20} />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-lg bg-[#FEEB9C]/10 text-[#FEEB9C] border border-[#FEEB9C]/20">
              {count} دعاء
            </span>
          </div>
          
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-[#CBA1D4] transition-colors mb-1">
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

