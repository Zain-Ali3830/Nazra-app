import { useCallback, useMemo, useState } from 'react';
import data from './data/data.json';
import sixKalmasData from './data/sixKalmas.json';
import type { CategoryId } from './types';
import { useLearned } from './hooks/useLearned';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { StepListPage } from './pages/StepListPage';
import { TextPage } from './pages/TextPage';
import { SunnahDuas } from './pages/SunnahDuas';
import { Nazra } from './pages/Nazra';
import { SixKalmas } from './pages/SixKalmas';
import { CelebrationProvider } from './context/CelebrationContext';

type View = CategoryId | 'home';

export default function App() {
  const [view, setView] = useState<View>('home');
  const { learnedCount } = useLearned();
  const { theme, toggleTheme } = useTheme();

  const navigate = useCallback((id: View) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getProgress = useCallback(
    (id: CategoryId): { learned: number; total: number } => {
      if (id === 'wudu') {
        const steps = data.wudu.steps ?? [];
        const ids = steps.map((s) => `wudu:${s.id}`);
        return { learned: learnedCount(ids), total: steps.length };
      }
      if (id === 'salah') {
        const steps = data.salah.steps ?? [];
        const ids = steps.map((s) => `salah:${s.id}`);
        return { learned: learnedCount(ids), total: steps.length };
      }
      return { learned: 0, total: 0 };
    },
    [learnedCount],
  );

  const content = useMemo(() => {
    switch (view) {
      case 'home':
        return <Home onNavigate={navigate} getProgress={getProgress} />;
      case 'wudu':
        return (
          <StepListPage section={data.wudu} onBack={() => navigate('home')} storagePrefix="wudu" />
        );
      case 'salah':
        return (
          <StepListPage section={data.salah} onBack={() => navigate('home')} storagePrefix="salah" />
        );
      case 'ayatulKursi':
        return <TextPage section={data.ayatulKursi} onBack={() => navigate('home')} />;
      case 'duaQunoot':
        return <TextPage section={data.duaQunoot} onBack={() => navigate('home')} />;
      case 'sunnahDuas':
        return <SunnahDuas duas={data.sunnahDuas} onBack={() => navigate('home')} />;
      case 'nazra':
        return <Nazra section={data.nazra} onBack={() => navigate('home')} />;
      case 'sixKalmas':
        return <SixKalmas kalmas={sixKalmasData} onBack={() => navigate('home')} />;
      default:
        return <Home onNavigate={navigate} getProgress={getProgress} />;
    }
  }, [view, navigate, getProgress]);

  return (
    <CelebrationProvider>
      <div className="min-h-screen flex">
        <Navigation active={view} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex-1 min-w-0">{content}</main>
      </div>
    </CelebrationProvider>
  );
}
