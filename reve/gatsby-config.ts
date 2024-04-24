import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
	siteMetadata: {
		title: 'Mémoire',
		description:
			'Mémoire is a project designed to keep track of listed & unlisted songs on music platforms of your choice',
		image: 'src/assets/icons/favicon.ico',
		siteUrl: 'https://mivladie.github.io/memoire/'
	},
	pathPrefix: '/memoire',
	graphqlTypegen: true,
	flags: {
		DEV_SSR: true
	},
	plugins: [
		'gatsby-plugin-react-svg',
		'gatsby-plugin-sass',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-breakpoints',
		'gatsby-alias-imports',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/assets/icons/favicon.ico'
			}
		}
	]
};

export default config;
