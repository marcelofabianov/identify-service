import { UserInterface } from '@/entities/user.interface'

export interface ChangePasswordRepositoryInterface {
    findById(id: string): Promise<UserInterface | null>
    changePassword(id: string, newPassword: string): Promise<void>
}
