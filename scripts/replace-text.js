const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    // skip the UI component itself
    if (filePath.endsWith('ComicText.tsx')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let modified = false;

    // Find if Text is imported from react-native
    const importRegex = /import\s+{[^}]*\bText\b[^}]*}\s+from\s+['"]react-native['"];?/;
    if (importRegex.test(content)) {
        // Check if ComicText shouldn't be imported again
        if (!content.includes('import ComicText')) {
            // Find the import react-native statement and process its content
            content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-native['"];?/, (match, imports) => {
                const newImports = imports.split(',').map(i => i.trim()).filter(i => i !== 'Text' && i !== '');
                let newImportStatement = newImports.length > 0 ? `import { ${newImports.join(', ')} } from 'react-native';` : '';

                // Auto-calculate relative path based on file location
                const depth = filePath.includes('src\\') || filePath.includes('src/')
                    ? filePath.split(/src[\\/]/)[1].split(/[\\/]/).length - 1
                    : filePath.includes('app\\') || filePath.includes('app/')
                        ? filePath.split(/app[\\/]/)[1].split(/[\\/]/).length
                        : 0;

                // Use an alias if tsconfig supports @ (which expo-router does)
                const newImportStr = `import ComicText from '@/components/ui/ComicText';\n`;
                return newImportStatement + '\n' + newImportStr;
            });
            modified = true;
        }

        // Now replace all <Text> and <Text ...> and </Text>
        if (modified || content.includes('<Text')) {
            content = content.replace(/<Text(\s|>)/g, '<ComicText$1');
            content = content.replace(/<\/Text>/g, '</ComicText>');
            modified = true;
        }
    }

    if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.expo' && file !== 'dist') {
                traverse(fullPath);
            }
        } else {
            processFile(fullPath);
        }
    }
}

traverse(path.join(process.cwd(), 'src'));
traverse(path.join(process.cwd(), 'app'));
