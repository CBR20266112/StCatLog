import React, { useState } from 'react';
import { useCatContext } from '../../context/CatContext';
import type { Cat, CatColorPattern } from '../../types/cat';
import { CatDetailModal } from './CatDetailModal';
import { Search, Tag, Eye, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export const CatBookView: React.FC = () => {
  const { cats } = useCatContext();
  const [selectedCatDetail, setSelectedCatDetail] = useState<Cat | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatternFilter, setSelectedPatternFilter] = useState<string>('전체');

  const filterOptions = ['전체', '치즈 태비', '턱시도', '삼색이'];

  const filteredCats = cats.filter((cat) => {
    const matchesSearch = cat.name.includes(searchQuery) || cat.lastObservedLocation.includes(searchQuery);
    const matchesFilter = selectedPatternFilter === '전체' || cat.colorPattern === selectedPatternFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-4 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center space-x-1 text-xs font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>순천 지역 시민 관찰 도감</span>
          </div>
          <h2 className="text-xl font-black">우리 동네 길냥이 아카이브</h2>
          <p className="text-xs text-amber-100 font-medium">
            현재 등록된 안심 버블 고양이: <b className="text-white text-sm">{cats.length}마리</b>
          </p>
        </div>
        <span className="absolute right-2 -bottom-4 text-6xl opacity-20 pointer-events-none">🐈</span>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="고양이 이름 또는 동네명 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-orange-400 shadow-xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {filterOptions.map((pattern) => (
            <button
              key={pattern}
              onClick={() => setSelectedPatternFilter(pattern)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 transition ${
                selectedPatternFilter === pattern
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>

      {/* Cat Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {filteredCats.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCatDetail(cat)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-36 overflow-hidden bg-gray-100">
              <img
                src={cat.mainImageUrl}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center space-x-0.5">
                <Eye className="w-3 h-3 text-orange-400" />
                <span>{cat.totalObservations}회 관찰</span>
              </div>
              {cat.tnrStatus && (
                <div className="absolute bottom-2 left-2 bg-emerald-500/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> TNR O
                </div>
              )}
            </div>

            <div className="p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-gray-800 text-sm truncate">{cat.name}</h3>
              </div>

              <div className="flex items-center space-x-1">
                <span className="bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-amber-200/50 flex items-center">
                  <Tag className="w-2.5 h-2.5 mr-0.5" />
                  {cat.colorPattern}
                </span>
                <span className="text-[10px] text-gray-400">{cat.gender}</span>
              </div>

              <div className="flex items-center text-[10px] text-gray-500 truncate pt-1 border-t border-gray-50">
                <MapPin className="w-3 h-3 text-gray-400 mr-0.5 shrink-0" />
                <span className="truncate">{cat.lastObservedLocation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCats.length === 0 && (
        <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200 space-y-2">
          <span className="text-3xl">🐾</span>
          <p className="text-xs text-gray-500 font-medium">검색 결과에 맞는 길고양이가 없습니다.</p>
        </div>
      )}

      {/* Cat Detail Modal */}
      {selectedCatDetail && (
        <CatDetailModal cat={selectedCatDetail} onClose={() => setSelectedCatDetail(null)} />
      )}
    </div>
  );
};
