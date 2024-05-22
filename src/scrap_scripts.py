import os
import csv
from bs4 import BeautifulSoup
import requests
import re

BASE_URL = 'http://www.imsdb.com'
SCRIPTS_DIR = 'scripts'

def get_movie_details(relative_link):
    tail = relative_link.split('/')[-1]
    print(f'fetching details for {tail}')
    movie_url = BASE_URL + relative_link
    response = requests.get(movie_url)
    soup = BeautifulSoup(response.text, "html.parser")

    try:
        # Find the script details table
        details_table = soup.find('table', class_='script-details')
        
        # Extract title
        title = details_table.find('td', align='center').find('h1').get_text()

        # Extract image URL (second image if there are multiple)
        image_tags = details_table.find_all('img', class_='avimg')
        if len(image_tags) > 1:
            image_url = image_tags[1]['src']
        elif len(image_tags) == 1:
            image_url = image_tags[0]['src']
        else:
            image_url = 'N/A'
        
        # Ensure the image URL is absolute
        if image_url != 'N/A' and not image_url.startswith('http'):
            image_url = BASE_URL + image_url

        # Extract IMSDb rating using regex
        rating = 'N/A'
        rating_text = details_table.get_text()
        rating_match = re.search(r'\((\d+) out of 10\)', rating_text)
        if rating_match:
            rating = int(rating_match.group(1))
        
        # Extract release date
        release_date_tag = details_table.find('b', text='Movie Release Date')
        release_date = release_date_tag.find_next_sibling(text=True).strip().split(': ')[-1] if release_date_tag else 'N/A'
        
        # Extract genres
        genre_tags = details_table.find_all('a', href=lambda href: href and "/genre/" in href)
        genres = ', '.join([tag.get_text() for tag in genre_tags]) if genre_tags else 'N/A'

        return title, image_url, rating, release_date, genres
    except Exception as e:
        print(f'Error parsing details for {tail}: {e}')
        return None, None, None, None, None

if __name__ == "__main__":
    response = requests.get(f'{BASE_URL}/all-scripts.html/')
    html = response.text

    soup = BeautifulSoup(html, "html.parser")
    paragraphs = soup.find_all('p')

    # Ensure the scripts directory exists
    os.makedirs(SCRIPTS_DIR, exist_ok=True)

    # Open a CSV file to write
    with open('movie_details.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['title', 'imageUrl', 'rating', 'releaseDate', 'genre']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Write the header row
        writer.writeheader()

        for p in paragraphs:
            relative_link = p.a['href']
            title, image_url, rating, release_date, genres = get_movie_details(relative_link)
            if not title:
                continue

            # Write the details to the CSV file
            writer.writerow({
                'title': title,
                'imageUrl': image_url,
                'rating': rating,
                'releaseDate': release_date,
                'genre': genres
            })
