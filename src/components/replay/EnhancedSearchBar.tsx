'use client';

import type { VideoV2 } from '@/types/Video';
import { ArrowUpIcon, ClockIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';

type EnhancedSearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	games: VideoV2[];
};

const EnhancedSearchBar = ({ value, onChange, placeholder = 'Search games...', games }: EnhancedSearchBarProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	// Load search history from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem('searchHistory');
		if (saved) {
			try {
				setSearchHistory(JSON.parse(saved));
			} catch {
				setSearchHistory([]);
			}
		}
	}, []);

	// Save search history to localStorage
	const saveToHistory = (query: string) => {
		if (!query.trim()) return;

		const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5);
		setSearchHistory(newHistory);
		localStorage.setItem('searchHistory', JSON.stringify(newHistory));
	};

	// Generate suggestions based on games data
	const suggestions = useMemo(() => {
		if (!value.trim()) return [];

		const query = value.toLowerCase();
		const allTeams = games.flatMap(game => [game.homeTeam, game.awayTeam]);
		const allCompetitions = games.map(game => game.competition);

		const teamMatches = allTeams.filter(team => team.toLowerCase().includes(query));
		const competitionMatches = allCompetitions.filter(competition => competition.toLowerCase().includes(query));

		// Remove duplicates and limit results
		const uniqueSuggestions = [...new Set([...teamMatches, ...competitionMatches])];
		return uniqueSuggestions.slice(0, 8);
	}, [value, games]);

	// Handle search submission
	const handleSearch = (query: string) => {
		onChange(query);
		saveToHistory(query);
		setShowSuggestions(false);
		inputRef.current?.blur();
	};

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onChange(newValue);
		setShowSuggestions(newValue.trim().length > 0);
	};

	// Handle key navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch(value);
		} else if (e.key === 'Escape') {
			setShowSuggestions(false);
			inputRef.current?.blur();
		}
	};

	// Clear search
	const clearSearch = () => {
		onChange('');
		setShowSuggestions(false);
		inputRef.current?.focus();
	};

	// Remove from history
	const removeFromHistory = (query: string, e: React.MouseEvent) => {
		e.stopPropagation();
		const newHistory = searchHistory.filter(item => item !== query);
		setSearchHistory(newHistory);
		localStorage.setItem('searchHistory', JSON.stringify(newHistory));
	};

	return (
		<div className='relative w-full'>
			{/* Search Input */}
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
				</div>
				<input
					ref={inputRef}
					type='text'
					value={value}
					onChange={handleInputChange}
					onFocus={() => {
						setIsFocused(true);
						setShowSuggestions(value.trim().length > 0 || searchHistory.length > 0);
					}}
					onBlur={() => {
						setIsFocused(false);
						// Delay hiding suggestions to allow clicking on them
						setTimeout(() => setShowSuggestions(false), 200);
					}}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className='block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors'
				/>
				{value && (
					<button
						onClick={clearSearch}
						className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
						type='button'
					>
						<XMarkIcon className='h-5 w-5' />
					</button>
				)}
			</div>

			{/* Suggestions Dropdown */}
			{showSuggestions && isFocused && (
				<div className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto'>
					{/* Search History */}
					{searchHistory.length > 0 && !value.trim() && (
						<div className='p-2'>
							<div className='text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-1'>Recent Searches</div>
							{searchHistory.map(query => (
								<button
									key={`history-${query}`}
									onClick={() => handleSearch(query)}
									className='w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors'
									type='button'
								>
									<div className='flex items-center gap-2'>
										<ClockIcon className='w-4 h-4 text-gray-400' />
										<span>{query}</span>
									</div>
									<button
										onClick={e => removeFromHistory(query, e)}
										className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
										type='button'
									>
										<XMarkIcon className='w-4 h-4' />
									</button>
								</button>
							))}
						</div>
					)}

					{/* Suggestions */}
					{suggestions.length > 0 && (
						<div className='p-2'>
							{value.trim() && (
								<div className='text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-1'>Suggestions</div>
							)}
							{suggestions.map(suggestion => (
								<button
									key={`suggestion-${suggestion}`}
									onClick={() => handleSearch(suggestion)}
									className='w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors'
									type='button'
								>
									<MagnifyingGlassIcon className='w-4 h-4 text-gray-400' />
									<span>{suggestion}</span>
								</button>
							))}
						</div>
					)}

					{/* No results */}
					{value.trim() && suggestions.length === 0 && (
						<div className='p-4 text-center text-sm text-gray-500 dark:text-gray-400'>
							No suggestions found for &quot;{value}&quot;
						</div>
					)}

					{/* Search button */}
					{value.trim() && (
						<div className='p-2 border-t border-gray-200 dark:border-gray-700'>
							<button
								onClick={() => handleSearch(value)}
								className='w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors'
								type='button'
							>
								<ArrowUpIcon className='w-4 h-4' />
								Search for &quot;{value}&quot;
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default EnhancedSearchBar;
