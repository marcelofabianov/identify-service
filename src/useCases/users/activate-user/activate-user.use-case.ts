import { ActivateUserRepositoryInterface } from './activate-user.repository-interface'
import { ActivateUserUseCaseInterface } from './activate-user.use-case-interface'

export class ActivateUserUseCase implements ActivateUserUseCaseInterface {
  constructor(private readonly repository: ActivateUserRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.repository.activate(id)
  }
}
