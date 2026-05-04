import { useState } from 'react';
import Home from './pages/Home';
import Addition from './pages/Addition';
import Calculator from './pages/Calculator';
import CharacterSearch from './pages/CharacterSearch';

export default function App() {
  // Hook requirement
  const [currentView, setCurrentView] = useState<string>('menu');

  return (
    // We use <main> because it requires global styling classes. No empty <div>s used.
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4">
      
      {currentView === 'menu' && <Home onNavigate={setCurrentView}/>}
      {currentView === 'addition' && <Addition onBack={() => setCurrentView('menu')} />}
      {currentView === 'calculator' && <Calculator onBack={() => setCurrentView('menu')} />}
      {currentView === 'api' && <CharacterSearch onBack={() => setCurrentView('menu')} />}
    </main>
  );
}