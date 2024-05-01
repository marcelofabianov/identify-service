import { FastifyInstance } from 'fastify'
import { CreateUserController } from './create-user.controller'
import { FindUserController } from './find-user.controller'
import { UserUriEnum } from './user-uri.enum'

export class UserRouter {
    constructor(
        private createUserController: CreateUserController,
        private findUserController: FindUserController,
    ) {}

    public register = (fastify: FastifyInstance, _: unknown, done: () => void): void => {
        this.defineRouter(fastify, _, done)
    }

    private defineRouter(fastify: FastifyInstance, _: unknown, done: () => void): void {
        fastify.post(UserUriEnum.CREATE_USER, (req, reply) => this.createUserController.handle(req, reply))
        fastify.get(UserUriEnum.FIND_USER, (req, reply) => this.findUserController.handle(req, reply))

        done()
    }
}
