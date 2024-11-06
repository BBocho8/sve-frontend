export type VideoApiResponse = {
	videoGames: Video[];
};

export type Video = {
	id: string;
	isVideoAvailable: boolean;
	gameInfo: string;
	competition: string;
	homeTeam: string;
	awayTeam: string;
	homeScore: number;
	awayScore: number;
	date: string;
	firstHalf1?: string;
	secondHalf1?: string;
	fullGame?: string;
	firstHalf2?: string;
	secondHalf2?: string;
	secondHalf3?: string;
	firstHalf3?: string;
};
