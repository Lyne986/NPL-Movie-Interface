// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
  event.preventDefault();

  // try {
    const response = await fetch(`/api/getMovies?title=${query}`);
    const data = await response.json();
    setResults(data.data);
  // } catch (error) {
  //   console.error('Error parsing JSON:', error);
  // }
};

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <label htmlFor="title">Enter movie title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((movie, index) => (
              <li key={index}>
                {movie.Titre} ({movie.Date}): {movie.Description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}
