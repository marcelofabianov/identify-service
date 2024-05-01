import { DatabaseInterface } from '@/adapters/database.interface'
import { Container } from './container'
import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/useCases/create-user/create-user.use-case'

export class UserContainer {
    constructor(private container: Container) {}

    public register(): void {
        const db = this.container.get('Database') as DatabaseInterface
        const userRepository = new UserRepository(db)
        const createUserUseCase = new CreateUserUseCase(userRepository)

        this.container.add('UserRepository', userRepository)
        this.container.add('CreateUserUseCase', createUserUseCase)
    }
}
