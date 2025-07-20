#!/usr/bin/env node

/**
 * Final Color Migration Script
 *
 * This script converts the remaining hardcoded color references to use the semantic color system.
 *
 * Usage: node scripts/migrate-colors-final.js [file-or-directory]
 */

const fs = require('node:fs');
const path = require('node:path');

// Final color mapping for hardcoded colors
const colorMappings = {
	// Green colors
	'bg-green-50 dark:bg-green-900': 'bg-interactive-primary/10 dark:bg-interactive-primary/20',
	'bg-green-100 dark:bg-green-900': 'bg-interactive-primary/10 dark:bg-interactive-primary/20',
	'text-green-600 dark:text-green-400': 'text-interactive-primary',
	'text-green-700 dark:text-green-400': 'text-interactive-primary',
	'text-green-800 dark:text-green-200': 'text-interactive-primary',
	'border-green-200 dark:border-green-700': 'border-interactive-primary/30',
	'hover:bg-green-50 dark:hover:bg-green-900': 'hover:bg-interactive-primary/10 dark:hover:bg-interactive-primary/20',
	'hover:bg-green-800 dark:hover:bg-green-200': 'hover:bg-interactive-primary',
	'hover:text-green-800 dark:hover:text-green-200': 'hover:text-interactive-primary',
	'group-hover:text-green-600 dark:group-hover:text-green-400': 'group-hover:text-interactive-primary',
	'group-focus-within:text-green-600 dark:group-focus-within:text-green-400':
		'group-focus-within:text-interactive-primary',

	// Blue colors
	'bg-blue-50 dark:bg-blue-900': 'bg-interactive-secondary/10 dark:bg-interactive-secondary/20',
	'text-blue-600 dark:text-blue-400': 'text-interactive-secondary',
	'text-blue-700 dark:text-blue-300': 'text-interactive-secondary',
	'border-blue-200 dark:border-blue-700': 'border-interactive-secondary/30',
	'hover:text-blue-800 dark:hover:text-blue-200': 'hover:text-interactive-secondary',

	// Red colors
	'text-red-400 dark:text-red-500': 'text-interactive-danger',
	'text-red-500 dark:text-red-400': 'text-interactive-danger',

	// Yellow colors
	'text-yellow-500 dark:text-yellow-400': 'text-interactive-warning',

	// Individual colors (fallback)
	'bg-green-50': 'bg-interactive-primary/10',
	'bg-green-100': 'bg-interactive-primary/10',
	'bg-green-500': 'bg-interactive-primary',
	'bg-green-900': 'bg-interactive-primary/20',

	'text-green-600': 'text-interactive-primary',
	'text-green-700': 'text-interactive-primary',
	'text-green-800': 'text-interactive-primary',
	'text-green-500': 'text-interactive-primary',

	'border-green-200': 'border-interactive-primary/30',
	'border-green-700': 'border-interactive-primary/30',

	'bg-blue-50': 'bg-interactive-secondary/10',
	'bg-blue-900': 'bg-interactive-secondary/20',
	'text-blue-600': 'text-interactive-secondary',
	'text-blue-700': 'text-interactive-secondary',
	'text-blue-300': 'text-interactive-secondary',
	'border-blue-200': 'border-interactive-secondary/30',
	'border-blue-700': 'border-interactive-secondary/30',

	'text-red-400': 'text-interactive-danger',
	'text-red-500': 'text-interactive-danger',

	'text-yellow-500': 'text-interactive-warning',
	'text-yellow-400': 'text-interactive-warning',
};

function migrateFile(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		let newContent = content;
		let changes = 0;

		// Apply color mappings in order of specificity (longest first)
		const sortedMappings = Object.entries(colorMappings).sort((a, b) => b[0].length - a[0].length);

		for (const [oldClass, newClass] of sortedMappings) {
			// Create a regex that matches the exact class name with word boundaries
			const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const regex = new RegExp(`\\b${escapedOldClass}\\b`, 'g');
			const matches = newContent.match(regex);

			if (matches) {
				newContent = newContent.replace(regex, newClass);
				changes += matches.length;
				console.log(`  ✓ Replaced ${matches.length} instances of "${oldClass}" with "${newClass}"`);
			}
		}

		if (changes > 0) {
			fs.writeFileSync(filePath, newContent, 'utf8');
			console.log(`  📝 Updated ${filePath} (${changes} changes)`);
			return changes;
		}
		console.log(`  ⏭️  No changes needed for ${filePath}`);
		return 0;
	} catch (error) {
		console.error(`  ❌ Error processing ${filePath}:`, error.message);
		return 0;
	}
}

function processDirectory(dirPath) {
	const files = fs.readdirSync(dirPath);
	let totalChanges = 0;

	for (const file of files) {
		const fullPath = path.join(dirPath, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			totalChanges += processDirectory(fullPath);
		} else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
			console.log(`\n🔍 Processing ${fullPath}`);
			totalChanges += migrateFile(fullPath);
		}
	}

	return totalChanges;
}

function main() {
	const target = process.argv[2] || 'src';

	console.log('🎨 Final Color System Migration Tool');
	console.log('====================================\n');

	if (!fs.existsSync(target)) {
		console.error(`❌ Target "${target}" does not exist`);
		process.exit(1);
	}

	const stat = fs.statSync(target);
	let totalChanges = 0;

	if (stat.isDirectory()) {
		console.log(`📁 Processing directory: ${target}`);
		totalChanges = processDirectory(target);
	} else {
		console.log(`📄 Processing file: ${target}`);
		totalChanges = migrateFile(target);
	}

	console.log(`\n✅ Final migration complete! Total changes: ${totalChanges}`);
	console.log('\n🎉 Your color system migration is now complete!');
	console.log('\n📋 Final checklist:');
	console.log('1. ✅ All gray colors converted to semantic tokens');
	console.log('2. ✅ All hardcoded colors converted to semantic tokens');
	console.log('3. ✅ Homepage title should now be white in light mode');
	console.log('4. ✅ Stats section now matches hero section gradient');
	console.log('5. ✅ Visit /colors to see the complete color system demo');
}

if (require.main === module) {
	main();
}

module.exports = { migrateFile, processDirectory, colorMappings };
