import { ContainerWrapper } from './containers/container-wrapper'
import { serverStart } from './server'
import { UserContainer } from './containers/user.container'
import { Connection } from './adapters/database/connection'
import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { ServiceContainer } from './containers/service.container'

const conn = new Connection(new PrismaClient())

const containerWrapper = new ContainerWrapper()

containerWrapper.add('Connection', conn)

const serviceContainer = new ServiceContainer(containerWrapper)
serviceContainer.register()

const userContainer = new UserContainer(containerWrapper)
userContainer.register()

const appPromise: Promise<FastifyInstance> = serverStart(containerWrapper)

appPromise
    .then((fastifyInstance: FastifyInstance) => {
        module.exports = { app: fastifyInstance }
    })
    .catch((error) => {
        throw new Error(error)
    })
