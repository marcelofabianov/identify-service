import { UserDTO } from '@/entities/dto/user.dto'
import { CreateUserRepositoryInterface } from '@/useCases/create-user/create-user.repository-interface'

export interface UserRepositoryInterface extends CreateUserRepositoryInterface {
    create(dto: UserDTO): Promise<void>
}
