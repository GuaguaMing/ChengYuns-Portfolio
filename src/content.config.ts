import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['ui-ux', 'physical', 'games']),
    /** case = 獨立案例頁；mini = 小品卡（Lightbox） */
    kind: z.enum(['case', 'mini']).default('case'),
    order: z.number(),
    year: z.string(),
    period: z.string().optional(),
    role: z.string(),
    team: z.string().optional(),
    tools: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    badge: z.string().optional(),
    highlight: z.string().optional(),
    featured: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { works };
