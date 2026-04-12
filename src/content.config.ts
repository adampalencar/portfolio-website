import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    oneliner: z.string(),
    code: z.string(),
    discipline: z.string(),
    role: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()),
    category: z.enum(['Personal', 'Professional', 'Academic']),
    tier: z.number().int().min(1).max(3),
    thumbnail: image(),
    tags: z.array(z.string()),
  }),
});

export const collections = { 'case-studies': caseStudies };
