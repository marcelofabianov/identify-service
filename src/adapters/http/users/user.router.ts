import { FastifyInstance } from 'fastify'
import { UserUriEnum } from './user-uri.enum'
import { RouterInterface } from '../router.interface'
import { ControllerInterface } from '../controller.interface'

export class UserRouter implements RouterInterface {
    constructor(
        private createUserController: ControllerInterface,
        private findUserController: ControllerInterface,
        private findAllUserController: ControllerInterface,
    ) {}

    public register = (fastify: FastifyInstance, _: unknown, done: () => void): void => {
        fastify.post(UserUriEnum.CREATE_USER, (req, reply) => this.createUserController.handle(req, reply))
        fastify.get(UserUriEnum.FIND_USER, (req, reply) => this.findUserController.handle(req, reply))
        fastify.get(UserUriEnum.FIND_ALL_USER, (req, reply) => this.findAllUserController.handle(req, reply))

        done()
    }
}
