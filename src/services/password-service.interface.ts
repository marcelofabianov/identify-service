import { CreateUserPasswordServiceInterface } from '@/useCases/users/create-user/create-user-password.service-interface'

export interface PasswordServiceInterface extends CreateUserPasswordServiceInterface {
    hashPassword(password: string): Promise<string>
    comparePassword(password: string, hash: string): Promise<boolean>
}
