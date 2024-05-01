import { ChangePasswordRepositoryInterface } from './change-password.repository-interface'
import { ChangePasswordRequestInterface } from './change-password.request-interface'
import { ChangePasswordUseCaseInterface } from './change-password.use-case-interface'

export class ChangePasswordUseCase implements ChangePasswordUseCaseInterface {
    constructor(private readonly repository: ChangePasswordRepositoryInterface) {}

    async execute(request: ChangePasswordRequestInterface): Promise<void> {
        await this.repository.changePassword(request.id, request.newPassword)
    }
}
