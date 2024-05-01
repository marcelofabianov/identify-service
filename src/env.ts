import { z } from 'zod'
import { ErrorHandle } from './errors/error-handle'

const envSchema = z.object({
    NODE_ENV: z.string(),
    API_URL: z.string(),
    API_PORT: z.string(),
    API_LOG: z.string(),
    DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    throw new ErrorHandle(500, 'Invalid environment variables')
}

export const env = _env.data
