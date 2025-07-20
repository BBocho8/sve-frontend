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
					className='fixed bottom-6 right-6 z-50 p-3 bg-interactive-primary text-text-inverse rounded-full shadow-lg hover:bg-interactive-primary focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl'
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
