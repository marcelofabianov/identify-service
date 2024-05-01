import { UserDTO } from '@/entities/dto/user.dto'

export interface CreateUserUseCaseInterface {
    execute(data: UserDTO): Promise<void>
}
