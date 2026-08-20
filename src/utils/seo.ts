import { absoluteUrl, site, whatsappUrl } from '../config/site';

export type JsonLd = Record<string, unknown>;

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export type FaqItem = [question: string, answer: string];

export function organizationSchema(): JsonLd {
	return {
		'@type': ['CollegeOrUniversity', 'EducationalOrganization'],
		'@id': `${site.url}/#organization`,
		name: site.organization.name,
		alternateName: site.organization.alternateName,
		url: site.organization.url,
		logo: {
			'@type': 'ImageObject',
			url: absoluteUrl(site.organization.logo),
		},
		image: absoluteUrl(site.organization.logo),
		telephone: site.organization.telephone,
		address: {
			'@type': 'PostalAddress',
			...site.organization.address,
		},
		areaServed: {
			'@type': 'Country',
			name: 'México',
		},
		sameAs: [site.organization.url, ...site.socialProfiles],
		contactPoint: [
			{
				'@type': 'ContactPoint',
				contactType: 'admissions',
				telephone: site.organization.telephone,
				areaServed: 'MX',
				availableLanguage: ['es-MX'],
			},
			{
				'@type': 'ContactPoint',
				contactType: 'WhatsApp',
				telephone: site.organization.whatsapp,
				url: whatsappUrl(),
				areaServed: 'MX',
				availableLanguage: ['es-MX'],
			},
		],
	};
}

export function websiteSchema(): JsonLd {
	return {
		'@type': 'WebSite',
		'@id': `${site.url}/#website`,
		url: `${site.url}/`,
		name: site.name,
		inLanguage: site.language,
		publisher: { '@id': `${site.url}/#organization` },
	};
}

export function webPageSchema(options: {
	url: string;
	name: string;
	description: string;
	image: string;
	type?: string;
}): JsonLd {
	return {
		'@type': options.type ?? 'WebPage',
		'@id': `${options.url}#webpage`,
		url: options.url,
		name: options.name,
		description: options.description,
		inLanguage: site.language,
		isPartOf: { '@id': `${site.url}/#website` },
		about: { '@id': `${site.url}/#organization` },
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: options.image,
		},
	};
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

export function programSchema(options: {
	url: string;
	name: string;
	description: string;
	image: string;
	rvoe: string;
	semesters: number;
	credential: string;
}): JsonLd {
	return {
		'@type': 'EducationalOccupationalProgram',
		'@id': `${options.url}#program`,
		name: options.name,
		description: options.description,
		url: options.url,
		image: options.image,
		inLanguage: site.language,
		programType: 'Licenciatura en modalidad Mixta-Virtual',
		timeToComplete: `P${options.semesters === 12 ? 6 : 4}Y`,
		educationalCredentialAwarded: options.credential,
		provider: { '@id': `${site.url}/#organization` },
		identifier: {
			'@type': 'PropertyValue',
			propertyID: 'RVOE',
			value: options.rvoe,
		},
	};
}

function plainText(value: string): string {
	return value
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

export function faqSchema(items: FaqItem[]): JsonLd {
	return {
		'@type': 'FAQPage',
		'@id': `${site.url}/preguntas-frecuentes/#faq`,
		mainEntity: items.map(([question, answer]) => ({
			'@type': 'Question',
			name: question.replace(/^\d+\.\-\s*/, '').trim(),
			acceptedAnswer: {
				'@type': 'Answer',
				text: plainText(answer),
			},
		})),
	};
}
