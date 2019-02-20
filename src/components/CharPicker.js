import React from 'react';

import './CharPicker.css';
import { useHttp } from '../hooks/http';

const CharPicker = ({ onCharSelect, selectedChar, side }) => {
  const [isLoading, data] = useHttp('https://swapi.co/api/people', []);

  let characters = [];

  if (data && data.results) {
    const selectedCharacters = data.results.slice(0, 5);
    characters = selectedCharacters.map((char, index) => ({
      name: char.name,
      id: index + 1
    }));
  }

  let content = <p>Loading characters...</p>;

  if (!isLoading && characters && characters.length > 0) {
    content = (
      <select onChange={onCharSelect} value={selectedChar} className={side}>
        {characters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!characters || characters.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
