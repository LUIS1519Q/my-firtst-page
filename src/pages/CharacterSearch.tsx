import { useState } from 'react';
import Button from '../components/ui/Button';

// TypeScript strict interfaces
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

interface SearchProps {
  onBack: () => void;
}

export default function CharacterSearch({ onBack }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Character[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // API Fetch requirement
  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
      const data = await response.json();
      
      if (data.results) {
        setResults(data.results.slice(0, 8));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Array Reduce requirement: Count alive characters
  const aliveCount = results.reduce((acc, character) => {
    return character.status === 'Alive' ? acc + 1 : acc;
  }, 0);

  // Array Find requirement: Locate specific character by ID
  const selectedCharacter = results.find(char => char.id === selectedId);

  // DETAIL VIEW
  if (selectedCharacter) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-4">{selectedCharacter.name}</h2>
        <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-full rounded-lg border-4 border-gray-200 mb-4" />
        <div className="text-left bg-gray-50 p-4 rounded mb-6">
          <p><strong>Status:</strong> {selectedCharacter.status === 'Alive' ? '🟢 Alive' : '🔴 Dead/Unknown'}</p>
          <p><strong>Species:</strong> {selectedCharacter.species}</p>
          <p><strong>Origin:</strong> {selectedCharacter.origin.name}</p>
          <p><strong>Location:</strong> {selectedCharacter.location.name}</p>
        </div>
        <Button onClick={() => setSelectedId(null)} className="w-full">⬅ Back to Results</Button>
      </div>
    );
  }

  // MAIN SEARCH VIEW
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Rick & Morty API Search</h2>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input 
          type="text" 
          placeholder="E.g: Rick, Morty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 p-3 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      
      <>
        {isLoading && <p className="text-center text-gray-500 mb-4">Searching data...</p>}
        {results.length > 0 && (
          <p className="text-center font-semibold text-green-600 mb-6">
            Characters alive in these results: {aliveCount}
          </p>
        )}
      </>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((character) => (
          <div key={character.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <img src={character.image} alt={character.name} className="w-full h-auto rounded mb-3" />
            <div className="flex flex-col flex-1 w-full">
              <h3 className="font-bold text-lg mb-1">{character.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{character.species}</p>
              <Button onClick={() => setSelectedId(character.id)} className="mt-auto w-full text-sm py-2">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 border-t pt-6">
        <Button onClick={onBack} className="bg-gray-500 hover:bg-gray-600">⬅ Back to Main Menu</Button>
      </div>
    </div>
  );
}