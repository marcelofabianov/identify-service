import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'

import { Connection } from './adapters/database/connection'
import { ContainerWrapper } from './containers/container-wrapper'
import { ServiceContainer } from './containers/service.container'
import { UserContainer } from './containers/user.container'
import { serverStart } from './server'

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
