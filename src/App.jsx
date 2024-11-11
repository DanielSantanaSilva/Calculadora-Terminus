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
      <h2 style={{ fontSize: '2rem', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>{name}:</h2>
      <div className="symbols-grid">
        {symbols.map((symbol) => (
          <div 
            key={symbol.value}
            className={`image-option ${selectedValues[name.toLowerCase()] === symbol.value ? 'selected' : ''}`}
            onClick={() => handleSelect(name.toLowerCase(), symbol.value)}
            style={{
              backgroundImage: `url(${symbol.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '80px',
              height: '80px'
            }}
          >
            <img
              src={symbol.image}
              alt={`Value ${symbol.value}`}
              style={{ width: '90%', height: '90%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  Variable.propTypes = {
    name: PropTypes.string.isRequired
  };

  return (
    <div className="main-container" style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0 1rem',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontFamily: "'Call of Duty', monospace", 
        fontSize: '3rem', 
        textAlign: 'center', 
        padding: '0 1rem',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
      }}>
        CALLCULATOR TERMINUS
      </h1>    
      <h2 style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', fontSize: '1rem', textAlign: 'center' }}>
        Selecione valores para X, Y e Z
      </h2>

      <div className="content-wrapper" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: window.innerWidth >= 768 ? '0.01rem' : '0.2rem',
        padding: '0 1rem',
        flex: '1'
      }}>
        <div className="variables-container" style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: window.innerWidth >= 768 ? '0.01rem' : '0.2rem'
        }}>
          <Variable name="X" />
          <Variable name="Y" />
          <Variable name="Z" />
        </div>

        {results && results.result1 && results.result2 && results.result3 && (
          <div className="results-container" style={{
            width: '100%',
            marginTop: window.innerWidth >= 768 ? '-1rem' : '-0.5rem'
          }}>
            <div className="results-row" style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '0.5rem'
            }}>
              {[results.result1, results.result2, results.result3].map((result, index) => (
                <div key={index} className="result-box" style={{
                  padding: '0.5rem',
                  minWidth: '50px',
                  textAlign: 'center',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}>
                  <p id={`result${index + 1}`}>
                    <strong style={{ fontSize: '1.5rem' }}>{result}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="footer" style={{ 
        padding: '1rem',
        marginTop: window.innerWidth >= 768 ? 'auto' : '1rem'
      }}>
        <p>
          <a 
            target="_blank" 
            rel="noreferrer" 
            className="copyright" 
            href="https://github.com/DanielSantanaSilva"
            style={{ color: 'white', fontSize: '0.9rem' }}
          >
            © Daniel Santana (GitHub)
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;


