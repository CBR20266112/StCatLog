import React, { useState } from 'react';
import { useCatContext } from '../../context/CatContext';
import type { CommunityPost } from '../../types/cat';
import { MessageSquare, Heart, MapPin, Plus, Send, X, Image as ImageIcon, Sparkles } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { posts, addPost, likePost, addCommentToPost } = useCatContext();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  
  // New Post Form States
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState<CommunityPost['authorRole']>('주민');
  const [locationTag, setLocationTag] = useState('석현동 순천대 후문');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/cat_shelter.png');

  // Comment Input States
  const [commentInput, setCommentInput] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    addPost(authorName || '동네 주민', authorRole, content, locationTag, imageUrl);
    setContent('');
    setIsWriteModalOpen(false);
  };

  const handleCommentSubmit = (postId: string) => {
    if (!commentInput.trim()) return;
    addCommentToPost(postId, '순천 주민', commentInput);
    setCommentInput('');
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-4 text-white shadow-lg flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-[11px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-emerald-200" />
            <span>동네 안심 이웃 소통</span>
          </div>
          <h2 className="text-xl font-black">순천대 인근 커뮤니티 피드</h2>
          <p className="text-xs text-emerald-100 font-medium">목격담, 사료 나눔, 이웃 소통 공간</p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="bg-white text-emerald-700 font-extrabold text-xs px-3.5 py-2.5 rounded-2xl shadow-md hover:bg-emerald-50 active:scale-95 transition flex items-center space-x-1 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>새 글 쓰기</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-3">
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  {post.author.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-gray-800 text-xs">{post.author}</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded-md border border-emerald-200/60">
                      {post.authorRole}
                    </span>
                  </div>
                  <div className="flex items-center text-[10px] text-gray-400 space-x-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{post.locationTag}</span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-xs text-gray-700 leading-relaxed font-medium">{post.content}</p>

            {/* Optional Image */}
            {post.imageUrl && (
              <div className="rounded-2xl overflow-hidden max-h-56 bg-gray-100 border border-gray-100">
                <img src={post.imageUrl} alt="Feed" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Actions: Likes & Comments Toggle */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-2 text-xs">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center space-x-1 text-rose-500 hover:text-rose-600 font-bold px-2 py-1 rounded-xl hover:bg-rose-50 transition"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>좋아요 {post.likes}</span>
              </button>

              <button
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 font-bold px-2 py-1 rounded-xl hover:bg-gray-100 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>댓글 {post.comments.length}</span>
              </button>
            </div>

            {/* Comment Section Dropdown */}
            {activeCommentPostId === post.id && (
              <div className="border-t border-gray-100 pt-3 space-y-2 animate-fade-in">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="이웃에게 따뜻한 댓글을 남겨주세요..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Comment List */}
                <div className="space-y-1.5 pt-1">
                  {post.comments.length === 0 ? (
                    <p className="text-[11px] text-gray-400 text-center py-2">아직 댓글이 없습니다.</p>
                  ) : (
                    post.comments.map((c) => (
                      <div key={c.id} className="bg-gray-50 p-2 rounded-xl text-[11px]">
                        <span className="font-bold text-emerald-700 mr-2">{c.author}:</span>
                        <span className="text-gray-700">{c.content}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Write New Post Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-4 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-gray-800 text-sm">💬 동네 소통 새 글 작성</h3>
              <button onClick={() => setIsWriteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">작성자 닉네임:</label>
                  <input
                    type="text"
                    placeholder="예: 순천대 컴공이"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">구분 (역할):</label>
                  <select
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value as CommunityPost['authorRole'])}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                  >
                    <option value="주민">주민</option>
                    <option value="학생">학생</option>
                    <option value="캣맘/캣대디">캣맘/캣대디</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">위치 태그:</label>
                <input
                  type="text"
                  placeholder="예: 석현동 순천대 후문"
                  value={locationTag}
                  onChange={(e) => setLocationTag(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">내용:</label>
                <textarea
                  rows={4}
                  placeholder="동네 소식이나 고양이 안부 글을 작성하세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1 flex items-center">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                  첨부 이미지 예시:
                </label>
                <select
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2"
                >
                  <option value="/images/cat_shelter.png">마을 쉼터 사진</option>
                  <option value="/images/cheese_cat.png">치즈 고양이 사진</option>
                  <option value="/images/tuxedo_cat.png">턱시도 고양이 사진</option>
                  <option value="/images/calico_cat.png">삼색이 고양이 사진</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white font-extrabold py-3 rounded-2xl shadow-md hover:bg-emerald-600 transition"
              >
                게시글 등록하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
