'use client';

import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const BackToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when user scrolls down 300px
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		// Cleanup
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className='fixed bottom-6 right-6 z-50 p-3 bg-green-600 dark:bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl'
					aria-label='Back to top'
					type='button'
				>
					<ChevronUpIcon className='w-6 h-6' />
				</button>
			)}
		</>
	);
};

export default BackToTopButton;
