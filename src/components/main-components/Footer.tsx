const FooterPage = () => {
	return (
		<footer className='bg-gray-900 dark:bg-gray-950 text-white py-8'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<p className='text-gray-400 dark:text-gray-500 mb-4'>SVE Match Replays - Team Analysis Platform</p>
				<p className='text-sm text-gray-500 dark:text-gray-600'>
					&copy; {new Date().getFullYear()} SVE. For coaches, players, and team staff.
				</p>
			</div>
		</footer>
	);
};

export default FooterPage;
