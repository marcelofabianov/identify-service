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

export class UserContainer {
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
        const userRepository = this.container.get('UserRepository') as UserRepositoryInterface
        const createUserUseCase = new CreateUserUseCase(userRepository)
        const findUserUseCase = new FindUserUseCase(userRepository)
        const findAllUserUseCase = new FindAllUserUseCase(userRepository)
        const deleteUserUseCase = new DeleteUserUseCase(userRepository)

        this.container.add('CreateUserUseCase', createUserUseCase)
        this.container.add('FindUserUseCase', findUserUseCase)
        this.container.add('FindAllUserUseCase', findAllUserUseCase)
        this.container.add('DeleteUserUseCase', deleteUserUseCase)
    }

    private registerControllers(): void {
        const createUserUseCase = this.container.get('CreateUserUseCase') as CreateUserUseCaseInterface
        const findUserUseCase = this.container.get('FindUserUseCase') as FindUserUseCaseInterface
        const findAllUserUseCase = this.container.get('FindAllUserUseCase') as FindAllUserUseCaseInterface
        const deleteUserUseCase = this.container.get('DeleteUserUseCase') as DeleteUserUseCase

        const createUserController = new CreateUserController(createUserUseCase)
        const findUserController = new FindUserController(findUserUseCase)
        const findAllUserController = new FindAllUserController(findAllUserUseCase)
        const deleteUserController = new DeleteUserController(deleteUserUseCase)

        this.container.add('CreateUserController', createUserController)
        this.container.add('FindUserController', findUserController)
        this.container.add('FindAllUserController', findAllUserController)
        this.container.add('DeleteUserController', deleteUserController)
    }

    private registerRouter(): void {
        const createUserController = this.container.get('CreateUserController') as ControllerInterface
        const findUserController = this.container.get('FindUserController') as ControllerInterface
        const findAllUserController = this.container.get('FindAllUserController') as ControllerInterface
        const deleteUserController = this.container.get('DeleteUserController') as ControllerInterface

        const userRouter = new UserRouter(
            createUserController,
            findUserController,
            findAllUserController,
            deleteUserController,
        )

        this.container.add('UserRouter', userRouter)
    }
}
