import { FastifyRequest, FastifyReply } from 'fastify'
import { ControllerInterface } from '../controller.interface'
import { CreateUserRequest } from '@/useCases/create-user/create-user.request'
import { CreateUserUseCaseInterface } from '@/useCases/create-user/create-user.use-case-interface'

export class CreateUserController implements ControllerInterface<void> {
    constructor(private readonly useCase: CreateUserUseCaseInterface) {}

    public async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const body = request.body as CreateUserRequest
            await this.useCase.execute(body)
            reply.code(201).send()
        } catch (error) {
            reply.code(500).send({ message: error.message })
        }
    }
}
