import { FastifyInstance } from 'fastify'
import { CreateUserController } from './create-user.controller'

export class UserRouter {
    constructor(private createUserController: CreateUserController) {}

    public register = (fastify: FastifyInstance, _: unknown, done: () => void): void => {
        this.defineRouter(fastify, _, done)
    }

    private defineRouter(fastify: FastifyInstance, _: unknown, done: () => void): void {
        fastify.post('/', (req, reply) => this.createUserController.handle(req, reply))

        done()
    }
}
