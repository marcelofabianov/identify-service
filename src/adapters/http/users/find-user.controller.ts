import { ControllerInterface } from '../controller.interface'
import { ErrorHandle } from '@/errors/error-handle'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserUriEnum } from './user-uri.enum'
import { FindUserUseCaseInterface } from '@/useCases/find-user/find-user.use-case-interface'

type Params = {
    id: string
}

export class FindUserController implements ControllerInterface {
    constructor(private readonly useCase: FindUserUseCaseInterface) {}

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { id } = request.params as Params
            const user = await this.useCase.execute(id)
            reply.code(200).send(user)
        } catch (error) {
            if (error instanceof ErrorHandle) {
                reply.code(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                reply.code(500).send({
                    error: 'Internal server error',
                    uri: UserUriEnum.FIND_USER,
                    statusCode: 500,
                })
            }
        }
    }
}
