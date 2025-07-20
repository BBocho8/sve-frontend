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
					<MagnifyingGlassIcon className='h-5 w-5 text-text-tertiary' />
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
					className='block w-full pl-10 pr-10 py-3 border border-border-secondary rounded-lg bg-surface-primary text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-interactive-primary focus:border-transparent transition-colors'
				/>
				{value && (
					<button
						onClick={clearSearch}
						className='absolute inset-y-0 right-0 pr-3 flex items-center text-text-tertiary hover:text-text-primary transition-colors'
						type='button'
					>
						<XMarkIcon className='h-5 w-5' />
					</button>
				)}
			</div>

			{/* Suggestions Dropdown */}
			{showSuggestions && isFocused && (
				<div className='absolute z-50 w-full mt-1 bg-surface-primary rounded-lg shadow-lg border border-border-primary max-h-80 overflow-y-auto'>
					{/* Search History */}
					{searchHistory.length > 0 && !value.trim() && (
						<div className='p-2'>
							<div className='text-xs font-medium text-text-tertiary px-3 py-1'>Recent Searches</div>
							{searchHistory.map(query => (
								<button
									key={`history-${query}`}
									onClick={() => handleSearch(query)}
									className='w-full flex items-center justify-between px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-colors'
									type='button'
								>
									<div className='flex items-center gap-2'>
										<ClockIcon className='w-4 h-4 text-text-tertiary' />
										<span>{query}</span>
									</div>
									<button
										onClick={e => removeFromHistory(query, e)}
										className='text-text-tertiary hover:text-text-primary transition-colors'
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
							{value.trim() && <div className='text-xs font-medium text-text-tertiary px-3 py-1'>Suggestions</div>}
							{suggestions.map(suggestion => (
								<button
									key={`suggestion-${suggestion}`}
									onClick={() => handleSearch(suggestion)}
									className='w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-colors'
									type='button'
								>
									<MagnifyingGlassIcon className='w-4 h-4 text-text-tertiary' />
									<span>{suggestion}</span>
								</button>
							))}
						</div>
					)}

					{/* No results */}
					{value.trim() && suggestions.length === 0 && (
						<div className='p-4 text-center text-sm text-text-tertiary'>
							No suggestions found for &quot;{value}&quot;
						</div>
					)}

					{/* Search button */}
					{value.trim() && (
						<div className='p-2 border-t border-border-primary'>
							<button
								onClick={() => handleSearch(value)}
								className='w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-interactive-primary hover:bg-interactive-primary/10 rounded-md transition-colors'
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
