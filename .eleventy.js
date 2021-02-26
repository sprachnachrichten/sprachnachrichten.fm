const fs = require('fs');
const { DateTime, Duration } = require('luxon');
const markdownIt = require('markdown-it');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setDataDeepMerge(true);
	
	eleventyConfig.addPassthroughCopy('assets/fonts');
	eleventyConfig.addPassthroughCopy('assets/images');
	eleventyConfig.addPassthroughCopy({ 'node_modules/@podlove/web-player': 'podlove-web-player' });


  /* Markdown Overrides */
  let markdownLibrary = markdownIt();
  eleventyConfig.setLibrary('md', markdownLibrary);

	eleventyConfig.addFilter('formatDate', date => {
    return DateTime.fromISO(date).toFormat('dd.MM.yyyy');
  });

	eleventyConfig.addFilter('formatDuration', duration => {
		const parts = duration.split(':');
		return `${parts[0]}:${parts[1]}h`;
  });

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
