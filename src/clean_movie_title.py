import csv
import sys

def remove_word_script_from_titles(input_file, output_file):
    # Increase the CSV field size limit
    csv.field_size_limit(sys.maxsize)

    with open(input_file, 'r', newline='', encoding='utf-8') as csvfile_in, \
         open(output_file, 'w', newline='', encoding='utf-8') as csvfile_out:

        reader = csv.DictReader(csvfile_in)
        fieldnames = reader.fieldnames
        writer = csv.DictWriter(csvfile_out, fieldnames=fieldnames)

        writer.writeheader()
        for row in reader:
            row['title'] = row['title'].replace(' Script', '')
            writer.writerow(row)

if __name__ == "__main__":
    input_csv = 'movie_details.csv'
    output_csv = 'cleaned_movie_details.csv'
    remove_word_script_from_titles(input_csv, output_csv)
