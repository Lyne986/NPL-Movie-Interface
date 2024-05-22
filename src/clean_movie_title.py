import csv

def remove_word_script_from_titles(input_file, output_file):
    with open(input_file, 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        fieldnames = reader.fieldnames

        rows = []
        for row in reader:
            # Remove the word "Script" from the title
            row['title'] = row['title'].replace(' Script', '')
            rows.append(row)

    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

if __name__ == "__main__":
    input_csv = 'data/movie_details.csv'
    output_csv = 'movie_details_cleaned.csv'
    remove_word_script_from_titles(input_csv, output_csv)
