import { Character } from "../../../interfaces";

export const fetchCharacter = async (
  characterId: string,
  status: string,
  gender: string,
  species: string,
  name: string,
  currentPage: number
): Promise<Character> => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${currentPage}&status=${status}&gender=${gender}&species=${species}&name=${name}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};