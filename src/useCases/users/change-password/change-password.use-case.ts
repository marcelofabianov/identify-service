import { ErrorHandle } from '@/errors/error-handle'
import { ChangePasswordRepositoryInterface } from './change-password.repository-interface'
import { ChangePasswordRequestInterface } from './change-password.request-interface'
import { ChangePasswordServiceInterface } from './change-password.service-interface'
import { ChangePasswordUseCaseInterface } from './change-password.use-case-interface'
import { UserErrorEnum } from '@/errors/user.error-enum'

export class ChangePasswordUseCase implements ChangePasswordUseCaseInterface {
    constructor(
        private readonly passwordService: ChangePasswordServiceInterface,
        private readonly repository: ChangePasswordRepositoryInterface,
    ) {}

    async execute(request: ChangePasswordRequestInterface): Promise<void> {
        const user = await this.repository.findById(request.id)

        if (!user) {
            throw new ErrorHandle(404, UserErrorEnum.USER_NOT_FOUND)
        }

        const isPasswordMatch = await this.isPasswordMatch(request.password, user.getPassword())

        if (!isPasswordMatch) {
            throw new ErrorHandle(400, UserErrorEnum.PASSWORD_NOT_MATCH)
        }

        const hashedPassword = await this.hashPassword(request.newPassword)

        await this.repository.changePassword(request.id, hashedPassword)
    }

    private async isPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await this.passwordService.comparePassword(password, hashedPassword)
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.COMPARE_PASSWORD)
        }
    }

    private async hashPassword(password: string): Promise<string> {
        try {
            return await this.passwordService.hashPassword(password)
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.HASH_PASSWORD)
        }
    }
}
