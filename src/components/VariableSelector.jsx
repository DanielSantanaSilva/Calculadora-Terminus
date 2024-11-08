import React from 'react';

const images = [
  { value: 0, src: "https://i.ibb.co/5rDRw30/symbols-01.jpg" },
  { value: 10, src: "https://i.ibb.co/PFmbJ00/symbols-02.jpg" },
  { value: 11, src: "https://i.ibb.co/FqXw4mG/symbols-03.jpg" },
  { value: 20, src: "https://i.ibb.co/TrNY7Qf/symbols-04.jpg" },
  { value: 21, src: "https://i.ibb.co/jfYKRth/symbols-05.jpg" },
  { value: 22, src: "https://i.ibb.co/bXGth05/symbols-06.jpg" },
];

function VariableSelector({ variable, value, onSelect }) {
  return (
    <div className="variable">
      <h2>{variable}:</h2>
      {images.map((img) => (
        <div
          key={img.value}
          className={`image-option ${value === img.value ? 'selected' : ''}`}
          onClick={() => onSelect(img.value)}
        >
          <img src={img.src} alt={`Value ${img.value}`} />
        </div>
      ))}
    </div>
  );
}

export default VariableSelector;
