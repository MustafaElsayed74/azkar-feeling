import os

def replace_in_files(directory, old, new):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if old in content:
                    content = content.replace(old, new)
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {path}")

if __name__ == '__main__':
    replace_in_files('f:/Azkar/src', 'emerald', 'lavender')
