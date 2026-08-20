export const site = {
	url: 'https://www.medicinauadvirtual.mx',
	name: 'Medicina Mixta Virtual UAD',
	shortName: 'Medicina UAD',
	language: 'es-MX',
	locale: 'es_MX',
	themeColor: '#29A9E0',
	defaultTitle: 'Medicina Mixta Virtual UAD | Universidad Autónoma de Durango',
	defaultDescription:
		'Conoce las licenciaturas de Medicina General y Enfermería en modalidad Mixta-Virtual de la Universidad Autónoma de Durango.',
	defaultImage: '/images/seo/medicina-uad-og.webp',
	organization: {
		name: 'Universidad Autónoma de Durango',
		alternateName: ['UAD', 'Escuela de Medicina UAD'],
		url: 'https://uadlobos.mx/',
		logo: '/favicon.svg',
		telephone: '+52 618 110 2529',
		whatsapp: '+52 618 110 2529',
		address: {
			streetAddress: 'Avenida Universidad Autónoma de Durango #300',
			addressLocality: 'Durango',
			addressRegion: 'Durango',
			postalCode: '34200',
			addressCountry: 'MX',
		},
	},
	socialProfiles: [
		'https://www.facebook.com/uadmx',
		'https://www.instagram.com/lobosuadmx/',
		'https://x.com/lobosuadmx',
	],
} as const;

export function absoluteUrl(path: string): string {
	return new URL(path, `${site.url}/`).toString();
}

export function normalizePath(path: string): string {
	if (path === '/') {
		return path;
	}

	return `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

export function whatsappUrl(message?: string): string {
	const encodedMessage = message
		? `?text=${encodeURIComponent(message)}`
		: '';

	return `https://wa.me/${site.organization.whatsapp.replace(/\D/g, '')}${encodedMessage}`;
}
