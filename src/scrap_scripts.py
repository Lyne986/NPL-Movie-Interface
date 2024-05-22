import os
import csv
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = 'http://www.imsdb.com'
SCRIPTS_DIR = 'scripts'
MAX_THREADS = 10  # Adjust the number of threads as needed

def clean_script(text):
    text = text.replace('Back to IMSDb', '')
    text = text.replace('''<b><!--
</b>if (window!= top)
top.location.href=location.href
<b>// -->
</b>
''', '')
    text = text.replace('''          Scanned by http://freemoviescripts.com
          Formatting by http://simplyscripts.home.att.net
''', '')
    return text.replace(r'\r', '')

def get_script(relative_link):
    tail = relative_link.split('/')[-1]
    print('fetching %s' % tail)
    script_front_url = BASE_URL + quote(relative_link)
    front_page_response = requests.get(script_front_url)
    front_soup = BeautifulSoup(front_page_response.text, "html.parser")

    try:
        script_link = front_soup.find_all('p', align="center")[0].a['href']
    except IndexError:
        print('%s has no script :(' % tail)
        return None, None

    if script_link.endswith('.html'):
        title = script_link.split('/')[-1].replace(' Script', '')
        script_url = BASE_URL + script_link
        script_soup = BeautifulSoup(requests.get(script_url).text, "html.parser")
        script_text = script_soup.find_all('td', {'class': "scrtext"})[0].get_text()
        script_text = clean_script(script_text)
        return title, script_text
    else:
        print('%s is a pdf :(' % tail)
        return None, None

def get_movie_details(relative_link):
    tail = relative_link.split('/')[-1]
    print(f'fetching details for {tail}')
    movie_url = BASE_URL + relative_link
    response = requests.get(movie_url)
    soup = BeautifulSoup(response.text, "html.parser")

    try:
        details_table = soup.find('table', class_='script-details')
        
        title = details_table.find('td', align='center').find('h1').get_text().replace(' Script', '')

        image_tags = details_table.find_all('img', class_='avimg')
        if len(image_tags) > 1:
            image_url = image_tags[1]['src']
        elif len(image_tags) == 1:
            image_url = image_tags[0]['src']
        else:
            image_url = 'N/A'
        
        if image_url != 'N/A' and not image_url.startswith('http'):
            image_url = BASE_URL + image_url

        rating = 'N/A'
        rating_text = details_table.get_text()
        rating_match = re.search(r'\((\d+) out of 10\)', rating_text)
        if rating_match:
            rating = int(rating_match.group(1))
        
        release_date_tag = details_table.find('b', text='Movie Release Date')
        release_date = release_date_tag.find_next_sibling(text=True).strip().split(': ')[-1] if release_date_tag else 'N/A'
        
        genre_tags = details_table.find_all('a', href=lambda href: href and "/genre/" in href)
        genres = ', '.join([tag.get_text() for tag in genre_tags]) if genre_tags else 'N/A'
        
        title, script = get_script(relative_link)

        return title, image_url, rating, release_date, genres, script
    except Exception as e:
        print(f'Error parsing details for {tail}: {e}')
        return None, None, None, None, None, None

def fetch_and_write_details(relative_link, details_writer, script_writer):
    details = get_movie_details(relative_link)
    if details[0]:  # Check if title is not None
        details_writer.writerow({
            'title': details[0],
            'imageUrl': details[1],
            'rating': details[2],
            'releaseDate': details[3],
            'genre': details[4]
        })
        script_writer.writerow({
            'title': details[0],
            'script': details[5]
        })

if __name__ == "__main__":
    response = requests.get(f'{BASE_URL}/all-scripts.html')
    html = response.text

    soup = BeautifulSoup(html, "html.parser")
    paragraphs = soup.find_all('p')

    os.makedirs(SCRIPTS_DIR, exist_ok=True)

    with open('movie_details_no_script.csv', 'w', newline='', encoding='utf-8') as details_csvfile, \
         open('movie_scripts.csv', 'w', newline='', encoding='utf-8') as scripts_csvfile:
        
        details_fieldnames = ['title', 'imageUrl', 'rating', 'releaseDate', 'genre']
        script_fieldnames = ['title', 'script']
        
        details_writer = csv.DictWriter(details_csvfile, fieldnames=details_fieldnames)
        script_writer = csv.DictWriter(scripts_csvfile, fieldnames=script_fieldnames)
        
        details_writer.writeheader()
        script_writer.writeheader()

        links = [p.a['href'] for p in paragraphs]
        
        with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
            futures = [executor.submit(fetch_and_write_details, link, details_writer, script_writer) for link in links]

            for future in as_completed(futures):
                future.result()  # Ensure any exceptions are raised
