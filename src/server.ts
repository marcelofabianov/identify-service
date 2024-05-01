import { ContainerWrapperInterface } from './containers/container-wrapper.interface'
import fastify, { FastifyInstance } from 'fastify'
import { env } from './env'
import { RouterInterface } from './adapters/http/router.interface'

const app: FastifyInstance = fastify({ logger: false })

const serverStart = async (container: ContainerWrapperInterface) => {
    const userRouter = container.get('UserRouter') as RouterInterface
    app.register(userRouter.register)

    app.get('/', async (_, reply) => {
        reply.code(200).send({ message: 'API' })
    })

    if (env.NODE_ENV !== 'test') {
        try {
            await app.listen({ port: env.API_PORT })
            console.log('Server is running on http://localhost:3333')
        } catch (error) {
            console.error('Error on start server', error)
            process.exit(1)
        }
    }

    return app
}

export { app, serverStart }
