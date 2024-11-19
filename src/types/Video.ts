export type VideoV2 = {
	_id: string;
	_type: string;
	_rev: string;
	_createdAt: string;
	_updatedAt?: string;
	isVideoAvailable: boolean;
	gameInfo: string;
	competition: 'Bezirksliga' | 'Kreisfreundschaftsspiele' | 'Rheinlandpokal';
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

export type CreateVideoPayload = {
	_type: string;
	isVideoAvailable: boolean;
	gameInfo: string;
	competition: 'Bezirksliga' | 'Kreisfreundschaftsspiele' | 'Rheinlandpokal';
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

export type UpdateVideoPayload = {
	_type?: string;
	isVideoAvailable?: boolean;
	gameInfo?: string;
	competition?: 'Bezirksliga' | 'Kreisfreundschaftsspiele' | 'Rheinlandpokal';
	homeTeam?: string;
	awayTeam?: string;
	homeScore?: number;
	awayScore?: number;
	date?: string;
	firstHalf1?: string;
	secondHalf1?: string;
	fullGame?: string;
	firstHalf2?: string;
	secondHalf2?: string;
	secondHalf3?: string;
	firstHalf3?: string;
};

export const testPayload: CreateVideoPayload = {
	_type: 'matchVideo',
	isVideoAvailable: false,
	gameInfo: 'League 153',
	competition: 'Bezirksliga',
	homeTeam: 'PSG',
	awayTeam: 'OM',
	homeScore: 2,
	awayScore: 2,
	date: '2024-11-19T12:00:00Z',
};

export const testUpdatePayload: UpdateVideoPayload = {
	isVideoAvailable: false,
	gameInfo: 'League Test',
	competition: 'Rheinlandpokal',
	homeTeam: 'FC Metternich',
	awayTeam: 'SVE Mendig',

	date: '2025-11-11T12:00:00Z',
};
