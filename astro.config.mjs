import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.medicinauadvirtual.mx',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/agradecimiento/'),
		}),
	],
});
