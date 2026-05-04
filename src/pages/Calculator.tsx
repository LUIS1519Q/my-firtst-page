import { useState } from 'react';
import Button from '../components/ui/Button';

interface CalculatorProps {
  onBack: () => void;
}

export default function Calculator({ onBack }: CalculatorProps) {
  const [screen, setScreen] = useState<string>('');

  const handleAddValue = (value: string) => setScreen(screen + value);
  const handleClearAll = () => setScreen('');
  const handleClearOne = () => setScreen(screen.slice(0, -1)); 
  
  const handleCalculate = () => {
    try {
      setScreen(eval(screen).toString());
    } catch (error) {
      setScreen('Error');
    }
  };

  // List management requirement
  const numericButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Physical Calculator</h2>
      
      <div className="w-64 bg-gray-100 p-4 rounded-xl border border-gray-300 shadow-lg">
        <input 
          type="text" 
          value={screen} 
          readOnly 
          className="w-full text-right mb-4 text-xl p-3 bg-white border border-gray-300 rounded focus:outline-none"
        />
        
        
        <div className="grid grid-cols-4 gap-2">
          <button onClick={handleClearAll} className="col-span-2 p-3 bg-red-400 text-white rounded font-bold hover:bg-red-500">C</button>
          <button onClick={handleClearOne} className="p-3 bg-yellow-400 text-white rounded font-bold hover:bg-yellow-500">DEL</button>
          <button onClick={() => handleAddValue('/')} className="p-3 bg-gray-300 rounded font-bold hover:bg-gray-400">/</button>
          
          
          {numericButtons.map((num) => (
            <button key={num} onClick={() => handleAddValue(num)} className="p-3 bg-white border border-gray-200 rounded font-bold hover:bg-gray-50">
              {num}
            </button>
          ))}

          <button onClick={() => handleAddValue('*')} className="col-start-4 row-start-2 p-3 bg-gray-300 rounded font-bold hover:bg-gray-400">*</button>
          <button onClick={() => handleAddValue('-')} className="col-start-4 row-start-3 p-3 bg-gray-300 rounded font-bold hover:bg-gray-400">-</button>
          <button onClick={() => handleAddValue('+')} className="col-start-4 row-start-4 p-3 bg-gray-300 rounded font-bold hover:bg-gray-400">+</button>
          
          <button onClick={() => handleAddValue('0')} className="col-span-2 p-3 bg-white border border-gray-200 rounded font-bold hover:bg-gray-50">0</button>
          <button onClick={() => handleAddValue('.')} className="p-3 bg-white border border-gray-200 rounded font-bold hover:bg-gray-50">.</button>
          <button onClick={handleCalculate} className="p-3 bg-blue-500 text-white rounded font-bold hover:bg-blue-600">=</button>
        </div>
      </div>
      
      <Button onClick={onBack} className="mt-8 bg-gray-500 hover:bg-gray-600">⬅ Back to Menu</Button>
    </div>
  );
}