import dayjs from 'dayjs';

export const getFormattedDate = (date: string) => {
	const formattedDate = dayjs(date).format('D MMMM YYYY');
	return formattedDate;
};

export const getFormattedTime = (date: string) => {
	const formattedTime = dayjs(date).format('HH:mm');
	return formattedTime;
};
