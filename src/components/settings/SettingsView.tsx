import React, { useState } from 'react';
import { useCatContext } from '../../context/CatContext';
import type { SafeRadius } from '../../types/cat';
import { Shield, Building2, Code, ChevronRight, X, PhoneCall } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { safeRadius, setSafeRadius } = useCatContext();
  const [isTnrGuideOpen, setIsTnrGuideOpen] = useState(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);

  const radiusOptions: { value: SafeRadius; label: string; desc: string }[] = [
    { value: 200, label: '200m (정밀 보호)', desc: '좁은 골목 단위 블러링' },
    { value: 300, label: '300m (권장 기본값)', desc: '동네 보행 반경 최적 보호' },
    { value: 500, label: '500m (광역 보호)', desc: '넓은 구역 안전 블러링' },
  ];

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-3xl p-4 text-white shadow-lg space-y-1">
        <h2 className="text-xl font-black">길냥로그 시스템 설정</h2>
        <p className="text-xs text-gray-400">안심 버블 보호 정책 및 순천시 행정 지원 안내</p>
      </div>

      {/* 1. Safe Radius Settings */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 space-y-3 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-800 border-b border-gray-100 pb-2">
          <Shield className="w-4 h-4 text-emerald-500 fill-emerald-100" />
          <span>안심 버블 보호 반경 설정</span>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          학대 및 무단 포획 위험을 방지하기 위해 지도의 고양이 핀을 선택한 반경으로 블러링합니다.
        </p>

        <div className="space-y-2">
          {radiusOptions.map((opt) => (
            <label
              key={opt.value}
              onClick={() => setSafeRadius(opt.value)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer ${
                safeRadius === opt.value
                  ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-300/50'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="space-y-0.5">
                <div className="text-xs font-extrabold text-gray-800 flex items-center">
                  <span>{opt.label}</span>
                  {safeRadius === opt.value && (
                    <span className="ml-2 bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded-full">
                      적용 중
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-400">{opt.desc}</div>
              </div>

              <input
                type="radio"
                name="safeRadius"
                checked={safeRadius === opt.value}
                onChange={() => setSafeRadius(opt.value)}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 2. Municipal Administration Guidance */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 space-y-3 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-800 border-b border-gray-100 pb-2">
          <Building2 className="w-4 h-4 text-orange-500" />
          <span>지자체 길고양이 행정 안내</span>
        </div>

        <button
          onClick={() => setIsTnrGuideOpen(true)}
          className="w-full flex items-center justify-between bg-amber-50 hover:bg-amber-100/80 p-3.5 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900 transition"
        >
          <div className="flex items-center space-x-2">
            <span className="text-base">📋</span>
            <span>순천시 TNR 지원 사업 & 학대/부상묘 신고 안내</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-700" />
        </button>
      </div>

      {/* 3. App Info & Open Source License */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 space-y-3 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-800 border-b border-gray-100 pb-2">
          <Code className="w-4 h-4 text-indigo-500" />
          <span>앱 정보 & 라이선스</span>
        </div>

        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>앱 버전</span>
            <span className="font-bold text-gray-800">GilnyangLog v1.0.0 (Hackathon MVP)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>지도 엔진</span>
            <span className="font-bold text-gray-800">Leaflet OpenStreetMap</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>비전 AI 분류</span>
            <span className="font-bold text-gray-800">VLM Classification Simulated</span>
          </div>
        </div>

        <button
          onClick={() => setIsLicenseOpen(true)}
          className="w-full text-center text-xs font-bold text-indigo-600 hover:underline py-1"
        >
          오픈소스 라이선스 및 개발팀 정보 보기
        </button>
      </div>

      {/* TNR Guide Modal */}
      {isTnrGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-4 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2 text-orange-600 font-extrabold text-sm">
                <Building2 className="w-5 h-5" />
                <span>순천시 길고양이 TNR 및 복지 가이드</span>
              </div>
              <button onClick={() => setIsTnrGuideOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="bg-orange-50 p-3 rounded-2xl border border-orange-200 space-y-1">
                <h4 className="font-bold text-orange-900 text-sm">1. 순천시 TNR(중성화) 사업 지원 신청</h4>
                <p className="leading-relaxed">
                  순천시 농업기술센터 축산자원과에서 길고양이 개체수 조절 및 공존을 위해 TNR 사업을 무료 지원합니다.
                </p>
                <div className="flex items-center text-orange-700 font-bold pt-1">
                  <PhoneCall className="w-3.5 h-3.5 mr-1" />
                  <span>신청 문의: 순천시 축산자원과 (061-749-8740)</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 space-y-1">
                <h4 className="font-bold text-emerald-900 text-sm">2. 귀 컷팅(TNR 표시) 확인법</h4>
                <p className="leading-relaxed">
                  TNR 중성화 수술을 마친 길고양이는 왼쪽 귀 끝이 약 1cm 가량 평평하게 컷팅(귀 표시)되어 있습니다.
                </p>
              </div>

              <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 space-y-1">
                <h4 className="font-bold text-rose-900 text-sm">3. 학대 및 부상묘 긴급 신고</h4>
                <p className="leading-relaxed">
                  길고양이 학대 행위는 동물보호법 위반 처벌 대상입니다. 학대 발견 시 경찰(112) 또는 동물보호센터로 제보 바랍니다.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsTnrGuideOpen(false)}
              className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-2xl"
            >
              확인하였습니다
            </button>
          </div>
        </div>
      )}

      {/* License Modal */}
      {isLicenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-4 space-y-3 animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-gray-800 text-sm">오픈소스 라이선스</h3>
              <button onClick={() => setIsLicenseOpen(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed space-y-2">
              <p>본 프로젝트 [길냥로그]는 2일 해커톤 출품용 오픈소스 MVP 프로토타입입니다.</p>
              <p className="bg-gray-50 p-2 rounded-xl text-[11px] font-mono text-gray-500">
                MIT License - React, Vite, Leaflet, Tailwind CSS, Lucide Icons.
              </p>
            </div>
            <button
              onClick={() => setIsLicenseOpen(false)}
              className="w-full bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
