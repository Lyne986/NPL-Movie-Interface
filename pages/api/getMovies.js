import fs from 'fs';
import csvParser from 'csv-parser';
import { NextResponse } from 'next/server';

const csvName = "data/movie_details.csv";

let filmsList = [];

const openCsv = async () => {
  return new Promise((resolve, reject) => {
    const films = [];
    
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

function searchFilms(query) {
  const lowerCaseQuery = query.toLowerCase();
  return filmsList.filter(film =>
    film.title.toLowerCase().includes(lowerCaseQuery) ||
    film.genre.toLowerCase().includes(lowerCaseQuery)
  );
}

export default async function GET(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const { searchParams } = url;
  const title = searchParams.get('title');

  if (filmsList.length === 0) {
    filmsList = await openCsv();
  }

  let result = [];
  if (title) {
    result = searchFilms(title);
  }

  // return new Response(JSON.stringify({ data: result }), {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  res.status(200).json({ data: result });
}
