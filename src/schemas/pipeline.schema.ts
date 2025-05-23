import { z } from 'zod';

export const createPipelineSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    organizationId: z.string()
  })
});

export const updatePipelineSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional()
  })
});

export const deletePipelineSchema = z.object({
  params: z.object({
    id: z.string()
  })
});
