import { ActivateUserRepositoryInterface } from '@/useCases/users/activate-user/activate-user.repository-interface'
import { ArchiveUserRepositoryInterface } from '@/useCases/users/archive-user/archive-user.repository-interface'
import { ChangePasswordRepositoryInterface } from '@/useCases/users/change-password/change-password.repository-interface'
import { CreateUserRepositoryInterface } from '@/useCases/users/create-user/create-user.repository-interface'
import { DeleteUserRepositoryInterface } from '@/useCases/users/delete-user/delete-user.repository-interface'
import { FindAllUserRepositoryInterface } from '@/useCases/users/find-all-user/find-all-user.repository-interface'
import { FindUserRepositoryInterface } from '@/useCases/users/find-user/find-user.repository-interface'
import { UpdateUserRepositoryInterface } from '@/useCases/users/update-user/update-user.repository-interface'

export interface UserRepositoryInterface
  extends CreateUserRepositoryInterface,
    FindUserRepositoryInterface,
    FindAllUserRepositoryInterface,
    DeleteUserRepositoryInterface,
    UpdateUserRepositoryInterface,
    ArchiveUserRepositoryInterface,
    ActivateUserRepositoryInterface,
    ChangePasswordRepositoryInterface {}
