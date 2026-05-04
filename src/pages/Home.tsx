import Button from '../components/ui/Button';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">Practice Menu</h1>
      
      <div className="flex flex-col gap-5 w-full max-w-xs">
        <Button onClick={() => onNavigate('addition')} className="text-lg py-3 shadow-sm">
          1. Basic Addition
        </Button>
        <Button onClick={() => onNavigate('calculator')} className="text-lg py-3 shadow-sm">
          2. Calculator
        </Button>
        <Button onClick={() => onNavigate('api')} className="text-lg py-3 shadow-sm">
          3. Rick & Morty API
        </Button>
      </div>
    </div>
  );
}