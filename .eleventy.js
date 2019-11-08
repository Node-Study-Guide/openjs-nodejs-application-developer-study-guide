module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addLayoutAlias("default", "default.njk");
  return {
    passthroughFileCopy: true
  };
};
