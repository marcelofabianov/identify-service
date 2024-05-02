import { UserInterface } from '@/entities/user.interface'
import { FindAllUserRepositoryInterface } from './find-all-user.repository-interface'
import {
  FindAllUserResponseInterface,
  UserResponse,
} from './find-all-user.response-interface'
import { FindAllUserUseCaseInterface } from './find-all-user.use-case-interface'

export class FindAllUserUseCase implements FindAllUserUseCaseInterface {
  constructor(private readonly repository: FindAllUserRepositoryInterface) {}

  public async execute(): Promise<FindAllUserResponseInterface> {
    const users: UserInterface[] = await this.repository.findAll()

    if (!users || users.length === 0) {
      return { data: [] }
    }

    const mappedUsers: UserResponse[] = this.mapUsers(users)

    return { data: mappedUsers }
  }

  private mapUsers(users: UserInterface[]): UserResponse[] {
    return users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      archivedAt: user.getArchivedAt(),
    }))
  }
}
