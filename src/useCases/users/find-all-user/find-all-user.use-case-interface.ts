import { FindAllUserResponseInterface } from './find-all-user.response-interface'

export interface FindAllUserUseCaseInterface {
  execute(): Promise<FindAllUserResponseInterface>
}
