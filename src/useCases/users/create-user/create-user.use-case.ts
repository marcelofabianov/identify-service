import { CreateUserUseCaseInterface } from './create-user.use-case-interface'
import { CreateUserRepositoryInterface } from './create-user.repository-interface'
import { UserErrorEnum } from '@/errors/user.error-enum'
import { CreateUserRequestInterface } from './create-user.request-interface'
import { randomUUID } from 'crypto'
import { ErrorHandle } from '@/errors/error-handle'
import { CreateUserResponseInterface } from './create-user.response-interface'
import { UserDTO } from '@/entities/dto/user.dto'
import { CreateUserPasswordServiceInterface } from './create-user-password.service-interface'

export class CreateUserUseCase implements CreateUserUseCaseInterface {
    constructor(
        private readonly passwordService: CreateUserPasswordServiceInterface,
        private readonly userRepository: CreateUserRepositoryInterface,
    ) {}

    async execute(request: CreateUserRequestInterface): Promise<CreateUserResponseInterface> {
        const exists = await this.userRepository.existsByEmail(request.email)

        if (exists) {
            throw new ErrorHandle(400, UserErrorEnum.ALREADY_EXISTS)
        }

        const password = await this.passwordService.hashPassword(request.password)

        const dto = {
            ...request,
            password,
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
            role: dto.role,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as CreateUserResponseInterface
    }
}
