import React, { useEffect, useRef, useState } from 'react';
import { useCatContext } from '../../context/CatContext';
import L from 'leaflet';
import { Camera, Shield, Layers, Map as MapIcon, Globe, Image as ImageIcon } from 'lucide-react';

export type MapTileStyle = 'osm' | 'voyager' | 'satellite';

interface TileProvider {
  id: MapTileStyle;
  name: string;
  url: string;
  attribution: string;
  subdomains?: string[];
  maxZoom: number;
}

const TILE_PROVIDERS: Record<MapTileStyle, TileProvider> = {
  osm: {
    id: 'osm',
    name: '기본 지도 (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
  voyager: {
    id: 'voyager',
    name: '상세 로드맵 (Voyager)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 19,
  },
  satellite: {
    id: 'satellite',
    name: '위성 / 항공 뷰 (Esri)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  },
};

export const SafeBubbleMap: React.FC = () => {
  const { cats, safeRadius, setSelectedCat, setIsReportModalOpen } = useCatContext();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeTile, setActiveTile] = useState<MapTileStyle>('osm');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState<boolean>(false);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Sunchon National University area (34.9685, 127.4792)
    const map = L.map(mapContainerRef.current, {
      center: [34.9685, 127.4792],
      zoom: 15,
      zoomControl: false,
    });

    // Initial Tile Layer (OpenStreetMap)
    const provider = TILE_PROVIDERS.osm;
    const initialTile = L.tileLayer(provider.url, {
      maxZoom: provider.maxZoom,
      attribution: provider.attribution,
      subdomains: provider.subdomains || ['a', 'b', 'c'],
    }).addTo(map);
    tileLayerRef.current = initialTile;

    L.control.zoom({ position: 'topright' }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    // Handle Map Resizing & invalidateSize on mount (200ms delay to prevent gray tile breakage)
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    const handleWindowResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleWindowResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Map Resizer on tab mount/update
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // 3. Tile Layer Switcher
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const provider = TILE_PROVIDERS[activeTile];

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newTile = L.tileLayer(provider.url, {
      maxZoom: provider.maxZoom,
      attribution: provider.attribution,
      subdomains: provider.subdomains || ['a', 'b', 'c'],
    }).addTo(map);

    tileLayerRef.current = newTile;
  }, [activeTile]);

  // 4. Update Safe Bubbles & Cat Markers on Cat dataset or Radius change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    cats.forEach((cat) => {
      // 1. Render Safe Bubble Circle (Location blurring protection)
      const circle = L.circle([cat.latitude, cat.longitude], {
        radius: safeRadius,
        color: activeTile === 'satellite' ? '#FFD54F' : '#FF8A65',
        weight: 2,
        fillColor: activeTile === 'satellite' ? '#FFE082' : '#FFCC80',
        fillOpacity: activeTile === 'satellite' ? 0.45 : 0.35,
        className: 'animate-bubble-pulse',
      });

      // 2. Custom HTML Marker at center of bubble
      const iconHtml = `
        <div class="relative group cursor-pointer transform transition-transform hover:scale-110">
          <!-- Outer Pulsing Glow -->
          <div class="absolute -inset-2 bg-orange-400/40 rounded-full blur-md animate-pulse"></div>
          
          <!-- Avatar Frame -->
          <div class="relative w-12 h-12 rounded-full border-3 border-white shadow-lg bg-orange-100 overflow-hidden flex items-center justify-center">
            <img src="${cat.mainImageUrl}" alt="${cat.name}" class="w-full h-full object-cover" />
          </div>

          <!-- Observation Count Badge -->
          <div class="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-white shadow-md flex items-center">
            <span>${cat.totalObservations}회</span>
          </div>

          <!-- Name Label Pill -->
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-white/20">
            ${cat.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-cat-icon',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      const marker = L.marker([cat.latitude, cat.longitude], { icon: customIcon });

      const handleClick = () => {
        setSelectedCat(cat);
        map.panTo([cat.latitude, cat.longitude], { animate: true, duration: 0.8 });
      };

      circle.on('click', handleClick);
      marker.on('click', handleClick);

      layerGroup.addLayer(circle);
      layerGroup.addLayer(marker);
    });
  }, [cats, safeRadius, activeTile, setSelectedCat]);

  return (
    <div className="relative w-full h-full min-h-[400px] h-[calc(100vh-7rem)] overflow-hidden">
      {/* Map Container with explicit height */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[400px]" />

      {/* Top Floating Banner: Safe Bubble Banner */}
      <div className="absolute top-3 left-3 right-14 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-orange-100 flex items-center justify-between text-xs text-gray-700">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
            <div>
              <span className="font-bold text-gray-800">위치 보호 안심 버블</span>
              <span className="text-[11px] text-gray-500 block">반경 블러 처리 ({safeRadius}m)</span>
            </div>
          </div>
          <div className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-lg border border-orange-200">
            {cats.length}마리 포착
          </div>
        </div>
      </div>

      {/* Layer Selector Controller (Top Right Layer Control) */}
      <div className="absolute top-14 right-3 z-30">
        <div className="relative">
          <button
            onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
            className="w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg flex items-center justify-center text-gray-700 hover:bg-orange-50 transition active:scale-95"
            title="지도 레이어 전환"
          >
            <Layers className="w-4 h-4 text-orange-600" />
          </button>

          {/* Layer Menu Dropdown */}
          {isLayerMenuOpen && (
            <div className="absolute right-0 top-11 w-44 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-1.5 space-y-1 z-40 animate-scale-up">
              <div className="text-[10px] font-bold text-gray-400 px-2 py-1 border-b border-gray-100 flex items-center justify-between">
                <span>지도 레이어 선택</span>
                <MapIcon className="w-3 h-3 text-orange-400" />
              </div>

              <button
                onClick={() => {
                  setActiveTile('osm');
                  setIsLayerMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 text-xs font-bold p-2 rounded-xl transition ${
                  activeTile === 'osm' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="truncate">기본 지도 (OSM)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTile('voyager');
                  setIsLayerMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 text-xs font-bold p-2 rounded-xl transition ${
                  activeTile === 'voyager' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">상세 로드맵 (Voyager)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTile('satellite');
                  setIsLayerMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 text-xs font-bold p-2 rounded-xl transition ${
                  activeTile === 'satellite' ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">위성 / 항공 뷰 (Esri)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button (📷 사진 제보하기) */}
      <div className="absolute bottom-6 right-4 z-30">
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="group relative flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-extrabold px-5 py-3.5 rounded-full shadow-xl shadow-orange-300/60 active:scale-95 transition-all duration-200 border-2 border-white"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm tracking-tight pr-1">사진 제보하기</span>
          
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 blur-sm opacity-40 group-hover:opacity-75 transition duration-300 -z-10"></span>
        </button>
      </div>
    </div>
  );
};
