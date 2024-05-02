import { UpdateUserRepositoryInterface } from './update-user.repository-interface'
import { UpdateUserUseCaseInterface } from './update-user.use-case-interface'
import { UpdateUserRequestInterface } from './update-user.request-interface'
import { UpdateUserResponseInterface } from './update-user.response-interface'
import { UserDTO } from '@/entities/dto/user.dto'

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(private readonly repository: UpdateUserRepositoryInterface) {}

  async execute(
    request: UpdateUserRequestInterface,
  ): Promise<UpdateUserResponseInterface> {
    const user = await this.repository.findById(request.id)

    if (!user) {
      throw new Error('User not found')
    }

    const dto = {
      id: user.getId(),
      name: request.name,
      email: request.email,
      role: request.role,
      createdAt: user.getCreatedAt(),
      updatedAt: new Date(),
      archivedAt: user.getArchivedAt(),
      deletedAt: user.getDeletedAt(),
    } as UserDTO

    await this.repository.update(request.id, dto)

    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      archivedAt: dto.archivedAt,
    }
  }
}
