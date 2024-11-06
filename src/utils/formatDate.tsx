export const getFormattedDate = (date: string) => {
	const options = {
		// weekday: "long",
		year: 'numeric' as const,
		month: 'long' as const,
		day: 'numeric' as const,
	};
	const newDate = new Date(date);

	const formattedDate = newDate.toLocaleDateString('en-UK', options);

	return formattedDate;
};

export const getFormattedTime = (date: string) => {
	let str = date;
	if (typeof str === 'string') {
		str = str.split('T')[1];

		return str;
	}
};
