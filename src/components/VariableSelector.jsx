import PropTypes from 'prop-types';

function VariableSelector({ name, selectedValue, symbols, onSelect }) {
  const selectedSymbol = symbols.find(s => s.value === selectedValue);

  return (
    <div className="selector-card" id={`${name.toLowerCase()}-selector`}>
      <div className="selector-header">
        <span className="terminal-prefix">&gt;&gt;</span> VARIÁVEL {name}
      </div>

      <div className="selector-body">
        {/* Preview Panel of Selected Symbol */}
        <div className="preview-panel">
          <div className="preview-screen">
            {selectedSymbol ? (
              <div 
                className="preview-symbol-wrapper"
                style={{
                  backgroundImage: `url(${selectedSymbol.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img 
                  src={selectedSymbol.image} 
                  alt={`Símbolo ${selectedValue}`} 
                  className="preview-image"
                />
              </div>
            ) : (
              <div className="preview-placeholder">
                <span className="blink-fast">?</span>
                <span className="placeholder-text">AGUARDANDO</span>
              </div>
            )}
          </div>
          <div className="preview-status">
            VALOR SELECIONADO: <span className="status-value">{selectedValue !== null ? selectedValue : 'NENHUM'}</span>
          </div>
        </div>

        {/* Options Grid */}
        <div className="options-grid">
          {symbols.map((symbol) => {
            const isSelected = selectedValue === symbol.value;
            return (
              <button
                key={symbol.value}
                className={`symbol-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelect(symbol.value)}
                aria-label={`Selecionar símbolo de valor ${symbol.value} para variável ${name}`}
                style={{
                  backgroundImage: `url(${symbol.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img
                  src={symbol.image}
                  alt={`Valor ${symbol.value}`}
                  className="symbol-image"
                />
                <span className="symbol-val-tag">{symbol.value}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

VariableSelector.propTypes = {
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.number,
  symbols: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default VariableSelector;
