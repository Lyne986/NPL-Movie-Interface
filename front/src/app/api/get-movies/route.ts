import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { NextResponse } from 'next/server';

const movies_no_script_csv = path.join(process.cwd(), 'src/data/movie_details_no_scripted.csv');
const movies_script_1_csv = path.join(process.cwd(), 'src/data/movie_scripts_1.csv');
const movies_script_2_csv = path.join(process.cwd(), 'src/data/movie_scripts_2.csv');
const movies_script_3_csv = path.join(process.cwd(), 'src/data/movie_scripts_3.csv');

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
  script?: string;
}

let filmsList: Array<Card> = [];
let scriptsList: Array<Card> = [];

const openCsv = (filePath: string): Promise<Array<Card>> => {
  return new Promise((resolve, reject) => {
    const items: Array<Card> = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        items.push(row);
      })
      .on('end', () => {
        resolve(items);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const loadAllCsvData = async () => {
  const [films, scripts1, scripts2, scripts3] = await Promise.all([
    openCsv(movies_no_script_csv),
    openCsv(movies_script_1_csv),
    openCsv(movies_script_2_csv),
    openCsv(movies_script_3_csv),
  ]);

  filmsList = films;
  scriptsList = [...scripts1, ...scripts2, ...scripts3];
};

const mergeFilmScripts = () => {
  const scriptMap = new Map(scriptsList.map(script => [script.title, script.script]));
  
  filmsList.forEach(film => {
    if (scriptMap.has(film.title)) {
      film.script = scriptMap.get(film.title);
    }
  });
};

const searchFilms = (query: string): Array<Card> => {
  const lowerCaseQuery = query.toLowerCase();
  return filmsList.filter(film =>
    film.title.toLowerCase().includes(lowerCaseQuery) ||
    film.genre?.toLowerCase().includes(lowerCaseQuery) ||
    film.script?.toLowerCase().includes(lowerCaseQuery)
  ).map(film => ({
    ...film,
    script: undefined // Remove script field from the response
  }));
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  console.log('GET /api/get-movies', title);

  try {
    if (filmsList.length === 0 || scriptsList.length === 0) {
      await loadAllCsvData();
      mergeFilmScripts();
    }

    let result: Array<Card> = [];

    if (title) {
      result = searchFilms(title).map(({ script, ...film }) => film);
    } else {
      result = filmsList.map(({ script, ...film }) => film);
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Error in GET /api/get-movies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}