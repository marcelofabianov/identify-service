import { z } from 'zod'

const updateUserRequestSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'USER']),
})

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>

export { updateUserRequestSchema }
