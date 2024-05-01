import { FastifyRequest, FastifyReply } from 'fastify'
import { ControllerInterface } from '../controller.interface'
import { CreateUserRequest } from '@/adapters/http/users/create-user.request'
import { CreateUserUseCaseInterface } from '@/useCases/create-user/create-user.use-case-interface'
import { ErrorHandle } from '@/errors/error-handle'
import { UserUriEnum } from './user-uri.enum'

export class CreateUserController implements ControllerInterface {
    constructor(private readonly useCase: CreateUserUseCaseInterface) {}

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const body = request.body as CreateUserRequest
            const user = await this.useCase.execute(body)
            reply.code(201).send(user)
        } catch (error) {
            if (error instanceof ErrorHandle) {
                reply.code(error.statusCode).send({ message: error.message })
            }
            if (error instanceof Error) {
                reply.code(500).send({
                    error: 'Internal server error',
                    uri: UserUriEnum.CREATE_USER,
                    statusCode: 500,
                })
            }
        }
    }
}
