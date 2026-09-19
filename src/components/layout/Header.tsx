import React from 'react';
import { useCatContext } from '../../context/CatContext';
import { Shield, Sparkles, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  const { safeRadius, toastMessage, activeTab } = useCatContext();

  const getTitle = () => {
    switch (activeTab) {
      case 'map':
        return '안심 버블 지도';
      case 'book':
        return '길냥 도감 & 통계';
      case 'community':
        return '동네 소통 피드';
      case 'settings':
        return '앱 설정 & 안내';
      default:
        return '길냥로그';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-md shadow-orange-200">
            <span className="text-xl">🐾</span>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h1 className="font-extrabold text-gray-800 text-base leading-tight">길냥로그</h1>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center">
                <Sparkles className="w-2.5 h-2.5 mr-0.5" /> MVP
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">{getTitle()}</p>
          </div>
        </div>

        {/* Safe Radius Badge & Location */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
            <Shield className="w-3.5 h-3.5 mr-1 text-emerald-500 fill-emerald-100" />
            <span>안심 {safeRadius}m</span>
          </div>
          <div className="hidden sm:flex items-center text-xs text-gray-400">
            <MapPin className="w-3.5 h-3.5 mr-0.5 text-gray-400" />
            <span>순천시</span>
          </div>
        </div>
      </div>

      {/* Toast Floating Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm animate-slide-down">
          <div className="bg-gray-900/90 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md border border-gray-700/50 flex items-center justify-between">
            <span className="flex items-center">
              <span className="mr-2 text-base">✨</span>
              {toastMessage}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
