import React, { useEffect, useState } from 'react';
import { Character } from '/Rick and Morty2/my-rick-and-morty-app/interfaces/index';
import Image from 'next/image';
import { fetchCharacter } from '@/app/api/characters';

interface CharacterDetailProps {
  characterId: string | string[];
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterId }) => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Отримання даних про персонажа за його ідентифікатором
    const fetchData = async () => {
      try {
        const result = await fetchCharacter(characterId as string, 'statusValue', 'genderValue', 'speciesValue', 'nameValue', 1);// Або розгляньте інші варіанти обробки characterId
        setCharacter(result);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchData();
  }, [characterId]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <Image src={character.image} alt={character.name} width={20} height={20} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      {/* Додаткова детальна інформація про персонажа */}
    </div>
  );
};

export default CharacterDetail;