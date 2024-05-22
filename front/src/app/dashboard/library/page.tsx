import React from "react";
import { createClient } from '../../../utils/supabase/server';
import LibraryClient from "../../../components/LibraryClient";

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

interface LibraryData {
  Cards: Card[];
}

async function fetchLibraryData(query: string = ''): Promise<LibraryData> {
  // const res = await fetch(`http://localhost:3000/api/get-movies-scripts${query ? `?query=${query}` : ''}`, {
  //   method: 'GET',
  // });

  // const { data } = await res.json();

  const data = [
    {title: 'Movie 1', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 2', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 3', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 4', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
    {title: 'Movie 5', imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating: 4, releaseDate: '2021-09-01', genre: 'Action'},
  ];

  return {
    Cards: data
  };
}

const Library = async () => {
  const libraryData: LibraryData = await fetchLibraryData();
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }

  return (
    <div className="flex flex-col justify-center gap-6 p-6 overflow-y-hidden overflow-x-hidden w-full h-full">
      <LibraryClient Cards={libraryData.Cards} userName={data.user.user_metadata.first_name} />
    </div>
  );
}

Library.displayName = "Library";

export default Library;
