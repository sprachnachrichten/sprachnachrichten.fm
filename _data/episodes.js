const Cache = require("@11ty/eleventy-cache-assets");
const settings = require('./settings');
const hosts = require('./hosts');

const API_ENDPOINT = `${settings.wordpressBase}/wp-json`

const CACHE_OPTS = {
	duration: '10m',
	type: 'json'
}

module.exports = async function () {
	const episodeIndex = await Cache(`${API_ENDPOINT}/podlove/v1/episodes`, CACHE_OPTS);

	const contributors = hosts.map(contributor => ({
		id: `${contributor.id}`,
		name: contributor.name,
		avatar: `/assets/images/optimized/${contributor.profileImage}-96px.jpg`,
	}));

	let episodes = [];
	for (let i = 0; i < episodeIndex.results.length; i++) {
		const episodeId = episodeIndex.results[i].id;
		let episode = await Cache(`${API_ENDPOINT}/podlove/v1/episodes/${episodeId}`, CACHE_OPTS);
		episode.link = `/episoden/${episode.number}`

		let transcripts = await Cache(`${API_ENDPOINT}/podlove/v1/transcripts/${episodeId}`, CACHE_OPTS);
		episode.transcripts = transcripts;
		episode.contributors = contributors;
		episodes.push(episode);
	}

	// Set isLatest to latest episode to make templating easier
	episodes[0].isLatest = true

	return episodes;
}

