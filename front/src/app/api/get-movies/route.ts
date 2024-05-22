import fs from 'fs';
import csvParser from 'csv-parser';
import { NextResponse } from 'next/server';

const csvName = "./src/data/movie_details.csv";

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

let filmsList: Array<Card> = [];

const openCsv = async () => {
  return new Promise((resolve, reject) => {
    const films: Array<Card> = [];
    
    fs.createReadStream(csvName)
      .pipe(csvParser())
      .on('data', (row) => {
        films.push(row);
      })
      .on('end', () => {
        resolve(films);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

function searchFilms(query: any) {
  const lowerCaseQuery = query.toLowerCase();
  return filmsList.filter(film =>
    film.title.toLowerCase().includes(lowerCaseQuery) ||
    film.genre?.toLowerCase().includes(lowerCaseQuery)
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  console.log('GET /api/getMovies', title);

  if (filmsList.length === 0) {
    filmsList = await openCsv() as Card[];
  }

  let result: any = [];

  if (title) {
    result = searchFilms(title);
  }

  if (!title) {
    result = filmsList;
  }

  const response = NextResponse.json({ data: result });

  return response;
}
