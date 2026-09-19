import React from 'react';
import { CatProvider, useCatContext } from './context/CatContext';
import { Header } from './components/layout/Header';
import { NavigationBar } from './components/layout/NavigationBar';
import { SafeBubbleMap } from './components/map/SafeBubbleMap';
import { CatBottomSheet } from './components/map/CatBottomSheet';
import { PhotoReportModal } from './components/ai/PhotoReportModal';
import { CatBookView } from './components/archive/CatBookView';
import { CommunityView } from './components/community/CommunityView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent: React.FC = () => {
  const { activeTab } = useCatContext();

  return (
    <main className="relative flex-1 overflow-y-auto no-scrollbar">
      {activeTab === 'map' && (
        <>
          <SafeBubbleMap />
          <CatBottomSheet />
          <PhotoReportModal />
        </>
      )}
      {activeTab === 'book' && <CatBookView />}
      {activeTab === 'community' && <CommunityView />}
      {activeTab === 'settings' && <SettingsView />}
    </main>
  );
};

export default function App() {
  return (
    <CatProvider>
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 font-sans">
        {/* Mobile Device Frame Container for Hackathon Presentation */}
        <div className="w-full max-w-md h-screen sm:h-[844px] bg-white sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-gray-900 overflow-hidden flex flex-col relative">
          <Header />
          <MainContent />
          <NavigationBar />
        </div>
      </div>
    </CatProvider>
  );
}
