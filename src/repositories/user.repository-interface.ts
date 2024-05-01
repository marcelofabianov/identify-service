import { UserDTO } from '@/entities/dto/user.dto'
import { UserInterface } from '@/entities/user.interface'
import { CreateUserRepositoryInterface } from '@/useCases/create-user/create-user.repository-interface'
import { FindUserRepositoryInterface } from '@/useCases/find-user/find-user.repository-interface'

export interface UserRepositoryInterface extends CreateUserRepositoryInterface, FindUserRepositoryInterface {
    create(dto: UserDTO): Promise<void>
    existsByEmail(email: string): Promise<boolean>
    findById(id: string): Promise<UserInterface | null>
}
