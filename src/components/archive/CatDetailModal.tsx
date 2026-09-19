import React from 'react';
import type { Cat } from '../../types/cat';
import { X, ShieldCheck, MapPin, Clock, BarChart3, Sun, Sunset, Moon, Sparkles, Image as ImageIcon } from 'lucide-react';

interface CatDetailModalProps {
  cat: Cat;
  onClose: () => void;
}

export const CatDetailModal: React.FC<CatDetailModalProps> = ({ cat, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-up">
        {/* Top Header Background Image */}
        <div className="relative h-44 bg-gray-900">
          <img src={cat.mainImageUrl} alt={cat.name} className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-xs"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Cat Name & Badges Overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {cat.colorPattern}
              </span>
              {cat.tnrStatus && (
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> TNR 중성화 완료
                </span>
              )}
            </div>
            <h2 className="text-xl font-black">{cat.name}</h2>
            <div className="flex items-center text-xs text-gray-300 space-x-2">
              <span>추정 성별: <b>{cat.gender}</b></span>
              <span>•</span>
              <span className="flex items-center truncate">
                <MapPin className="w-3 h-3 text-orange-400 mr-0.5" />
                {cat.lastObservedLocation}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-5 no-scrollbar">
          {/* 1. Counter Banner: "총 N번 관찰되었어요!" */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-orange-100 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> 시민 참여 관찰 아카이빙
              </span>
              <div className="text-2xl font-black">
                총 <span className="text-amber-200">{cat.totalObservations}회</span> 관찰되었어요!
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              🐾
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl leading-relaxed">
            {cat.description}
          </div>

          {/* 2. Observation Statistics Dashboard */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-800 border-b border-gray-100 pb-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span>관찰 통계 대시보드</span>
            </div>

            {/* Main Appearance Locations */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-600">📍 주요 출몰 구역</span>
              <div className="space-y-1.5">
                {cat.locationStats.map((loc, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-xs font-medium text-gray-700">
                      <span>{loc.areaName}</span>
                      <span className="font-bold text-orange-600">{loc.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                        style={{ width: `${loc.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Distribution Mini Bar Chart */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-600">🕒 주요 활동 시간대</span>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-amber-50/70 p-2 rounded-xl text-center space-y-1">
                  <div className="flex items-center justify-center text-amber-600 space-x-0.5">
                    <Sun className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">아침</span>
                  </div>
                  <div className="text-sm font-black text-gray-800">{cat.timeStats.morning}%</div>
                </div>

                <div className="bg-orange-50/70 p-2 rounded-xl text-center space-y-1">
                  <div className="flex items-center justify-center text-orange-600 space-x-0.5">
                    <Sunset className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">오후</span>
                  </div>
                  <div className="text-sm font-black text-gray-800">{cat.timeStats.afternoon}%</div>
                </div>

                <div className="bg-indigo-50/70 p-2 rounded-xl text-center space-y-1">
                  <div className="flex items-center justify-center text-indigo-600 space-x-0.5">
                    <Moon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">야간</span>
                  </div>
                  <div className="text-sm font-black text-gray-800">{cat.timeStats.night}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Timeline Photo Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-800">
              <div className="flex items-center space-x-1">
                <ImageIcon className="w-4 h-4 text-orange-500" />
                <span>제보 타임라인 갤러리</span>
              </div>
              <span className="text-[10px] font-normal text-gray-400">최신순</span>
            </div>

            <div className="space-y-2.5">
              {cat.observations.map((obs) => (
                <div key={obs.id} className="bg-gray-50 border border-gray-100 p-2.5 rounded-2xl flex space-x-3">
                  <img
                    src={obs.imageUrl}
                    alt={obs.locationName}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">{obs.reporterName}</span>
                      <span className="text-[10px] text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-0.5" /> {obs.observedAt}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-600 truncate">{obs.locationName}</div>
                    {obs.notes && <p className="text-[11px] text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md">{obs.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
