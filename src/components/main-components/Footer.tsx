const FooterPage = () => {
	return (
		<footer className='bg-surface-primary border-t border-border-primary text-text-primary py-8'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<p className='text-text-secondary mb-4'>SVE Match Replays - Team Analysis Platform</p>
				<p className='text-sm text-text-tertiary'>
					&copy; {new Date().getFullYear()} SVE. For coaches, players, and team staff.
				</p>
			</div>
		</footer>
	);
};

export default FooterPage;
