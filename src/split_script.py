import csv
import os
import sys

def split_csv(file_path, output_dir, num_splits=3):
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Increase the maximum allowable field size limit
    max_field_size = sys.maxsize
    csv.field_size_limit(max_field_size)
    
    # Read the CSV file
    with open(file_path, 'r', encoding='utf-8') as infile:
        reader = csv.reader(infile)
        header = next(reader)  # Read the header
        rows = list(reader)
    
    # Calculate the size of each split
    total_rows = len(rows)
    split_size = total_rows // num_splits
    
    for i in range(num_splits):
        start_index = i * split_size
        if i == num_splits - 1:
            # Ensure the last file gets any remaining rows
            end_index = total_rows
        else:
            end_index = (i + 1) * split_size
        
        split_rows = rows[start_index:end_index]
        
        # Create the split file path
        split_file_path = os.path.join(output_dir, f"{os.path.basename(file_path).replace('.csv', '')}_{i+1}.csv")
        
        # Write the split CSV file
        with open(split_file_path, 'w', encoding='utf-8', newline='') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(header)  # Write the header
            writer.writerows(split_rows)
        
        print(f"Created split file: {split_file_path}")

if __name__ == "__main__":
    input_csv_path = 'movie_scripts.csv'
    output_directory = '.'
    
    split_csv(input_csv_path, output_directory)
