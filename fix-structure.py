import json
import re

def fix_file_structure(file_path):
    """Fix the structure of translation file by moving root-level calculators into calculators section"""
    print(f"Исправляю структуру файла: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        fixed_lines = []
        in_calculators = False
        calculators_ended = False
        
        for i, line in enumerate(lines):
            # Находим начало секции calculators
            if '"calculators": {' in line:
                in_calculators = True
                fixed_lines.append(line)
                continue
            
            # Находим конец секции calculators (строка с отступом 2 пробела и })
            if in_calculators and re.match(r'^  }$', line):
                calculators_ended = True
                in_calculators = False
                # Не добавляем эту строку, она будет в конце
                continue
            
            # Если мы внутри секции calculators, добавляем строку как есть
            if in_calculators:
                fixed_lines.append(line)
                continue
            
            # Если мы после секции calculators и видим калькулятор на уровне корня (2 пробела)
            if calculators_ended and re.match(r'^  "[a-z-]+": \{', line):
                # Увеличиваем отступ с 2 до 4 пробелов
                fixed_lines.append('  ' + line)
                continue
            
            # Если мы после секции calculators и видим строки с отступом 2 или 4 пробела (содержимое калькуляторов)
            if calculators_ended and (re.match(r'^  [^}]', line) or re.match(r'^    ', line)):
                # Увеличиваем отступ на 2 пробела
                fixed_lines.append('  ' + line)
                continue
            
            # Если мы после секции calculators и видим закрывающую скобку на уровне 2 пробелов
            if calculators_ended and re.match(r'^  },', line):
                # Увеличиваем отступ с 2 до 4 пробелов
                fixed_lines.append('  ' + line)
                continue
            
            # Если это последняя закрывающая скобка файла
            if calculators_ended and line.strip() == '}':
                # Добавляем закрывающую скобку секции calculators
                fixed_lines.append('  }\n')
                # Добавляем закрывающую скобку файла
                fixed_lines.append(line)
                continue
            
            # Все остальные строки добавляем как есть
            fixed_lines.append(line)
        
        # Записываем исправленный файл
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(fixed_lines)
        
        print(f"✅ Файл {file_path} исправлен успешно")
        
    except Exception as error:
        print(f"❌ Ошибка при исправлении {file_path}: {error}")

# Исправляем файлы
files_to_fix = [
    'messages/es.json',
    'messages/de.json'
]

for file_path in files_to_fix:
    fix_file_structure(file_path)

print('🎉 Исправление структуры завершено!')

