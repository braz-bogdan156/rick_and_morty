//CharaterList.tsx
'use client'
import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Character } from '/Rick and Morty/my-rick-and-morty-app/interfaces';
import { useRouter } from 'next/navigation';

import Layout from '@/app/page';

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  const router = useRouter();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>(characters);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleFilter = () => {
    const filtered = characters.filter(character => {
      return (
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCharacters(filtered);
  };

 

  return (
    <Layout>
    <div className="character-list-container">
      <h1>Rick and Morty Characters</h1>
      <nav>
        <ul>
          <li>
            <Link href="/episodes">Episodes</Link>
          </li>
          <li>
            <Link href="/locations">Locations</Link>
          </li>
        </ul>
      </nav>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      <ul>
        {filteredCharacters.map(character => (
          <li key={character.id}>
            <Link href={`/characters/${character.id}`}>
              <a>
                <Image src={character.image} alt={character.name} width={20} height={20} />
                <p>Name: {character.name}</p>
                <p>Species: {character.species}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default CharacterList;

export const getServerSideProps: GetServerSideProps<CharacterListProps> = async () => {
  try {
    let allCharacters: Character[] = [];
    let page = 1;
    let data;
    do {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      data = await response.json();
      if (data.info && data.info.next){
      allCharacters = [...allCharacters, ...data.results];
      page++;
      }
      else {
        break; 
      }
    } while (true);

    return {
      props: {
        characters: allCharacters,
      },
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return {
      props: {
        characters: [],
      },
    };
  }
};