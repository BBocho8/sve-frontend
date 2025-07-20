#!/usr/bin/env node

/**
 * Color Migration Script
 *
 * This script helps migrate from the old gray-based color system to the new semantic color system.
 * Run this script to automatically replace color classes in your components.
 *
 * Usage: node scripts/migrate-colors.js [file-or-directory]
 */

const fs = require('node:fs');
const path = require('node:path');

// Color mapping from old to new system
const colorMappings = {
	// Background colors
	'bg-white dark:bg-gray-900': 'bg-bg-primary',
	'bg-white dark:bg-gray-800': 'bg-surface-primary',
	'bg-gray-50 dark:bg-gray-900': 'bg-bg-secondary',
	'bg-gray-100 dark:bg-gray-700': 'bg-surface-secondary',
	'bg-gray-200 dark:bg-gray-600': 'bg-surface-tertiary',

	// Text colors
	'text-gray-900 dark:text-white': 'text-text-primary',
	'text-gray-700 dark:text-gray-300': 'text-text-primary',
	'text-gray-600 dark:text-gray-400': 'text-text-secondary',
	'text-gray-500 dark:text-gray-500': 'text-text-tertiary',
	'text-gray-400 dark:text-gray-500': 'text-text-tertiary',

	// Border colors
	'border-gray-200 dark:border-gray-700': 'border-border-primary',
	'border-gray-300 dark:border-gray-600': 'border-border-secondary',
	'border-gray-400 dark:border-gray-500': 'border-border-secondary',

	// Interactive colors
	'bg-green-600': 'bg-interactive-primary',
	'bg-green-700': 'bg-interactive-primary',
	'bg-blue-600': 'bg-interactive-secondary',
	'bg-blue-700': 'bg-interactive-secondary',
	'bg-red-600': 'bg-interactive-danger',
	'bg-red-700': 'bg-interactive-danger',
	'bg-yellow-600': 'bg-interactive-warning',
	'bg-yellow-700': 'bg-interactive-warning',

	// Hover states
	'hover:bg-gray-100 dark:hover:bg-gray-800': 'hover:bg-state-hover',
	'hover:bg-gray-200 dark:hover:bg-gray-600': 'hover:bg-state-hover',
	'hover:text-gray-900 dark:hover:text-white': 'hover:text-text-primary',
	'hover:text-gray-700 dark:hover:text-gray-300': 'hover:text-text-primary',
};

function migrateFile(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		let newContent = content;
		let changes = 0;

		// Apply color mappings
		for (const [oldClass, newClass] of Object.entries(colorMappings)) {
			const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
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

	console.log('🎨 Color System Migration Tool');
	console.log('==============================\n');

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

	console.log(`\n✅ Migration complete! Total changes: ${totalChanges}`);
	console.log('\n📋 Next steps:');
	console.log('1. Review the changes in your components');
	console.log('2. Test the application to ensure everything looks correct');
	console.log('3. Visit /colors to see the new color system demo');
	console.log('4. Update any remaining color classes manually if needed');
}

if (require.main === module) {
	main();
}

module.exports = { migrateFile, processDirectory, colorMappings };
