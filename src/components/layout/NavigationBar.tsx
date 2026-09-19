import React from 'react';
import { useCatContext } from '../../context/CatContext';
import type { ActiveTab } from '../../types/cat';
import { Map, BookOpen, MessageSquare, Settings } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const { activeTab, setActiveTab } = useCatContext();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'map', label: '지도', icon: Map },
    { id: 'book', label: '길냥', icon: BookOpen },
    { id: 'community', label: '커뮤니티', icon: MessageSquare },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-orange-100/80 shadow-lg pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 relative ${
                isActive ? 'text-orange-500 font-bold' : 'text-gray-400 font-medium hover:text-gray-600'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-orange-400 rounded-b-full shadow-xs shadow-orange-300" />
              )}
              <div className={`p-1.5 rounded-xl transition-transform duration-200 ${isActive ? 'bg-orange-50 scale-110' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
