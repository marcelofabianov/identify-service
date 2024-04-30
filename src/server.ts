import fastify, { FastifyInstance } from 'fastify'

const app: FastifyInstance = fastify({ logger: false })

app.get('/', async (_, reply) => {
    reply.code(200).send({ message: 'Hello World' })
})

const serverStart = async () => {
    try {
        await app.listen({ port: 3333 })
        console.log('Server is running on http://localhost:3333')
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

export { app, serverStart }
