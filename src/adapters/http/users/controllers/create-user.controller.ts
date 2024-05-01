import { FastifyRequest, FastifyReply } from 'fastify'
import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
import { createUserRequestSchema } from '@http/users/requests/create-user.request'
import { CreateUserUseCaseInterface } from '@/useCases/create-user/create-user.use-case-interface'
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
