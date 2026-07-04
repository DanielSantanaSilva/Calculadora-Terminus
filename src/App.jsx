import { useState, useEffect, useRef } from 'react';
import './App.css';
import VariableSelector from './components/VariableSelector';
import Results from './components/Results';
import {
  playClick,
  playSuccess,
  playReset,
  toggleMute,
  getMuteState
} from './utils/audio';

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

  const [muted, setMuted] = useState(getMuteState());
  const prevIsComplete = useRef(false);

  const symbols = [
    { value: 0,  image: note00, background: bgImage },
    { value: 10, image: note10, background: bgImage },
    { value: 11, image: note11, background: bgImage },
    { value: 20, image: note20, background: bgImage },
    { value: 21, image: note21, background: bgImage },
    { value: 22, image: note22, background: bgImage },
  ];

  const handleSelect = (variable, value) => {
    playClick();
    setSelectedValues(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const handleReset = () => {
    playReset();
    setSelectedValues({
      x: null,
      y: null,
      z: null
    });
  };

  const handleToggleMute = () => {
    const nextMuted = toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      // Play a quick feedback click when unmuting
      setTimeout(() => playClick(), 50);
    }
  };

  // Play success sound when all values are selected
  const isComplete = selectedValues.x !== null && selectedValues.y !== null && selectedValues.z !== null;
  useEffect(() => {
    if (isComplete && !prevIsComplete.current) {
      playSuccess();
    }
    prevIsComplete.current = isComplete;
  }, [isComplete]);

  return (
    <div className="app-container">
      {/* Background scanline effect overlay */}
      <div className="scanlines"></div>

      <header className="app-header">
        <div className="header-hud">
          <div className="hud-badge">SYS_ONLINE</div>
          <div className="hud-title-wrapper">
            <h1 className="hud-title">CALCULADORA TERMINUS</h1>
            <p className="hud-subtitle">BLACK OPS 6 ZOMBIES DECIPHER PROTOCOL</p>
          </div>
          <button 
            className={`audio-toggle-btn ${muted ? 'muted' : ''}`}
            onClick={handleToggleMute}
            title={muted ? 'Ativar som' : 'Silenciar'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Helper Panel */}
        <section className="map-reference">
          <div className="reference-title">
            <span className="blink-slow">&bull;</span> MANUAL DE OPERAÇÃO
          </div>
          <p className="reference-text">
            Encontre os 3 símbolos nas salas do mapa <strong>Terminus</strong> (X, Y e Z). Insira seus valores correspondentes abaixo. O terminal executará as equações e descriptografará a senha do computador de laboratório.
          </p>
        </section>

        {/* Variables selector grids */}
        <div className="selectors-container">
          <VariableSelector
            name="X"
            selectedValue={selectedValues.x}
            symbols={symbols}
            onSelect={(val) => handleSelect('x', val)}
          />
          <VariableSelector
            name="Y"
            selectedValue={selectedValues.y}
            symbols={symbols}
            onSelect={(val) => handleSelect('y', val)}
          />
          <VariableSelector
            name="Z"
            selectedValue={selectedValues.z}
            symbols={symbols}
            onSelect={(val) => handleSelect('z', val)}
          />
        </div>

        {/* Action Bar (Reset) */}
        <div className="actions-bar">
          <button 
            className="reset-btn"
            onClick={handleReset}
            disabled={selectedValues.x === null && selectedValues.y === null && selectedValues.z === null}
          >
            LIMPAR SELEÇÕES
          </button>
        </div>

        {/* Decryption Terminal Results */}
        <Results
          x={selectedValues.x}
          y={selectedValues.y}
          z={selectedValues.z}
          onCopySound={playClick}
        />
      </main>

      <footer className="app-footer">
        <a 
          href="https://github.com/DanielSantanaSilva"
          target="_blank" 
          rel="noreferrer" 
          className="footer-link"
        >
          &copy; Daniel Santana - GitHub Project Repository
        </a>
      </footer>
    </div>
  );
}

export default App;
