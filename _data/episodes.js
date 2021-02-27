const Cache = require("@11ty/eleventy-cache-assets");
const settings = require('./settings');

const API_ENDPOINT = `${settings.wordpressBase}/wp-json`

const CACHE_OPTS = {
	duration: '1h',
	type: 'json'
}

module.exports = async function() {
	const episodeIndex = await Cache(`${API_ENDPOINT}/podlove/v1/episodes`, CACHE_OPTS);

	let episodes = [];
	for (let i = 0; i < episodeIndex.results.length; i++) {
		const episodeId = episodeIndex.results[i].id;
		let episode = await Cache(`${API_ENDPOINT}/podlove/v1/episodes/${episodeId}`, CACHE_OPTS);
		episode.link = `/episoden/${episode.number}`

		// Update url to new settings
		episode.poster = episode.poster.replace(settings.oldWordpressBase, settings.wordpressBase);
		episode.audio = episode.audio.map(audio => {
			audio.url = audio.url.replace(settings.oldWordpressBase, settings.wordpressBase);
			return audio
		})
		episode.files = episode.audio.map(file => {
			file.url = file.url.replace(settings.oldWordpressBase, settings.wordpressBase);
			return file
		})

		episodes.push(episode);
	}

	// Set isLatest to latest episode to make templating easier
	episodes[0].isLatest = true

	return episodes;
}

