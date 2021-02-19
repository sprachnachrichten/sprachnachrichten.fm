const Cache = require("@11ty/eleventy-cache-assets");

const API_ENDPOINT = 'https://sprachnachrichten.fm/wp-json'

const CACHE_OPTS = {
	duration: '1h',
	type: 'json'
}

module.exports = async function() {
	const episodeIndex = await Cache(`${API_ENDPOINT}/podlove/v1/episodes`, CACHE_OPTS);

	let episodes = [];
	for (let i = 0; i < episodeIndex.results.length; i++) {
		const episodeId = episodeIndex.results[i].id;
		const episode = await Cache(`${API_ENDPOINT}/podlove/v1/episodes/${episodeId}`, CACHE_OPTS);
		episodes.push(episode);
	}

	return episodes;
}

