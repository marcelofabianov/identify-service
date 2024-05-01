import fastify, { FastifyInstance } from 'fastify'
import { Container } from './containers/container'
import { env } from './env'
import { RouterInterface } from './adapters/http/router.interface'

const app: FastifyInstance = fastify({ logger: false })

const serverStart = async (container: Container) => {
    registerRouters(app, container)

    app.get('/', async (_, reply) => {
        reply.code(200).send({ message: 'API' })
    })

    try {
        await app.listen({ port: env.API_PORT })
        console.log('Server is running on http://localhost:3333')
    } catch (error) {
        console.error('Error on start server', error)
        process.exit(1)
    }
}

function registerRouters(app: FastifyInstance, container: Container): Container {
    const userRouter = container.get('UserRouter') as RouterInterface
    app.register(userRouter.register)

    return container
}

export { app, serverStart }
