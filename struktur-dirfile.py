import os

def index_directory_bersih(base_path='.'):
    output_lines = []
    for root, dirs, files in os.walk(base_path):
        if not files:
            continue  # Lewati folder kosong

        rel_dir = os.path.relpath(root, base_path).replace('\\', '/')
        if rel_dir == '.':
            rel_dir = '/'
        else:
            rel_dir = '/' + rel_dir.lstrip('/')

        output_lines.append(f'{rel_dir}/')
        for file in sorted(files):  # Urutkan nama file jika diperlukan
            output_lines.append(f'- {file}')
        output_lines.append('')  # Spasi antar direktori

    return output_lines

def save_to_file(lines, filename='struktur_dir.txt'):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

if __name__ == '__main__':
    struktur = index_directory_bersih()
    save_to_file(struktur)
    print(f'Struktur direktori berhasil ditulis ke struktur_dir.txt')
