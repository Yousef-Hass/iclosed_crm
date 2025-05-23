import { z } from 'zod';

export const createContactSchema = z.object({
  body: z.object({
    basicInfo: z.record(z.any()),
    statusId: z.string(),
    fields: z.array(z.object({
      fieldId: z.string(),
      value: z.any()
    })).optional()
  })
});

export const updateContactSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    basicInfo: z.record(z.any()).optional(),
    statusId: z.string().optional(),
    fields: z.array(z.object({
      fieldId: z.string(),
      value: z.any()
    })).optional()
  })
});

export const updateContactStatusSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    statusId: z.string()
  })
});

export const deleteContactSchema = z.object({
  params: z.object({
    id: z.string()
  })
});
