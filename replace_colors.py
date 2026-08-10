"""
Replace all Tailwind lavender-* and butter-* class references
with hardcoded hex values so they always render correctly.
Lavender = #CBA1D4
Butter Yellow = #FEEB9C
"""
import os
import re

LAVENDER = '#CBA1D4'
BUTTER = '#FEEB9C'

REPLACEMENTS = [
    # lavender with opacity modifier (e.g. lavender-500/15 → [#CBA1D4]/15)
    (r'lavender-\d+/(\d+)', lambda m: f'[{LAVENDER}]/{m.group(1)}'),
    # plain lavender (e.g. text-lavender-400 → text-[#CBA1D4])
    (r'lavender-\d+', f'[{LAVENDER}]'),
    # butter with opacity
    (r'butter-\d+/(\d+)', lambda m: f'[{BUTTER}]/{m.group(1)}'),
    # plain butter
    (r'butter-\d+', f'[{BUTTER}]'),
]

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for pattern, repl in REPLACEMENTS:
        content = re.sub(pattern, repl, content)
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {path}')

def run(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.js')):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    run('f:/Azkar/src')
    print('Done.')
