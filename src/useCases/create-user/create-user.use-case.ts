import { CreateUserUseCaseInterface } from './create-user.use-case-interface'
import { CreateUserRepositoryInterface } from './create-user.repository-interface'
import { UserErrorEnum } from '@/errors/user.error-enum'
import { CreateUserRequestInterface } from './create-user.request-interface'
import { randomUUID } from 'crypto'
import { ErrorHandle } from '@/errors/ErrorHandle'
import { CreateUserResponseInterface } from './create-user.response-interface'
import { UserDTO } from '@/entities/dto/user.dto'

export class CreateUserUseCase implements CreateUserUseCaseInterface {
    constructor(private readonly userRepository: CreateUserRepositoryInterface) {}

    async execute(request: CreateUserRequestInterface): Promise<CreateUserResponseInterface> {
        const exists = await this.userRepository.existsByEmail(request.email)

        if (exists) {
            throw new ErrorHandle(400, UserErrorEnum.ALREADY_EXISTS)
        }

        const dto = {
            ...request,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            archivedAt: null,
        } as UserDTO

        await this.userRepository.create(dto)

        return {
            id: dto.id,
            name: dto.name,
            email: dto.email,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as CreateUserResponseInterface
    }
}
