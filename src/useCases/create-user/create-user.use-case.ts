import { CreateUserUseCaseInterface } from './create-user.use-case-interface'
import { CreateUserRepositoryInterface } from './create-user.repository-interface'
import { UserErrorEnum } from '@/errors/user.error-enum'
import { CreateUserRequest } from './create-user.request'
import { randomUUID } from 'crypto'

export class CreateUserUseCase implements CreateUserUseCaseInterface {
    constructor(private readonly userRepository: CreateUserRepositoryInterface) {}

    async execute(request: CreateUserRequest): Promise<void> {
        const exists = await this.userRepository.existsByEmail(request.email)

        if (exists) {
            throw new Error(UserErrorEnum.ALREADY_EXISTS)
        }

        const dto = {
            ...request,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            archivedAt: null,
        }

        await this.userRepository.create(dto)
    }
}
