import type { Cat, CommunityPost } from '../types/cat';

export const INITIAL_CATS: Cat[] = [
  {
    id: 'cat-1',
    name: '치즈 1호 (치즈이)',
    colorPattern: '치즈 태비',
    tnrStatus: true,
    gender: '수컷',
    mainImageUrl: '/images/cheese_cat.png',
    description: '순천대 후문 골목길의 대장 고양이. 사람을 좋아하며 햇빛 드는 벽돌 담벼락에서 자주 식빵을 굽습니다.',
    totalObservations: 14,
    lastObservedLocation: '순천시 석현동 (순천대 후문 골목)',
    lastObservedAt: '30분 전',
    latitude: 34.9685,
    longitude: 127.4792,
    locationStats: [
      { areaName: '순천대 후문 골목', percentage: 55 },
      { areaName: '석현동 편의점 뒤편', percentage: 30 },
      { areaName: '삼산동 공원 입구', percentage: 15 },
    ],
    timeStats: {
      morning: 25,
      afternoon: 50,
      night: 25,
    },
    observations: [
      {
        id: 'obs-1-1',
        catId: 'cat-1',
        imageUrl: '/images/cheese_cat.png',
        locationName: '순천시 석현동 근처 (순천대 후문)',
        latitude: 34.9685,
        longitude: 127.4792,
        observedAt: '오늘 11:20',
        reporterName: '컴공과 21학번',
        tnrIdentified: true,
        notes: '볕이 들어오는 담벼락에서 느긋하게 자고 있었어요.',
      },
      {
        id: 'obs-1-2',
        catId: 'cat-1',
        imageUrl: '/images/cat_shelter.png',
        locationName: '순천시 석현동 쉼터',
        latitude: 34.9680,
        longitude: 127.4788,
        observedAt: '어제 17:40',
        reporterName: '석현동주민A',
        tnrIdentified: true,
        notes: '사료 그릇 깨끗이 비우고 가네요!',
      }
    ],
    comments: [
      {
        id: 'c-1',
        author: '순이인',
        content: '오늘 아침에 사료 줬는데 엄청 잘 먹더라고요! 귀 컷팅 앙증맞음 🐱',
        createdAt: '1시간 전'
      },
      {
        id: 'c-2',
        author: '석현동 캣맘',
        content: '날씨 추워지는데 따뜻한 집 마련해줘야겠어요.',
        createdAt: '3시간 전'
      }
    ]
  },
  {
    id: 'cat-2',
    name: '쿠키',
    colorPattern: '턱시도',
    tnrStatus: true,
    gender: '수컷',
    mainImageUrl: '/images/tuxedo_cat.png',
    description: '깔끔한 흰 장갑과 검은 턱시도를 입은 신사 고양이. 약간 수줍음이 많지만 간식 소리에는 즉시 반응합니다.',
    totalObservations: 9,
    lastObservedLocation: '순천시 조곡동 (동천 산책로 벤치)',
    lastObservedAt: '2시간 전',
    latitude: 34.9621,
    longitude: 127.4883,
    locationStats: [
      { areaName: '조곡동 동천 산책로', percentage: 65 },
      { areaName: '순천역 인근 골목', percentage: 35 },
    ],
    timeStats: {
      morning: 15,
      afternoon: 35,
      night: 50,
    },
    observations: [
      {
        id: 'obs-2-1',
        catId: 'cat-2',
        imageUrl: '/images/tuxedo_cat.png',
        locationName: '순천시 조곡동 근처 (동천변)',
        latitude: 34.9621,
        longitude: 127.4883,
        observedAt: '오늘 09:30',
        reporterName: '산책왕',
        tnrIdentified: true,
        notes: '벤치 아래에서 식빵 굽고 있었습니다.',
      }
    ],
    comments: [
      {
        id: 'c-3',
        author: '동천러너',
        content: '조곡동 산책로 필수 코스 쿠키 만나기! 턱시도 모색이 너무 돋보여요.',
        createdAt: '4시간 전'
      }
    ]
  },
  {
    id: 'cat-3',
    name: '나비 (삼색이)',
    colorPattern: '삼색이',
    tnrStatus: true,
    gender: '암컷',
    mainImageUrl: '/images/calico_cat.png',
    description: '오렌지, 블랙, 화이트 삼색 파스텔 무늬가 매력적인 여왕님. 지역 화단 근처에서 자주 출몰합니다.',
    totalObservations: 18,
    lastObservedLocation: '순천시 삼산동 (삼산공원 화단)',
    lastObservedAt: '1시간 전',
    latitude: 34.9742,
    longitude: 127.4751,
    locationStats: [
      { areaName: '삼산동 공원 화단', percentage: 70 },
      { areaName: '순천대 7호관 뒤편', percentage: 30 },
    ],
    timeStats: {
      morning: 40,
      afternoon: 40,
      night: 20,
    },
    observations: [
      {
        id: 'obs-3-1',
        catId: 'cat-3',
        imageUrl: '/images/calico_cat.png',
        locationName: '순천시 삼산동 근처',
        latitude: 34.9742,
        longitude: 127.4751,
        observedAt: '오늘 10:45',
        reporterName: '그린보이',
        tnrIdentified: true,
        notes: '풀밭에 앉아 애교 부리네요.',
      }
    ],
    comments: [
      {
        id: 'c-4',
        author: '자연사랑',
        content: '나비 귀 컷팅 표시 확실하네요! 든든합니다.',
        createdAt: '2시간 전'
      }
    ]
  },
  {
    id: 'cat-4',
    name: '꼬맹이',
    colorPattern: '치즈 태비',
    tnrStatus: false,
    gender: '미상',
    mainImageUrl: '/images/cat_shelter.png',
    description: '최근에 석현동 쉼터 근처에 나타나기 시작한 아기 고양이. 호기심이 많으며 TNR 사업 모니터링 대상입니다.',
    totalObservations: 5,
    lastObservedLocation: '순천시 석현동 (마을 쉼터)',
    lastObservedAt: '어제',
    latitude: 34.9654,
    longitude: 127.4842,
    locationStats: [
      { areaName: '석현동 마을 쉼터', percentage: 80 },
      { areaName: '매곡동 주택가', percentage: 20 },
    ],
    timeStats: {
      morning: 10,
      afternoon: 30,
      night: 60,
    },
    observations: [
      {
        id: 'obs-4-1',
        catId: 'cat-4',
        imageUrl: '/images/cat_shelter.png',
        locationName: '순천시 석현동 근처',
        latitude: 34.9654,
        longitude: 127.4842,
        observedAt: '어제 20:15',
        reporterName: '이웃사촌',
        tnrIdentified: false,
        notes: '귀 컷팅 안 되어 있어요. 추후 TNR 지원 신청 필요해 보입니다.',
      }
    ],
    comments: [
      {
        id: 'c-5',
        author: '순천시민',
        content: '포획틀 설치 관련해서 설정 탭에서 지자체 지원사업 확인해 볼게요!',
        createdAt: '어제'
      }
    ]
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: '순천대 냥집사',
    authorRole: '학생',
    content: '순천대 후문 쉼터에 깨끗한 물과 사료 넉넉하게 채워두었습니다! 치즈 1호가 맛있게 먹고 햇볕 쬐네요 ㅎㅎ ☀️',
    imageUrl: '/images/cat_shelter.png',
    locationTag: '석현동 순천대 후문',
    createdAt: '45분 전',
    likes: 12,
    comments: [
      {
        id: 'pc-1',
        author: '컴공이',
        content: '감사합니다! 수업 끝나고 츄르 챙겨가볼게요 ㅎㅎ',
        createdAt: '30분 전'
      }
    ]
  },
  {
    id: 'post-2',
    author: '동천 산책러',
    authorRole: '주민',
    content: '조곡동 동천 산책로에서 턱시도 쿠키 만났어요! 안심 버블 지도로 위치 파악하니까 아이들 보호도 되고 든든하네요. 🐾',
    imageUrl: '/images/tuxedo_cat.png',
    locationTag: '조곡동 동천변',
    createdAt: '2시간 전',
    likes: 19,
    comments: []
  },
  {
    id: 'post-3',
    author: '석현동 따스함',
    authorRole: '캣맘/캣대디',
    content: '9월 순천시 길고양이 TNR(중성화) 지원 접수가 시작되었습니다! 미중성화 개체(꼬맹이) 발견 시 설정 탭의 안내 참고해서 제보 부탁드립니다.',
    locationTag: '순천시 석현동/삼산동 전체',
    createdAt: '5시간 전',
    likes: 31,
    comments: [
      {
        id: 'pc-2',
        author: '행정지킴이',
        content: '유용한 정보 감사합니다. 안심 버블 앱 덕분에 개체 파악이 쉬워졌어요.',
        createdAt: '4시간 전'
      }
    ]
  },
  {
    id: 'post-4',
    author: '삼산동 미소',
    authorRole: '주민',
    content: '삼색이 나비 화단에서 오드아이처럼 예쁘게 눈 맞추네요! 사진 공유합니다 ❤️',
    imageUrl: '/images/calico_cat.png',
    locationTag: '삼산동 공원 근처',
    createdAt: '어제',
    likes: 24,
    comments: []
  }
];
