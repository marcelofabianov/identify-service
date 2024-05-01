import fastify, { FastifyInstance } from 'fastify'
import { UserRouter } from './adapters/http/users/user.router'
import { Container } from './containers/container'

const serverStart = async (container: Container) => {
    const app: FastifyInstance = fastify({ logger: false })

    registerRouters(app, container)

    app.get('/', async (_, reply) => {
        reply.code(200).send({ message: 'API' })
    })

    try {
        await app.listen({ port: 3333 })
        console.log('Server is running on http://localhost:3333')
    } catch (error) {
        console.error('Error on start server', error)
        process.exit(1)
    }
}

function registerRouters(app: FastifyInstance, container: Container): Container {
    const userRouter = container.get('UserRouter') as UserRouter
    app.register(userRouter.register, { prefix: '/api/users' })

    return container
}

export { serverStart }
