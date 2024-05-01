import { ConnectionInterface } from '@/adapters/database/connection.interface'
import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/useCases/create-user/create-user.use-case'
import { CreateUserUseCaseInterface } from '@/useCases/create-user/create-user.use-case-interface'
import { UserRepositoryInterface } from '@/repositories/user.repository-interface'
import { CreateUserController } from '@/adapters/http/users/create-user.controller'
import { UserRouter } from '@/adapters/http/users/user.router'
import { FindUserController } from '@/adapters/http/users/find-user.controller'
import { FindUserUseCase } from '@/useCases/find-user/find-user.use-case'
import { FindUserUseCaseInterface } from '@/useCases/find-user/find-user.use-case-interface'
import { ContainerWrapperInterface } from './container-wrapper.interface'

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

        this.container.add('CreateUserUseCase', createUserUseCase)
        this.container.add('FindUserUseCase', findUserUseCase)
    }

    private registerControllers(): void {
        const createUserUseCase = this.container.get('CreateUserUseCase') as CreateUserUseCaseInterface
        const findUserUseCase = this.container.get('FindUserUseCase') as FindUserUseCaseInterface
        const createUserController = new CreateUserController(createUserUseCase)
        const findUserController = new FindUserController(findUserUseCase)

        this.container.add('CreateUserController', createUserController)
        this.container.add('FindUserController', findUserController)
    }

    private registerRouter(): void {
        const createUserController = this.container.get('CreateUserController') as CreateUserController
        const findUserController = this.container.get('FindUserController') as FindUserController

        const userRouter = new UserRouter(createUserController, findUserController)

        this.container.add('UserRouter', userRouter)
    }
}
