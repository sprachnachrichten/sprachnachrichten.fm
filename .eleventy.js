const fs = require("fs");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setDataDeepMerge(true);
	
	eleventyConfig.addPassthroughCopy("assets/fonts");
	eleventyConfig.addPassthroughCopy("assets/images");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt();
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
		templateFormats: ["md", "njk", "html"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		
		// These are all optional, defaults are shown:
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site"
		}
	};
};
