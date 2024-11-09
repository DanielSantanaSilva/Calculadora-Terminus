import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import note00 from './assets/00.svg';
import note10 from './assets/10.svg';
import note11 from './assets/11.svg';
import note20 from './assets/20.svg';
import note21 from './assets/21.svg';
import note22 from './assets/22.svg';
import bgImage from './assets/bg.jpg';

function App() {
  const [selectedValues, setSelectedValues] = useState({
    x: null,
    y: null,
    z: null
  });

  const symbols = [
    { value: 0,  image: note00, background: bgImage },
    { value: 10, image: note10, background: bgImage },
    { value: 11, image: note11, background: bgImage },
    { value: 20, image: note20, background: bgImage },
    { value: 21, image: note21, background: bgImage },
    { value: 22, image: note22, background: bgImage },
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
          className={`image-option ${selectedValues[name.toLowerCase()] === symbol.value ? 'selected' : ''}`}
          onClick={() => handleSelect(name.toLowerCase(), symbol.value)}
          style={{
            backgroundImage: `url(${symbol.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <img
            src={symbol.image}
            alt={`Value ${symbol.value}`}
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
