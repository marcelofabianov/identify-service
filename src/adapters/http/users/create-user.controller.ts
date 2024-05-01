import { FastifyRequest, FastifyReply } from 'fastify'
import { ControllerInterface } from '../controller.interface'
import { createUserRequestSchema } from '@/adapters/http/users/create-user.request'
import { CreateUserUseCaseInterface } from '@/useCases/create-user/create-user.use-case-interface'
import { responseError } from '../response-error'

export class CreateUserController implements ControllerInterface {
    constructor(private readonly useCase: CreateUserUseCaseInterface) {}

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const body = createUserRequestSchema.parse(request.body)
            const user = await this.useCase.execute(body)
            reply.code(201).send(user)
        } catch (error) {
            responseError(error, reply)
        }
    }
}
