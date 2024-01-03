import { Character } from '../interfaces/index';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div>
      <Image src={character.image} alt={character.name} width={20} height={20} />
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      {/* Додаткова інформація про персонажа */}
    </div>
  );
};

export default CharacterCard;