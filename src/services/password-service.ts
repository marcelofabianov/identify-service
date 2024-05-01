import * as argon2 from 'argon2'
import { env } from '@/env'
import { PasswordServiceInterface } from './password-service.interface'
import { ErrorHandle } from '@/errors/error-handle'
import { UserErrorEnum } from '@/errors/user.error-enum'

export class PasswordService implements PasswordServiceInterface {
    private readonly hashOptions = {
        raw: false,
        type: argon2.argon2id,
        hashLength: 33,
        timeCost: 3,
        salt: Buffer.from(env.API_HASH_SALT),
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await argon2.hash(password, this.hashOptions)
            return hashedPassword
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.HASH_PASSWORD)
        }
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await argon2.verify(hashedPassword, password)
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.COMPARE_PASSWORD)
        }
    }
}
