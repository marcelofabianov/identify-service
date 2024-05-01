import { FindUserResponseInterface } from './find-user.response-interface'

export interface FindUserUseCaseInterface {
    execute(id: string): Promise<FindUserResponseInterface>
}
