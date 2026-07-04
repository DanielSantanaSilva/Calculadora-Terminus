import { useState } from 'react';
import PropTypes from 'prop-types';

function Results({ x, y, z, onCopySound }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const isComplete = x !== null && y !== null && z !== null;

  const r1 = isComplete ? Math.abs((x * 2) + 11) : null;
  const r2 = isComplete ? Math.abs((z * 2) + y - 5) : null;
  const r3 = isComplete ? Math.abs((z + y) - x) : null;

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      if (onCopySound) onCopySound();
      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    });
  };

  const copyAll = () => {
    if (!isComplete) return;
    const allText = `${r1} ${r2} ${r3}`;
    copyToClipboard(allText, 'all');
  };

  return (
    <div className={`results-terminal ${isComplete ? 'decrypted' : ''}`}>
      <div className="terminal-bar">
        <div className="terminal-lights">
          <span className={`light red ${!isComplete ? 'blink' : ''}`}></span>
          <span className="light yellow"></span>
          <span className={`light green ${isComplete ? 'glow' : ''}`}></span>
        </div>
        <span className="terminal-title">TERMINAL DE DESCRIPTOGRAFIA</span>
      </div>

      <div className="terminal-content">
        {!isComplete ? (
          <div className="terminal-idle">
            <p className="terminal-msg blink-slow">&gt;&gt; AGUARDANDO DADOS DE ENTRADA...</p>
            <p className="terminal-hint">Selecione os símbolos para as variáveis X, Y e Z para descriptografar o código final.</p>
          </div>
        ) : (
          <div className="terminal-active">
            <div className="terminal-status-row">
              <span className="status-label">&gt;&gt; STATUS:</span>
              <span className="status-tag success">CÓDIGO DESCRIPTOGRAFADO COM SUCESSO</span>
            </div>

            <div className="results-grid">
              {/* Result 1 */}
              <div className="result-card">
                <div className="result-header">
                  <span>1° NÚMERO</span>
                  <span className="formula-tag">2X + 11</span>
                </div>
                <div className="result-math">
                  2 &times; ({x}) + 11
                </div>
                <div className="result-display-wrapper">
                  <div className="result-number-glow">{r1}</div>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(r1.toString(), 1)}
                    title="Copiar 1° número"
                  >
                    {copiedIndex === 1 ? 'COPIADO' : 'COPIAR'}
                  </button>
                </div>
              </div>

              {/* Result 2 */}
              <div className="result-card">
                <div className="result-header">
                  <span>2° NÚMERO</span>
                  <span className="formula-tag">2Z + Y - 5</span>
                </div>
                <div className="result-math">
                  2 &times; ({z}) + {y} - 5
                </div>
                <div className="result-display-wrapper">
                  <div className="result-number-glow">{r2}</div>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(r2.toString(), 2)}
                    title="Copiar 2° número"
                  >
                    {copiedIndex === 2 ? 'COPIADO' : 'COPIAR'}
                  </button>
                </div>
              </div>

              {/* Result 3 */}
              <div className="result-card">
                <div className="result-header">
                  <span>3° NÚMERO</span>
                  <span className="formula-tag">|Z + Y - X|</span>
                </div>
                <div className="result-math">
                  |{z} + {y} - {x}|
                </div>
                <div className="result-display-wrapper">
                  <div className="result-number-glow">{r3}</div>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(r3.toString(), 3)}
                    title="Copiar 3° número"
                  >
                    {copiedIndex === 3 ? 'COPIADO' : 'COPIAR'}
                  </button>
                </div>
              </div>
            </div>

            <div className="all-results-action">
              <div className="full-code-display">
                CÓDIGO COMPLETO: <span className="highlight-code">{r1} - {r2} - {r3}</span>
              </div>
              <button 
                className="copy-all-btn"
                onClick={copyAll}
              >
                {copiedIndex === 'all' ? 'CÓDIGO COMPLETO COPIADO!' : 'COPIAR CÓDIGO COMPLETO'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Results.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  onCopySound: PropTypes.func,
};

export default Results;
