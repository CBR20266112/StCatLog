import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Cat, CommunityPost, ActiveTab, SafeRadius, Comment } from '../types/cat';
import { INITIAL_CATS, INITIAL_POSTS } from '../mock/mockData';

interface CatContextType {
  cats: Cat[];
  posts: CommunityPost[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  safeRadius: SafeRadius;
  setSafeRadius: (radius: SafeRadius) => void;
  selectedCat: Cat | null;
  setSelectedCat: (cat: Cat | null) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addObservation: (
    catId: string | 'new',
    newCatName: string,
    colorPattern: Cat['colorPattern'],
    imageUrl: string,
    locationName: string,
    lat: number,
    lng: number,
    tnrIdentified: boolean,
    notes?: string
  ) => void;
  addCommentToCat: (catId: string, author: string, content: string) => void;
  addPost: (author: string, authorRole: CommunityPost['authorRole'], content: string, locationTag: string, imageUrl?: string) => void;
  likePost: (postId: string) => void;
  addCommentToPost: (postId: string, author: string, content: string) => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<Cat[]>(() => {
    const saved = localStorage.getItem('gilnyang_cats');
    return saved ? JSON.parse(saved) : INITIAL_CATS;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('gilnyang_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('map');
  const [safeRadius, setSafeRadiusState] = useState<SafeRadius>(() => {
    const saved = localStorage.getItem('gilnyang_radius');
    return saved ? (parseInt(saved) as SafeRadius) : 300;
  });

  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('gilnyang_cats', JSON.stringify(cats));
  }, [cats]);

  useEffect(() => {
    localStorage.setItem('gilnyang_posts', JSON.stringify(posts));
  }, [posts]);

  const setSafeRadius = (radius: SafeRadius) => {
    setSafeRadiusState(radius);
    localStorage.setItem('gilnyang_radius', radius.toString());
    showToast(`안심 버블 보호 반경이 ${radius}m로 변경되었습니다 🛡️`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addObservation = (
    catId: string | 'new',
    newCatName: string,
    colorPattern: Cat['colorPattern'],
    imageUrl: string,
    locationName: string,
    lat: number,
    lng: number,
    tnrIdentified: boolean,
    notes?: string
  ) => {
    const newObsId = `obs-${Date.now()}`;
    const obsObj = {
      id: newObsId,
      catId: catId === 'new' ? `cat-${Date.now()}` : catId,
      imageUrl: imageUrl || '/images/cheese_cat.png',
      locationName: locationName || '순천시 석현동 근처',
      latitude: lat,
      longitude: lng,
      observedAt: '방금 전',
      reporterName: '제보자 (나)',
      tnrIdentified: tnrIdentified,
      notes: notes || '시민 참여 제보',
    };

    if (catId === 'new') {
      const createdCat: Cat = {
        id: obsObj.catId,
        name: newCatName || '신규 야옹이',
        colorPattern: colorPattern,
        tnrStatus: tnrIdentified,
        gender: '미상',
        mainImageUrl: imageUrl || '/images/cheese_cat.png',
        description: '시민 제보로 새롭게 등록된 안심 버블 길고양이입니다.',
        totalObservations: 1,
        lastObservedLocation: locationName,
        lastObservedAt: '방금 전',
        latitude: lat,
        longitude: lng,
        locationStats: [{ areaName: locationName, percentage: 100 }],
        timeStats: { morning: 33, afternoon: 33, night: 34 },
        observations: [obsObj],
        comments: [
          {
            id: `c-${Date.now()}`,
            author: '안심봇',
            content: '새로운 고양이가 아카이브에 등록되었습니다! 🐾',
            createdAt: '방금 전'
          }
        ]
      };
      setCats(prev => [createdCat, ...prev]);
      setSelectedCat(createdCat);
      showToast(`🎉 새로운 길고양이 [${createdCat.name}] 등록 완료!`);
    } else {
      setCats(prev =>
        prev.map(c => {
          if (c.id === catId) {
            const updated = {
              ...c,
              totalObservations: c.totalObservations + 1,
              lastObservedLocation: locationName,
              lastObservedAt: '방금 전',
              latitude: lat,
              longitude: lng,
              observations: [obsObj, ...c.observations]
            };
            if (selectedCat && selectedCat.id === catId) {
              setSelectedCat(updated);
            }
            return updated;
          }
          return c;
        })
      );
      showToast(`📸 [${newCatName || '등록 개체'}] 목격 제보가 성공적으로 추가되었습니다!`);
    }
  };

  const addCommentToCat = (catId: string, author: string, content: string) => {
    if (!content.trim()) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: author || '순천 시민',
      content: content.trim(),
      createdAt: '방금 전'
    };

    setCats(prev =>
      prev.map(cat => {
        if (cat.id === catId) {
          const updated = {
            ...cat,
            comments: [newComment, ...cat.comments]
          };
          if (selectedCat && selectedCat.id === catId) {
            setSelectedCat(updated);
          }
          return updated;
        }
        return cat;
      })
    );
    showToast('방명록 댓글이 남겨졌습니다 💬');
  };

  const addPost = (author: string, authorRole: CommunityPost['authorRole'], content: string, locationTag: string, imageUrl?: string) => {
    if (!content.trim()) return;
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: author || '동네 주민',
      authorRole: authorRole || '주민',
      content: content.trim(),
      locationTag: locationTag || '석현동 순천대 인근',
      imageUrl: imageUrl,
      createdAt: '방금 전',
      likes: 0,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('동네 소통 피드에 게시글이 작성되었습니다 ✨');
  };

  const likePost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const addCommentToPost = (postId: string, author: string, content: string) => {
    if (!content.trim()) return;
    const newComment: Comment = {
      id: `pc-${Date.now()}`,
      author: author || '익명 주민',
      content: content.trim(),
      createdAt: '방금 전'
    };
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
    showToast('피드 댓글이 작성되었습니다.');
  };

  return (
    <CatContext.Provider
      value={{
        cats,
        posts,
        activeTab,
        setActiveTab,
        safeRadius,
        setSafeRadius,
        selectedCat,
        setSelectedCat,
        isReportModalOpen,
        setIsReportModalOpen,
        toastMessage,
        showToast,
        addObservation,
        addCommentToCat,
        addPost,
        likePost,
        addCommentToPost,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) throw new Error('useCatContext must be used within CatProvider');
  return context;
};
