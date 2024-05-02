import { ConnectionInterface } from '@/adapters/database/connection.interface'
import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/useCases/users/create-user/create-user.use-case'
import { CreateUserUseCaseInterface } from '@/useCases/users/create-user/create-user.use-case-interface'
import { UserRepositoryInterface } from '@/repositories/user.repository-interface'
import { CreateUserController } from '@/adapters/http/users/controllers/create-user.controller'
import { UserRouter } from '@/adapters/http/users/user.router'
import { FindUserController } from '@/adapters/http/users/controllers/find-user.controller'
import { FindUserUseCase } from '@/useCases/users/find-user/find-user.use-case'
import { FindUserUseCaseInterface } from '@/useCases/users/find-user/find-user.use-case-interface'
import { ContainerWrapperInterface } from './container-wrapper.interface'
import { FindAllUserUseCase } from '@/useCases/users/find-all-user/find-all-user.use-case'
import { FindAllUserController } from '@/adapters/http/users/controllers/find-all-user.controller'
import { FindAllUserUseCaseInterface } from '@/useCases/users/find-all-user/find-all-user.use-case-interface'
import { ControllerInterface } from '@/adapters/http/controller.interface'
import { DeleteUserUseCase } from '@/useCases/users/delete-user/delete-user.use-case'
import { DeleteUserController } from '@/adapters/http/users/controllers/delete-user.controller'
import { UpdateUserUseCase } from '@/useCases/users/update-user/update-user.use-case'
import { UpdateUserController } from '@/adapters/http/users/controllers/update-user.controller'
import { ArchiveUserUseCase } from '@/useCases/users/archive-user/archive-user.use-case'
import { ArchiveUserController } from '@/adapters/http/users/controllers/archive-user.controller'
import { ActivateUserUseCase } from '@/useCases/users/activate-user/activate-user.use-case'
import { ActivateUserController } from '@/adapters/http/users/controllers/activate-user.controller'
import { ChangePasswordUseCase } from '@/useCases/users/change-password/change-password.use-case'
import { ChangePasswordController } from '@/adapters/http/users/controllers/change-password.controller'
import { ContainerInterface } from './container.interface'
import { PasswordServiceInterface } from '@/services/password-service.interface'

export class UserContainer implements ContainerInterface {
  constructor(private container: ContainerWrapperInterface) {}

  public register(): void {
    this.registerRepository()
    this.registerUseCases()
    this.registerControllers()
    this.registerRouter()
  }

  private registerRepository(): void {
    const db = this.container.get('Connection') as ConnectionInterface
    const userRepository = new UserRepository(db)

    this.container.add('UserRepository', userRepository)
  }

  private registerUseCases(): void {
    const passwordService = this.container.get(
      'PasswordService',
    ) as PasswordServiceInterface

    const userRepository = this.container.get(
      'UserRepository',
    ) as UserRepositoryInterface
    const createUserUseCase = new CreateUserUseCase(
      passwordService,
      userRepository,
    )
    const findUserUseCase = new FindUserUseCase(userRepository)
    const findAllUserUseCase = new FindAllUserUseCase(userRepository)
    const deleteUserUseCase = new DeleteUserUseCase(userRepository)
    const updateUserUseCase = new UpdateUserUseCase(userRepository)
    const archiveUserUseCase = new ArchiveUserUseCase(userRepository)
    const activateUserUseCase = new ActivateUserUseCase(userRepository)
    const changePasswordUseCase = new ChangePasswordUseCase(
      passwordService,
      userRepository,
    )

    this.container.add('CreateUserUseCase', createUserUseCase)
    this.container.add('FindUserUseCase', findUserUseCase)
    this.container.add('FindAllUserUseCase', findAllUserUseCase)
    this.container.add('DeleteUserUseCase', deleteUserUseCase)
    this.container.add('UpdateUserUseCase', updateUserUseCase)
    this.container.add('ArchiveUserUseCase', archiveUserUseCase)
    this.container.add('ActivateUserUseCase', activateUserUseCase)
    this.container.add('ChangePasswordUseCase', changePasswordUseCase)
  }

  private registerControllers(): void {
    const createUserUseCase = this.container.get(
      'CreateUserUseCase',
    ) as CreateUserUseCaseInterface
    const findUserUseCase = this.container.get(
      'FindUserUseCase',
    ) as FindUserUseCaseInterface
    const findAllUserUseCase = this.container.get(
      'FindAllUserUseCase',
    ) as FindAllUserUseCaseInterface
    const deleteUserUseCase = this.container.get(
      'DeleteUserUseCase',
    ) as DeleteUserUseCase
    const updateUserUseCase = this.container.get(
      'UpdateUserUseCase',
    ) as UpdateUserUseCase
    const archiveUserUseCase = this.container.get(
      'ArchiveUserUseCase',
    ) as ArchiveUserUseCase
    const activateUserUseCase = this.container.get(
      'ActivateUserUseCase',
    ) as ActivateUserUseCase
    const changePasswordUseCase = this.container.get(
      'ChangePasswordUseCase',
    ) as ChangePasswordUseCase

    const createUserController = new CreateUserController(createUserUseCase)
    const findUserController = new FindUserController(findUserUseCase)
    const findAllUserController = new FindAllUserController(findAllUserUseCase)
    const deleteUserController = new DeleteUserController(deleteUserUseCase)
    const updateUserController = new UpdateUserController(updateUserUseCase)
    const archiveUserController = new ArchiveUserController(archiveUserUseCase)
    const activateUserController = new ActivateUserController(
      activateUserUseCase,
    )
    const changePasswordController = new ChangePasswordController(
      changePasswordUseCase,
    )

    this.container.add('CreateUserController', createUserController)
    this.container.add('FindUserController', findUserController)
    this.container.add('FindAllUserController', findAllUserController)
    this.container.add('DeleteUserController', deleteUserController)
    this.container.add('UpdateUserController', updateUserController)
    this.container.add('ArchiveUserController', archiveUserController)
    this.container.add('ActivateUserController', activateUserController)
    this.container.add('ChangePasswordController', changePasswordController)
  }

  private registerRouter(): void {
    const createUserController = this.container.get(
      'CreateUserController',
    ) as ControllerInterface
    const findUserController = this.container.get(
      'FindUserController',
    ) as ControllerInterface
    const findAllUserController = this.container.get(
      'FindAllUserController',
    ) as ControllerInterface
    const deleteUserController = this.container.get(
      'DeleteUserController',
    ) as ControllerInterface
    const updateUserController = this.container.get(
      'UpdateUserController',
    ) as ControllerInterface
    const archiveUserController = this.container.get(
      'ArchiveUserController',
    ) as ControllerInterface
    const activateUserController = this.container.get(
      'ActivateUserController',
    ) as ControllerInterface
    const changePasswordController = this.container.get(
      'ChangePasswordController',
    ) as ControllerInterface

    const userRouter = new UserRouter(
      createUserController,
      findUserController,
      findAllUserController,
      deleteUserController,
      updateUserController,
      archiveUserController,
      activateUserController,
      changePasswordController,
    )

    this.container.add('UserRouter', userRouter)
  }
}
