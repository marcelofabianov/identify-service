import { DeleteUserRepositoryInterface } from './delete-user.repository-interface'
import { DeleteUserUseCaseInterface } from './delete-user.use-case-interface'

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(private readonly repository: DeleteUserRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
