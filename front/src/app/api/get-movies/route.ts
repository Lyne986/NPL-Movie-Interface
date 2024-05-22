import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { NextResponse } from 'next/server';

const csvName = path.join(process.cwd(), 'src/data/movie_details.csv');

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

let filmsList: Array<Card> = [];

const openCsv = async (): Promise<Array<Card>> => {
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

function searchFilms(query: string): Array<Card> {
  const lowerCaseQuery = query.toLowerCase();
  return filmsList.filter(film =>
    film.title.toLowerCase().includes(lowerCaseQuery) ||
    film.genre?.toLowerCase().includes(lowerCaseQuery)
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  console.log('GET /api/get-movies', title);

  try {
    if (filmsList.length === 0) {
      filmsList = await openCsv();
    }

    let result: Array<Card> = [];

    if (title) {
      result = searchFilms(title);
    } else {
      result = filmsList;
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Error in GET /api/get-movies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
