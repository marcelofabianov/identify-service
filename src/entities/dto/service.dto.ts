import { z } from 'zod'

export const ServiceSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2).max(255),
    description: z.string().min(2).max(255),
    createdAt: z.date(),
    updatedAt: z.date(),
    archivedAt: z.date().nullable(),
    deletedAt: z.date().nullable(),
})

export type ServiceDTO = z.infer<typeof ServiceSchema>
