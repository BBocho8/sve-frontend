const getYoutubeID = (url?: string) => {
	let str = url;

	if (typeof str === 'string') {
		str = str.split('?')[0].split('/').reverse()[0];

		return `https://i.ytimg.com/vi/${str}/maxresdefault.jpg`;
	}
};

export default getYoutubeID;
