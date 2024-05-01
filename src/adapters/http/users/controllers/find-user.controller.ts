import { FastifyReply, FastifyRequest } from 'fastify'
import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
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
            responseError(error, reply)
        }
    }
}
