import { Container } from './containers/container'
import { serverStart } from './server'
import { UserContainer } from './containers/user.container'
import { Database } from './adapters/database'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CreateUserUseCaseInterface } from './useCases/create-user/create-user.use-case-interface'

async function main(): Promise<void> {
    const db = new Database(new PrismaClient())

    const container = new Container()
    container.add('Database', db)

    const userContainer = new UserContainer(container)
    userContainer.register()

    const createUserUseCase = container.get('CreateUserUseCase') as CreateUserUseCaseInterface

    await createUserUseCase.execute({
        id: randomUUID(),
        name: 'Marcelo',
        email: 'marcelo@email.com',
        password: '12345678',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        archivedAt: null,
    })

    serverStart()
}

main()
