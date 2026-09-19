<div align="center">

# 🐾 길냥로그 · StCatLog

**동네 길고양이 관찰 기록 아카이빙 및 공존을 위한 웹 플랫폼**

[![Deploy](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://cbr20266112.github.io/StCatLog/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<br />

> 길고양이를 사랑하는 사람들이 함께 기록하고, 함께 지키는 공간.  
> 정밀 위치 노출 없이 안전하게 목격 정보를 공유하고, AI로 개체를 식별하며,  
> 이웃과 소통하는 도시 공존 플랫폼입니다.

<br />

🔗 **[Live Demo → cbr20266112.github.io/StCatLog](https://cbr20266112.github.io/StCatLog/)**

</div>

---

## ✨ 주요 기능 (Features)

### 🗺️ 안심 버블 맵
길고양이의 정밀 좌표 노출로 인한 위험을 방지합니다.  
실제 위치 대신 **반경 250m 원형 버블** 형태로 출몰 구역을 시각화하여, 개체의 안전을 최우선으로 보호합니다.
- OpenStreetMap 기반 Leaflet 지도
- 개체별 버블 클릭 시 상세 정보 바텀시트 표시
- 목격 빈도에 따른 버블 농도 시각화

### 🤖 AI 모색/TNR 판별 & 피드백 루프
사진 한 장으로 길고양이를 분석합니다.
- 사진 기반 **모색 패턴 분석** (고등어, 치즈, 삼색, 턱시도 등)
- **중성화(TNR) 여부** 시뮬레이션 판별 (귀 컷 유무 등)
- 오분류 제보 / 신규 개체 등록을 통한 **사용자 검증 피드백 루프**

### 📖 길냥 도감 & 관찰 통계
동네 길냥이들의 생애 기록을 쌓아갑니다.
- 개체별 **누적 관찰 횟수** 및 프로필 카드
- **주요 출몰 구역**과 **활동 시간대** 통계 시각화
- 관찰 기록 타임라인

### 💬 동네 커뮤니티 & 안전 설정
이웃 간 소통과 개인화된 안전 경험을 제공합니다.
- 목격담, 제보, 정보 공유 **커뮤니티 피드**
- **안심 반경 조절** (50m ~ 500m 슬라이더)
- 지자체 TNR 프로그램 및 공존 가이드 안내

---

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 |
|------|------|
| **Frontend** | React 19, TypeScript 6.0 |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3, Lucide Icons |
| **Map** | Leaflet 1.9, React-Leaflet 5 (OpenStreetMap) |
| **CI/CD** | GitHub Actions |
| **Deployment** | GitHub Pages, Vercel |

---

## 🚀 시작하기 (Getting Started)

### 사전 요구사항
- Node.js 18 이상
- npm 9 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/CBR20266112/StCatLog.git
cd StCatLog

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview
```

---

## 📁 프로젝트 구조 (Folder Structure)

```
StCatLog/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/              # 길고양이 샘플 이미지
├── src/
│   ├── components/
│   │   ├── ai/              # AI 사진 분석 모달 (PhotoReportModal)
│   │   ├── archive/         # 길냥 도감 (CatBookView, CatDetailModal)
│   │   ├── community/       # 커뮤니티 피드 (CommunityView)
│   │   ├── layout/          # 헤더, 하단 네비게이션 바
│   │   ├── map/             # 안심 버블 맵, 바텀시트 (SafeBubbleMap, CatBottomSheet)
│   │   └── settings/        # 안전 설정 화면 (SettingsView)
│   ├── context/
│   │   └── CatContext.tsx   # 전역 길고양이 데이터 Context
│   ├── mock/
│   │   └── mockData.ts      # 개발용 목업 데이터
│   ├── types/
│   │   └── cat.ts           # 길고양이 타입 정의
│   ├── App.tsx              # 루트 컴포넌트 (탭 라우팅)
│   └── main.tsx             # 앱 진입점
├── .github/
│   └── workflows/
│       └── gh-pages.yml     # GitHub Pages 자동 배포 워크플로우
├── vercel.json              # Vercel 배포 설정
├── vite.config.ts
└── package.json
```

---

## 🌿 브랜치 전략 (Branch Strategy)

```
main  ──── 안정 버전 / 자동 배포 트리거
  └── dev  ──── 기능 개발 및 디버깅 작업 브랜치
```

- `main`: 프로덕션 배포 전용. push 시 GitHub Pages 자동 배포.
- `dev`: 모든 신규 기능 개발은 이 브랜치에서 진행 후 `main`으로 병합.

---

## 🤝 기여하기 (Contributing)

버그 제보, 기능 제안, PR 모두 환영합니다!

1. `dev` 브랜치를 기준으로 feature 브랜치 생성
2. 변경사항 커밋
3. `dev` 브랜치로 Pull Request 생성

---

## 📄 라이선스 (License)

[MIT License](LICENSE) © 2026 CBR20266112
