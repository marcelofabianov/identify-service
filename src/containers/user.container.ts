import { ConnectionInterface } from '@/adapters/database/connection.interface'
import { Container } from './container'
import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/useCases/create-user/create-user.use-case'
import { CreateUserUseCaseInterface } from '@/useCases/create-user/create-user.use-case-interface'
import { UserRepositoryInterface } from '@/repositories/user.repository-interface'
import { CreateUserController } from '@/adapters/http/users/create-user.controller'
import { UserRouter } from '@/adapters/http/users/user.router'

export class UserContainer {
    constructor(private container: Container) {}

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

        this.container.add('CreateUserUseCase', createUserUseCase)
    }

    private registerControllers(): void {
        const createUserUseCase = this.container.get('CreateUserUseCase') as CreateUserUseCaseInterface
        const createUserController = new CreateUserController(createUserUseCase)

        this.container.add('CreateUserController', createUserController)
    }

    private registerRouter(): void {
        const createUserController = this.container.get('CreateUserController') as CreateUserController
        const userRouter = new UserRouter(createUserController)

        this.container.add('UserRouter', userRouter)
    }
}
