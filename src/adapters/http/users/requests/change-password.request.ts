import { z } from 'zod'

const changePasswordRequestSchema = z.object({
    password: z.string().min(8).max(255),
    newPassword: z.string().min(8).max(255),
})

export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>

export { changePasswordRequestSchema }
