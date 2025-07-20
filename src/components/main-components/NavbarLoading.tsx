import { Box, Skeleton } from '@mui/material';
import Image from 'next/image';
import logo from '../../../public/logo.png';

const NavbarLoading = () => {
	return (
		<nav className='relative bg-white shadow'>
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
						<Image priority className='w-auto h-8 sm:h-9' src={logo} alt='logo' />
						<Skeleton className='md:hidden' variant='text' width={120} height={26} />
					</Box>

					<div className='flex md:hidden'>
						<Skeleton variant='rectangular' width={24} height={24} />
					</div>
				</div>

				<div className='hidden md:flex md:items-center md:justify-between md:w-full md:ml-10'>
					<div className='flex space-x-4'>
						<Skeleton variant='text' width={60} height={32} />
						<Skeleton variant='text' width={60} height={32} />
						<Skeleton variant='text' width={60} height={32} />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavbarLoading;
