import React, { useState } from 'react';
import { useCatContext } from '../../context/CatContext';
import type { CatColorPattern } from '../../types/cat';
import { X, Sparkles, CheckCircle2, AlertCircle, Cpu, UploadCloud, PlusCircle } from 'lucide-react';

const PRESET_IMAGES = [
  { id: 'p1', name: '치즈 태비 예시', url: '/images/cheese_cat.png', matchedId: 'cat-1', matchName: '치즈 1호 (치즈이)', prob: 94, pattern: '치즈 태비' as CatColorPattern, tnr: true },
  { id: 'p2', name: '턱시도 예시', url: '/images/tuxedo_cat.png', matchedId: 'cat-2', matchName: '쿠키', prob: 91, pattern: '턱시도' as CatColorPattern, tnr: true },
  { id: 'p3', name: '삼색이 예시', url: '/images/calico_cat.png', matchedId: 'cat-3', matchName: '나비 (삼색이)', prob: 96, pattern: '삼색이' as CatColorPattern, tnr: true },
  { id: 'p4', name: '새 고양이 예시', url: '/images/cat_shelter.png', matchedId: 'new', matchName: '미등록 고양이', prob: 45, pattern: '기타' as CatColorPattern, tnr: false },
];

export const PhotoReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, cats, addObservation } = useCatContext();
  
  const [selectedImg, setSelectedImg] = useState<string>(PRESET_IMAGES[0].url);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<typeof PRESET_IMAGES[0] | null>(null);
  
  // Correction Flow States
  const [isCorrectionMode, setIsCorrectionMode] = useState<boolean>(false);
  const [selectedCatId, setSelectedCatId] = useState<string>('cat-1');
  const [newCatName, setNewCatName] = useState<string>('');
  const [newCatPattern, setNewCatPattern] = useState<CatColorPattern>('치즈 태비');
  const [newCatTnr, setNewCatTnr] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('순천시 석현동 근처 (순천대 후문)');
  const [notes] = useState<string>('');

  if (!isReportModalOpen) return null;

  const handleStartAnalysis = (imgUrl: string, presetMatch?: typeof PRESET_IMAGES[0]) => {
    setSelectedImg(imgUrl);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setIsCorrectionMode(false);

    // AI VLM Analysis simulation timeout (1.5s)
    setTimeout(() => {
      setIsAnalyzing(false);
      if (presetMatch) {
        setAnalysisResult(presetMatch);
        setSelectedCatId(presetMatch.matchedId);
      } else {
        // Default simulated fallback analysis for uploaded image
        setAnalysisResult({
          id: 'custom',
          name: '업로드 이미지',
          url: imgUrl,
          matchedId: 'cat-1',
          matchName: '치즈 1호 (치즈이)',
          prob: 88,
          pattern: '치즈 태비',
          tnr: true,
        });
        setSelectedCatId('cat-1');
      }
    }, 1500);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleStartAnalysis(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmSubmit = () => {
    if (!analysisResult) return;

    if (isCorrectionMode && selectedCatId === 'new') {
      // Register New Cat
      addObservation(
        'new',
        newCatName || '신규 야옹이',
        newCatPattern,
        selectedImg,
        locationName,
        34.9685 + (Math.random() - 0.5) * 0.005,
        127.4792 + (Math.random() - 0.5) * 0.005,
        newCatTnr,
        notes
      );
    } else {
      // Existing Cat Observation (+1)
      const catToUpdate = cats.find(c => c.id === selectedCatId) || cats[0];
      addObservation(
        catToUpdate.id,
        catToUpdate.name,
        catToUpdate.colorPattern,
        selectedImg,
        locationName,
        catToUpdate.latitude + (Math.random() - 0.5) * 0.002,
        catToUpdate.longitude + (Math.random() - 0.5) * 0.002,
        analysisResult.tnr,
        notes
      );
    }

    // Reset & Close
    setIsReportModalOpen(false);
    setAnalysisResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-up">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-amber-100" />
            <h2 className="font-extrabold text-base">Vision AI 고양이 사진 제보</h2>
          </div>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
          {/* Step 1: Select or Upload Photo */}
          {!analysisResult && !isAnalyzing && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 font-semibold">
                📷 제보할 고양이 사진을 업로드하거나 아래 시연용 이미지를 선택하세요.
              </p>

              {/* Upload Box */}
              <label className="border-2 border-dashed border-orange-200 hover:border-orange-400 bg-orange-50/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition">
                <UploadCloud className="w-8 h-8 text-orange-400 mb-1" />
                <span className="text-xs font-bold text-gray-700">내 기기에서 사진 선택하기</span>
                <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG 지원</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleCustomFileUpload} />
              </label>

              {/* Preset Image Options */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-gray-500">⚡ 해커톤 시연용 샘플 사진:</span>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleStartAnalysis(preset.url, preset)}
                      className="group relative rounded-xl overflow-hidden border-2 border-transparent hover:border-orange-400 focus:border-orange-500 transition shadow-xs"
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-16 object-cover" />
                      <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-transparent transition" />
                      <span className="absolute bottom-0 inset-x-0 bg-gray-900/70 text-white text-[9px] text-center font-semibold py-0.5">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: AI Scan Loading Animation */}
          {isAnalyzing && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-orange-400">
                <img src={selectedImg} alt="Scanning" className="w-full h-full object-cover" />
                {/* Scanning Beam Animation Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-lg animate-scan" />
                <div className="absolute inset-0 bg-orange-500/10" />
              </div>

              <div className="text-center space-y-1">
                <div className="flex items-center justify-center space-x-1.5 text-orange-600 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>VLM AI 분석 & 매칭 시뮬레이션 중...</span>
                </div>
                <p className="text-[11px] text-gray-500">모색 태비 패턴 및 TNR 귀 컷팅 여부를 판별합니다.</p>
              </div>
            </div>
          )}

          {/* Step 3: AI Matching Result Card & Human-in-the-Loop Feedback */}
          {analysisResult && !isAnalyzing && (
            <div className="space-y-4">
              {/* Image Preview & AI Badge Card */}
              <div className="bg-orange-50/80 border border-orange-200 p-3 rounded-2xl flex items-center space-x-3">
                <img src={selectedImg} alt="Analyzed" className="w-20 h-20 rounded-xl object-cover border border-orange-300 shrink-0" />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-1 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit">
                    <Sparkles className="w-3 h-3 mr-0.5" /> AI 매칭 신뢰도 {analysisResult.prob}%
                  </div>
                  <h3 className="font-extrabold text-gray-800 text-sm">
                    이 고양이는 <span className="text-orange-600">[{analysisResult.matchName}]</span>일 확률이 높습니다.
                  </h3>
                  <div className="flex items-center space-x-2 text-[11px] text-gray-600">
                    <span>모색: <b>{analysisResult.pattern}</b></span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">
                      {analysisResult.tnr ? '귀 컷팅 식별됨 (TNR O)' : 'TNR 미상'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">📍 제보 장소 (목격 구역):</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-orange-400"
                />
              </div>

              {/* Human-in-the-Loop Options */}
              {!isCorrectionMode ? (
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] text-center font-medium text-gray-500">
                    AI 분석 결과가 맞는지 확인해 주세요! (휴먼-인-더-루프 검증)
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleConfirmSubmit}
                      className="flex items-center justify-center space-x-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs py-3 px-3 rounded-xl shadow-md hover:opacity-95 active:scale-95 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>맞아요! 등록하기</span>
                    </button>

                    <button
                      onClick={() => setIsCorrectionMode(true)}
                      className="flex items-center justify-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-3 px-3 rounded-xl transition"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      <span>이 고양이가 아니에요</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Correction / Dropdown Mode */
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                    <span>✏️ 개체 정보 수정 선택</span>
                    <button onClick={() => setIsCorrectionMode(false)} className="text-[11px] text-orange-600 underline">
                      취소
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-600 font-medium">등록된 고양이 선택:</label>
                    <select
                      value={selectedCatId}
                      onChange={(e) => setSelectedCatId(e.target.value)}
                      className="w-full text-xs bg-white border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-orange-400"
                    >
                      {cats.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.colorPattern})
                        </option>
                      ))}
                      <option value="new">➕ 새로운 고양이로 신규 등록하기</option>
                    </select>
                  </div>

                  {/* If New Cat Selected */}
                  {selectedCatId === 'new' && (
                    <div className="space-y-2 pt-2 border-t border-gray-200">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">새 고양이 이름/별명:</label>
                        <input
                          type="text"
                          placeholder="예: 점박이, 꼬마"
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          className="w-full text-xs bg-white border border-gray-300 rounded-xl p-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-semibold text-gray-700">모색 분류:</label>
                          <select
                            value={newCatPattern}
                            onChange={(e) => setNewCatPattern(e.target.value as CatColorPattern)}
                            className="w-full text-xs bg-white border border-gray-300 rounded-xl p-1.5"
                          >
                            <option value="치즈 태비">치즈 태비</option>
                            <option value="턱시도">턱시도</option>
                            <option value="삼색이">삼색이</option>
                            <option value="고등어 태비">고등어 태비</option>
                            <option value="카오스">카오스</option>
                            <option value="올블랙">올블랙</option>
                          </select>
                        </div>
                        <div className="flex flex-col justify-end">
                          <label className="flex items-center space-x-1 text-xs cursor-pointer pb-2">
                            <input
                              type="checkbox"
                              checked={newCatTnr}
                              onChange={(e) => setNewCatTnr(e.target.checked)}
                              className="rounded text-orange-500 focus:ring-orange-400"
                            />
                            <span>귀 컷팅 (TNR O)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleConfirmSubmit}
                    className="w-full flex items-center justify-center space-x-1 bg-orange-500 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-sm hover:bg-orange-600 transition"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>수정된 내용으로 관찰 등록 완료</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
