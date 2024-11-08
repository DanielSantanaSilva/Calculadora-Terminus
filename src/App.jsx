import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function App() {
  const [selectedValues, setSelectedValues] = useState({
    x: null,
    y: null,
    z: null
  });

  const symbols = [
    { value: 0,  image: 'https://i.ibb.co/5rDRw30/symbols-01.jpg' },
    { value: 10, image: 'https://i.ibb.co/PFmbJ00/symbols-02.jpg' },
    { value: 11, image: 'https://i.ibb.co/FqXw4mG/symbols-03.jpg' },
    { value: 20, image: 'https://i.ibb.co/TrNY7Qf/symbols-04.jpg' },
    { value: 21, image: 'https://i.ibb.co/jfYKRth/symbols-05.jpg' },
    { value: 22, image: 'https://i.ibb.co/bXGth05/symbols-06.jpg' }
  ];

  const handleSelect = (variable, value) => {
    setSelectedValues(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const calculateResults = () => {
    const { x, y, z } = selectedValues;
    if (x === null || y === null || z === null) return null;

    return {
      result1: Math.abs((x * 2) + 11),
      result2: Math.abs((z * 2) + y - 5),
      result3: Math.abs((z + y) - x)
    };
  };

  const results = calculateResults();

  const Variable = ({ name }) => (
    <div className="variable" id={`${name.toLowerCase()}-variables`}>
      <h2>{name}:</h2>
      {symbols.map((symbol) => (
        <div 
          key={symbol.value}
          className="image-option"
          onClick={() => handleSelect(name.toLowerCase(), symbol.value)}
        >
          <img
            src={symbol.image}
            alt={`Value ${symbol.value}`}
            className={selectedValues[name.toLowerCase()] === symbol.value ? 'selected' : ''}
          />
        </div>
      ))}
    </div>
  );

  Variable.propTypes = {
    name: PropTypes.string.isRequired
  };

  return (
    <>
      <h1>Calculadora Terminus (Zumbis - BO6)</h1>    
      <h2>Selecione valores para X, Y e Z</h2>

      <div className="variables-container">
        <Variable name="X" />
        <Variable name="Y" />
        <Variable name="Z" />
      </div>

      <div id="results">
        <h3>Resultado:</h3>
        <p id="result1">1° Numero: {results && <strong>{results.result1}</strong>}</p>
        <p id="result2">2° Numero: {results && <strong>{results.result2}</strong>}</p>
        <p id="result3">3° Numero: {results && <strong>{results.result3}</strong>}</p>
      </div>

      <div className="footer">
        <p>
          <a href="https://github.com/DanielSantanaSilva" target="_blank" rel="noopener noreferrer">
          Criado por Daniel Santana
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
