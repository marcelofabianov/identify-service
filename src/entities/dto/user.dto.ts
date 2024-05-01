import { z } from 'zod'

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    role: z.enum(['ADMIN', 'USER']),
    createdAt: z.date(),
    updatedAt: z.date(),
    archivedAt: z.date().nullable(),
    deletedAt: z.date().nullable(),
})

export type UserDTO = z.infer<typeof UserSchema>
