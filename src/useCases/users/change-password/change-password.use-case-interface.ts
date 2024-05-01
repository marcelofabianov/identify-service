import { ChangePasswordRequestInterface } from './change-password.request-interface'

export interface ChangePasswordUseCaseInterface {
    execute(request: ChangePasswordRequestInterface): Promise<void>
}
