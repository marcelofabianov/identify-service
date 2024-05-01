import { UpdateUserRequestInterface } from './update-user.request-interface'
import { UpdateUserResponseInterface } from './update-user.response-interface'

export interface UpdateUserUseCaseInterface {
    handle(request: UpdateUserRequestInterface): Promise<UpdateUserResponseInterface>
}
