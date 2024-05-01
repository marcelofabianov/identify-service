import { UserInterface } from '@/entities/user.interface'

export interface FindUserRepositoryInterface {
    findById(id: string): Promise<UserInterface | null>
}
