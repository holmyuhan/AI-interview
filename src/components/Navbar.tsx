import React from 'react';
import { Sparkles, LogIn } from 'lucide-react';

interface NavbarProps {
  onStartInterview?: () => void;
}

export default function Navbar({ onStartInterview }: NavbarProps) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 glass-card rounded-3xl border border-corporate-100/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-corporate-400 rounded-2xl flex items-center justify-center shadow-md shadow-corporate-400/20">
              <Sparkles className="w-6 h-6 text-corporate-900" />
            </div>
            <span className="text-xl font-black tracking-tight text-corporate-900">
              George面试
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-xs font-bold text-corporate-800/60 uppercase tracking-widest">
            <a href="#" className="hover:text-corporate-600 transition-colors">支持计划</a>
            <a href="#" className="hover:text-corporate-600 transition-colors">社区分享</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-corporate-800 hover:text-corporate-600 transition-colors flex items-center gap-1.5">
              <LogIn className="w-4 h-4" />
              登录
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
