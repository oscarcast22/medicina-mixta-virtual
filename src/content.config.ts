import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const licenciaturas = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/content/licenciaturas' }),
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
});

export const collections = { licenciaturas };
