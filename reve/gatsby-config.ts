import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Mémoire`,
		siteUrl: `https://mivladie.github.io/memoire/`
	},
	pathPrefix: '/memoire',
	graphqlTypegen: true,
	flags: {
		DEV_SSR: true
	},
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-breakpoints',
		'gatsby-alias-imports',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/icon.png'
			}
		}
	]
};

export default config;
