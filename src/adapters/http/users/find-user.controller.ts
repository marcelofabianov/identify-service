import { ControllerInterface } from '../controller.interface'
import { ErrorHandle } from '@/errors/error-handle'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserRepositoryInterface } from '@/repositories/user.repository-interface'
import { UserUriEnum } from './user-uri.enum'

type Params = {
    id: string
}

export class FindUserController implements ControllerInterface {
    constructor(private readonly repository: UserRepositoryInterface) {}

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { id } = request.params as Params
            const user = await this.repository.findById(id)
            reply.code(200).send(user)
        } catch (error) {
            if (error instanceof ErrorHandle) {
                reply.code(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                reply.code(500).send({
                    message: 'Internal server error',
                    uri: UserUriEnum.FIND_USER,
                })
            }
        }
    }
}
