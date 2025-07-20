import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
	return (
		<div className='flex flex-col gap-4 h-96 justify-center items-center'>
			<LoadingSpinner />
			<p className='text-lg font-semibold text-center text-text-primary tracking-tighter line-clamp-1'>
				App is loading...
			</p>
		</div>
	);
}
