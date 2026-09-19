export type CatColorPattern = '치즈 태비' | '턱시도' | '삼색이' | '고등어 태비' | '카오스' | '올블랙' | '기타';

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface Observation {
  id: string;
  catId: string;
  imageUrl: string;
  locationName: string; // 예: "순천시 석현동 근처"
  latitude: number;
  longitude: number;
  observedAt: string; // 예: "2시간 전", "2026-09-19 10:30"
  reporterName: string;
  tnrIdentified: boolean;
  notes?: string;
}

export interface LocationStat {
  areaName: string;
  percentage: number;
}

export interface TimeDistribution {
  morning: number;   // %
  afternoon: number; // %
  night: number;     // %
}

export interface Cat {
  id: string;
  name: string; // 닉네임 예: "치즈 1호"
  colorPattern: CatColorPattern;
  tnrStatus: boolean; // TNR 여부 (귀 컷팅 식별됨)
  gender: '암컷' | '수컷' | '미상';
  mainImageUrl: string;
  description: string;
  totalObservations: number;
  lastObservedLocation: string;
  lastObservedAt: string;
  latitude: number;
  longitude: number;
  locationStats: LocationStat[];
  timeStats: TimeDistribution;
  observations: Observation[];
  comments: Comment[];
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: '주민' | '학생' | '캣맘/캣대디';
  content: string;
  imageUrl?: string;
  locationTag: string; // 예: "석현동 순천대 후문"
  createdAt: string;
  likes: number;
  comments: Comment[];
}

export type ActiveTab = 'map' | 'book' | 'community' | 'settings';
export type SafeRadius = 200 | 300 | 500;

export const CAT_TYPES_LOADED = true;

