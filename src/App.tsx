import { useState } from 'react';
import './App.css';

function App() {
  const [numberOne, setNumberOne] = useState('');
  const [numberTwo, setNumberTwo] = useState('');

  const handleClick = () => {
    const resultado = Number(numberOne) + Number(numberTwo);
    alert(`The result is ${resultado}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <label>Number 1: </label>
        <input 
          type="number" 
          value={numberOne} 
          onChange={(e) => setNumberOne(e.target.value)} 
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Number 2: </label>
        <input 
          type="number" 
          value={numberTwo} 
          onChange={(e) => setNumberTwo(e.target.value)} 
        />
      </div>

      <button 
        type="button" 
        onClick={handleClick} 
        style={{ marginTop: '20px' }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;