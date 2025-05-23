import { z } from 'zod';

export const createViewSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    type: z.enum(['KANBAN', 'TABLE']),
    config: z.record(z.any()),
    pipelineId: z.string()
  })
});

export const updateViewSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    type: z.enum(['KANBAN', 'TABLE']).optional(),
    config: z.record(z.any()).optional()
  })
});

export const deleteViewSchema = z.object({
  params: z.object({
    id: z.string()
  })
});
