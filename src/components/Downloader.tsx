import { useState } from 'react';

const DownloadButton = () => {
	const [url, setUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleDownload = async () => {
		if (!url) {
			alert('Please enter a valid YouTube URL.');
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);

			if (!response.ok) {
				const error = await response.json();
				alert(`Error: ${error.error}`);
				setLoading(false);
				return;
			}

			const blob = await response.blob();
			const urlBlob = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = urlBlob;
			a.download = 'video.mp4'; // Fallback filename
			a.click();
			window.URL.revokeObjectURL(urlBlob);
		} catch (error) {
			console.error('Error downloading the file:', error);
			alert('An error occurred while downloading the video.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Enter YouTube URL'
				value={url}
				onChange={e => setUrl(e.target.value)}
				style={{ marginRight: '10px' }}
			/>
			<button type='button' onClick={handleDownload} disabled={loading}>
				{loading ? 'Downloading...' : 'Download Video'}
			</button>
		</div>
	);
};

export default DownloadButton;
