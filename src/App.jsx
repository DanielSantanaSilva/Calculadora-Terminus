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
      <h2 style={{ fontSize: '2rem' }}>{name}:</h2>
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
    <div className="main-container">
      <h1>CALCULADORA TERMINUS (Zumbis - BO6)</h1>    
      <h2>Selecione valores para X, Y e Z</h2>

      <div className="content-wrapper" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div className="variables-container">
          <Variable name="X" />
          <Variable name="Y" />
          <Variable name="Z" />
        </div>

        <div className="results-container" style={{
          alignSelf: 'flex-end',
          marginRight: '2rem'
        }}>
          <div className="results-row">
            {results && (
              <>
                <div className="result-box">
                  <p id="result1">
                    <strong style={{ fontSize: '2.5rem' }}>{results.result1}</strong>
                  </p>
                </div>
                <div className="result-box">
                  <p id="result2">
                    <strong style={{ fontSize: '2.5rem' }}>{results.result2}</strong>
                  </p>
                </div>
                <div className="result-box">
                  <p id="result3">
                    <strong style={{ fontSize: '2.5rem' }}>{results.result3}</strong>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <p>
        <a target="_blank" rel="noreferrer" className="copyright" href="https://github.com/DanielSantanaSilva">© Daniel Santana (GitHub)</a>
        </p>
      </div>
    </div>
  );
}

export default App;


