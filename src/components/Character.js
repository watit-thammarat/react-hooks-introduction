import React, { useEffect, memo } from 'react';

import Summary from './Summary';
import { useHttp } from '../hooks/http';

const Character = ({ selectedChar }) => {
  const [isLoading, charData] = useHttp(
    'https://swapi.co/api/people/' + selectedChar,
    [selectedChar]
  );

  let loadedCharacter = null;

  if (charData) {
    loadedCharacter = {
      id: selectedChar,
      name: charData.name,
      height: charData.height,
      colors: {
        hair: charData.hair_color,
        skin: charData.skin_color
      },
      gender: charData.gender,
      movieCount: charData.films.length
    };
  }

  //componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('Too soon...');
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default memo(Character);
