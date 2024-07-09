import { defineCollection, z } from 'astro:content';

export const collections = {
	licenciaturas: defineCollection({
		type: 'content',
		schema: z.object({
			titulo: z.string(),
			portada: z.string(),
			mapa_curricular: z.string(),
			rvoe: z.string(),
			plan_estudios: z.array(z.object({
				titulo: z.string(),
				contenido: z.array(z.string()),
			})),
		}),
	}),
};