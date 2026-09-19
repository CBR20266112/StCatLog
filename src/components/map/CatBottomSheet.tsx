import React, { useState } from 'react';
import { useCatContext } from '../../context/CatContext';
import { X, Clock, MapPin, Share2, Send, MessageCircle, ShieldCheck, Tag, Heart } from 'lucide-react';

export const CatBottomSheet: React.FC = () => {
  const { selectedCat, setSelectedCat, addCommentToCat, showToast } = useCatContext();
  const [commentInput, setCommentInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');

  if (!selectedCat) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addCommentToCat(selectedCat.id, authorInput || '순천 시민', commentInput);
    setCommentInput('');
  };

  const handleShare = async () => {
    const shareData = {
      title: `[길냥로그] ${selectedCat.name} 목격 정보`,
      text: `순천시 안심 버블 지역에서 ${selectedCat.name}(${selectedCat.colorPattern})을(를) 관찰했어요!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('🔗 인스타그램/소셜 링크가 복사되었습니다!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 인스타그램/소셜 공유 링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/40 backdrop-blur-xs transition-opacity duration-300">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={() => setSelectedCat(null)} />

      {/* Bottom Sheet Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-10 animate-slide-up">
        {/* Handle Pill */}
        <div className="w-full flex justify-center py-2.5 bg-gray-50 border-b border-gray-100">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedCat(null)}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Main Photo & Basic Info Header */}
          <div className="flex items-start space-x-3.5">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-orange-200 shadow-md shrink-0">
              <img src={selectedCat.mainImageUrl} alt={selectedCat.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1 bg-gray-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                포착 {selectedCat.totalObservations}회
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-gray-800">{selectedCat.name}</h2>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
                  <Tag className="w-3 h-3 mr-0.5" />
                  {selectedCat.colorPattern}
                </span>
              </div>

              <div className="flex items-center text-xs text-emerald-600 font-semibold space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{selectedCat.tnrStatus ? '귀 컷팅 식별됨 (중성화 O)' : 'TNR 미상 / 모니터링 중'}</span>
              </div>

              <div className="flex items-center text-xs text-gray-500 space-x-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{selectedCat.lastObservedLocation}</span>
              </div>

              <div className="flex items-center text-xs text-gray-400 space-x-1">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>최근 목격: {selectedCat.lastObservedAt}</span>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-amber-50/60 border border-amber-100 p-3 rounded-2xl text-xs text-gray-700 leading-relaxed">
            {selectedCat.description}
          </div>

          {/* Action Row (Share Button) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center space-x-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md text-xs hover:opacity-95 active:scale-98 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>인스타그램 / 소셜 공유하기</span>
            </button>
          </div>

          {/* One-line Guestbook Comments Section */}
          <div className="border-t border-gray-100 pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-sm font-bold text-gray-800">
                <MessageCircle className="w-4 h-4 text-orange-500" />
                <span>한 줄 방명록 / 댓글 ({selectedCat.comments.length})</span>
              </div>
              <span className="text-[11px] text-gray-400">안심 응원 한마디</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="닉네임 (선택)"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  className="w-1/3 text-xs bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-orange-400"
                />
                <input
                  type="text"
                  placeholder="오늘 밥 잘 먹고 있네요! (한 줄 작성)"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-orange-400"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {selectedCat.comments.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-3">첫 번째 안심 방명록을 작성해 보세요! 🐾</p>
              ) : (
                selectedCat.comments.map((c) => (
                  <div key={c.id} className="bg-gray-50 p-2.5 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-gray-700">
                      <span className="text-orange-600 flex items-center">
                        <Heart className="w-3 h-3 fill-orange-400 text-orange-400 mr-1" />
                        {c.author}
                      </span>
                      <span className="text-[10px] text-gray-400">{c.createdAt}</span>
                    </div>
                    <p className="text-gray-600 pl-4">{c.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
