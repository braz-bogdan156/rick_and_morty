import React from 'react';
import { GetServerSideProps } from 'next';

import { Episode } from '../interfaces';

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <div>
      <h1>Rick and Morty Episodes</h1>
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <p>Name: {episode.name}</p>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
            <p>Characters: {episode.characters.length}</p>
            <p>URL: {episode.url}</p>
            <p>Created: {new Date(episode.created).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<EpisodeListProps> = async () => {
  try {
    let allEpisodes: Episode[] = [];
    let page = 1;
    let response;
    let data;

    do {
      response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`);
      data = await response.json();
      allEpisodes = [...allEpisodes, ...data.results];
      page++;
    } while (data.info.next);

    return {
      props: {
        episodes: allEpisodes,
      },
    };
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return {
      props: {
        episodes: [],
      },
    };
  }
};

export default EpisodeList;