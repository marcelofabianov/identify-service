import { CreateUserRepositoryInterface } from '@/useCases/create-user/create-user.repository-interface'
import { DeleteUserRepositoryInterface } from '@/useCases/delete-user/delete-user.repository-interface'
import { FindAllUserRepositoryInterface } from '@/useCases/find-all-user/find-all-user.repository-interface'
import { FindUserRepositoryInterface } from '@/useCases/find-user/find-user.repository-interface'

export interface UserRepositoryInterface
    extends CreateUserRepositoryInterface,
        FindUserRepositoryInterface,
        FindAllUserRepositoryInterface,
        DeleteUserRepositoryInterface {}
