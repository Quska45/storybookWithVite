let vitePlugin = require( '@sveltejs/vite-plugin-svelte' );
let svelteProprocess = require( 'svelte-preprocess' )

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-jest"
  ],
  "framework": "@storybook/svelte",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "svelteOptions": {
    "preprocess": vitePlugin.vitePreprocess()
    // "preprocess": svelteProprocess()
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config, { configType }) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        path: require.resolve('path-browserify'),
      },
    };

    return config;
  },
}