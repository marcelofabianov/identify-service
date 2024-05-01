import { CreateUserRequest } from './create-user.request'

export interface CreateUserUseCaseInterface {
    execute(request: CreateUserRequest): Promise<void>
}
