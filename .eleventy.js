const { DateTime } = require('luxon');
const markdownIt = require('markdown-it');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addPassthroughCopy('assets/fonts');
	eleventyConfig.addPassthroughCopy('assets/images');
	eleventyConfig.addPassthroughCopy('favicon');
	eleventyConfig.addPassthroughCopy('site.webmanifest');
	eleventyConfig.addPassthroughCopy({ 'node_modules/@podlove/web-player': 'podlove-web-player' });

	/* Markdown Overrides */
	let markdownLibrary = markdownIt();
	eleventyConfig.setLibrary('md', markdownLibrary);

	eleventyConfig.addFilter('formatDate', date => {
		return DateTime.fromISO(date).toFormat('dd.MM.yyyy');
	});

	eleventyConfig.addFilter('formatDuration', duration => {
		const parts = duration.split(':');
		const hours = parseInt(parts[0], 10);
		let minutes = parseInt(parts[1], 10);
		return `${hours * 60 + minutes} Minuten`;
	});

	eleventyConfig.addFilter('latestEpisode', episodes => episodes.find(episode => episode.isLatest));
	eleventyConfig.addFilter('wordpressPermalink', title => title.toLowerCase().replace(/\s/gi, '-'));
	
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	return {
		templateFormats: ['md', 'njk', 'html'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',

		// These are all optional, defaults are shown:
		dir: {
			input: '.',
			includes: '_includes',
			data: '_data',
			output: '_site'
		}
	};
};
