import { Container } from './containers/container'
import { serverStart } from './server'
import { UserContainer } from './containers/user.container'
import { Connection } from './adapters/database/connection'
import { PrismaClient } from '@prisma/client'

async function main(): Promise<void> {
    const conn = new Connection(new PrismaClient())

    const container = new Container()
    container.add('Connection', conn)

    const userContainer = new UserContainer(container)
    userContainer.register()

    serverStart(container)
}

main()
