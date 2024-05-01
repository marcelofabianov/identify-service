import { UserDTO } from '@/entities/dto/user.dto'
import { CreateUserUseCaseInterface } from './create-user.use-case-interface'
import { CreateUserRepositoryInterface } from './create-user.repository-interface'

export class CreateUserUseCase implements CreateUserUseCaseInterface {
    constructor(private readonly userRepository: CreateUserRepositoryInterface) {}

    async execute(dto: UserDTO): Promise<void> {
        await this.userRepository.create(dto)
    }
}
