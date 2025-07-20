'use client';
import type { VideoV2 } from '@/types/Video';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import removeAccents from 'remove-accents';
import useSWR from 'swr';
import { useOnClickOutside } from 'usehooks-ts';
import logo from '../../../public/logo.png';
import NavbarLoading from './NavbarLoading';
import ThemeToggle from './ThemeToggle';

const NavbarV2Optimized = () => {
	const { data: session, status } = useSession();

	// Only fetch videos when search is actually used
	const [isSearchActive, setIsSearchActive] = useState(false);
	const { data, isLoading, error } = useSWR(
		isSearchActive ? '/api/videos' : null,
		async (url: string) => {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Failed to fetch videos');
			}
			return response.json();
		},
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 300000, // 5 minutes
			errorRetryCount: 2,
			errorRetryInterval: 1000,
		},
	);

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);
	const [query, setQuery] = useState('');

	const getFilteredItems = (query: string, items: VideoV2[]) => {
		if (!query) {
			return items;
		}
		if (query.length > 2) {
			return items.filter(
				game =>
					removeAccents(game.homeTeam.toLowerCase()).includes(`${removeAccents(query.toLowerCase())}`) ||
					removeAccents(game.awayTeam.toLowerCase()).includes(`${removeAccents(query.toLowerCase())}`),
			);
		}
	};

	const filteredItems = getFilteredItems(query, data || []);

	const handleClickOutside = () => {
		setIsOpen(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	const navClass = classNames({
		'absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between': true,
		'opacity-0 -translate-x-full': !isOpen,
		'translate-x-0 opacity-100': isOpen,
	});

	// Handle search input focus to trigger data fetching
	const handleSearchFocus = () => {
		if (!isSearchActive) {
			setIsSearchActive(true);
		}
	};

	// Handle search input change to trigger data fetching when typing
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);

		// Only activate search if user types more than 2 characters
		if (value.length > 2 && !isSearchActive) {
			setIsSearchActive(true);
		}
	};

	// Show loading state while session is loading
	if (status === 'loading') {
		return <NavbarLoading />;
	}

	return (
		<nav ref={ref} className='relative bg-surface-primary shadow border-b border-border-primary'>
			<div className='container px-6 py-3 mx-auto md:flex'>
				<div className='flex items-center justify-between'>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 2,
						}}
					>
						<Link href='/'>
							<Image priority className='w-auto h-8 sm:h-9' src={logo} alt='logo' />
						</Link>
						<Typography
							className='md:hidden'
							sx={{
								fontWeight: 600,
								fontSize: '20px',
								lineHeight: '26px',
							}}
						>
							SVE REPLAY
						</Typography>
					</Box>

					<div className='flex items-center gap-2 md:hidden'>
						<ThemeToggle />
						<button
							type='button'
							className='text-text-primary hover:text-interactive-primary focus:outline-none focus:text-interactive-primary cursor-pointer transition ease-in-out'
							aria-label='toggle menu'
							onClick={() => setIsOpen(!isOpen)}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									setIsOpen(!isOpen);
								}
							}}
						>
							{isOpen ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
								>
									<title>Close Menu</title>
									<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-6 h-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth='2'
								>
									<title>Open Menu</title>
									<path strokeLinecap='round' strokeLinejoin='round' d='M4 8h16M4 16h16' />
								</svg>
							)}
						</button>
					</div>
				</div>

				<div className={navClass}>
					<div className='flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0 md:items-center'>
						<Link
							onClick={() => setIsOpen(false)}
							href='/'
							className='px-2.5 py-1 text-text-primary font-bold transition-colors duration-300 transform rounded-lg hover:bg-state-hover md:mx-2'
						>
							Home
						</Link>
						<Link
							onClick={() => setIsOpen(false)}
							href='/replay'
							className='px-2.5 py-1 text-text-primary font-bold transition-colors duration-300 transform rounded-lg hover:bg-state-hover md:mx-2'
						>
							Replay
						</Link>
						{!!session && (
							<>
								<Link
									onClick={() => setIsOpen(false)}
									href='/admin'
									className='px-2.5 py-1 text-text-primary font-bold transition-colors duration-300 transform rounded-lg hover:bg-state-hover md:mx-2'
								>
									Admin
								</Link>

								<Typography
									onClick={() => {
										setIsOpen(false);
										signOut({
											callbackUrl: '/',
											redirect: true,
										});
									}}
									className='px-2.5 py-1 text-text-primary font-bold transition-colors duration-300 transform rounded-lg hover:bg-state-hover md:mx-2 cursor-pointer'
								>
									Sign out
								</Typography>
							</>
						)}
						<div className='hidden md:block md:ml-4'>
							<ThemeToggle />
						</div>
					</div>
					<div className='md:hidden'>
						<div className='relative mt-2 md:mt-0'>
							<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
								<svg className='w-5 h-5 text-text-tertiary' viewBox='0 0 24 24' fill='none'>
									<title>Search Icon</title>
									<path
										d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</span>

							<input
								type='text'
								className='w-full py-2 pl-10 pr-4 text-text-primary bg-surface-primary border border-border-secondary rounded-lg focus:border-interactive-primary focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-interactive-primary'
								onChange={handleSearchChange}
								onFocus={handleSearchFocus}
								value={query || ''}
								placeholder='Search for a game'
							/>
						</div>
						<ul className='overflow-y-auto max-h-52'>
							{query.length > 2 && (
								<>
									{isLoading && <li className='px-4 py-2 text-text-tertiary text-center'>Loading games...</li>}
									{error && (
										<li className='px-4 py-2 text-interactive-danger text-center'>
											Failed to load games. Please try again.
										</li>
									)}
									{!isLoading && !error && filteredItems?.length === 0 && (
										<li className='px-4 py-2 text-text-tertiary text-center'>No games found</li>
									)}
									{!isLoading &&
										!error &&
										filteredItems?.map(game => (
											<Link
												onClick={() => {
													setQuery('');
													setIsOpen(false);
												}}
												key={game._id}
												href={`/replay/${game._id}`}
											>
												<p className='px-4 py-2 text-text-primary bg-surface-primary border border-border-primary hover:bg-state-hover text-center'>
													{game.homeTeam} vs {game.awayTeam} - {dayjs(game?.date).format('MMM D, YYYY')}
												</p>
											</Link>
										))}
								</>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarV2Optimized;
