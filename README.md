# Movie Database Project

This project consists of two parts: a Python script to retrieve movie details from http://www.imsdb.com and save them in a CSV file, and a frontend application to list and search for movies by their title and display those movies informations

## Part 1: Movie Details Scraper

### Overview

The Python script located in the `src` directory retrieves movie details from http://www.imsdb.com, including the title, release date, rating, and genre of each movie, and saves them into a CSV file.

### Usage

1. Run the script `python3 ./src/movie_scraper.py`.
2. It will fetch movie details from the website and save them to a CSV file named `movie_details.csv`.

## Part 2: Frontend Movie Listing

### Overview

The frontend application located in the `front` directory provides a user interface to browse and search for movies. It displays movie details such as title, release date, rating, and genre.

### Features

- Display a list of movies with pagination.
- Search movies by title.
- View detailed information for each movie.

### Screenshots

![Movie Listing](https://media.discordapp.net/attachments/1062737098471391292/1242664884475265165/image.png?ex=664ea95c&is=664d57dc&hm=4666f481f18fb971051e4205adf0d45b35377de1e073d1681c635fafab615b8d&=&format=webp&quality=lossless&width=1100&height=664)
*Figure 1: Movie Listing Page*

![Movie Details](https://media.discordapp.net/attachments/1062737098471391292/1242665236415385691/image.png?ex=664ea9af&is=664d582f&hm=23c1ca0d598fd1eb18e52c340ea37a790fae142178ddc188ff08fd1bdf619baf&=&format=webp&quality=lossless&width=1100&height=662)
*Figure 2: Movie Details View*

## Setup

### Frontend

1. Navigate to the `front` directory.
2. Install dependencies `npm install`.
3. Start the frontend server `npm run dev`.


Don't forget to fill the .env file following the .env.example template

### Scraper

1. Run `pip install -r requirements.txt` located in the `src` directory.

## Technologies Used

- Frontend: React.js, HTML, CSS
- Scraper: Python, BeautifulSoup, Requests

## Credits

- The data is fetched from [imsdb](http://www.imsdb.com).
- Frontend UI inspired by [IMDb](https://www.imdb.com/).
- Thanks to the following friends for their contributions to the project:
  - [@Thomy](https://github.com/ThomyLorenzatti)
  - [@Diogo](https://github.com/Lyne986)
  - [@Hugo](https://github.com/Carpetic)
  - [@Bastien](https://github.com/BastienBoymond)

