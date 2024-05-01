import { z } from 'zod'

const CreateUserRequestSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    role: z.enum(['ADMIN', 'USER']),
})

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>
