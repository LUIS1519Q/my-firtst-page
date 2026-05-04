import { useState } from 'react';
import Button from '../components/ui/Button';

interface AdditionProps {
  onBack: () => void;
}

export default function Addition({ onBack }: AdditionProps) {
  // Hooks and TypeScript typing
  const [numberOne, setNumberOne] = useState<string>('');
  const [numberTwo, setNumberTwo] = useState<string>('');

  const handleCalculate = () => {
    const result = Number(numberOne) + Number(numberTwo);
    alert(`The result is ${result}`);
  };

  return (
    // Flex requirement
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Basic Addition</h2>
      
      <div className="flex flex-col gap-4 w-full mb-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Number 1:</label>
          <input 
            type="number" 
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={numberOne} 
            onChange={(e) => setNumberOne(e.target.value)} 
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Number 2:</label>
          <input 
            type="number" 
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={numberTwo} 
            onChange={(e) => setNumberTwo(e.target.value)} 
          />
        </div>
      </div>

      <Button onClick={handleCalculate} className="w-full mb-6">Submit</Button>
      
      <hr className="w-full border-gray-300 mb-4" />
      <Button onClick={onBack} className="w-full bg-gray-500 hover:bg-gray-600">⬅ Back to Menu</Button>
    </div>
  );
}