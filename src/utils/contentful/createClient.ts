import type { Video } from '@/types/Video';
import { createClient } from 'contentful';

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID as string,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_PUBLISHED as string,
});

const getAllGames = async () => {
	const response = await client.getEntries({
		content_type: 'matchs-videos',
	});

	return response.items.map(item => {
		return { ...item.fields, id: item.sys.id };
	}) as Video[];
};

export default getAllGames;
