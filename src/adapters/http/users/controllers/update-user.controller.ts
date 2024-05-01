import { UpdateUserUseCaseInterface } from '@/useCases/users/update-user/update-user.use-case-interface'
import { ControllerInterface } from '@http/controller.interface'
import { FastifyReply, FastifyRequest } from 'fastify'
import { updateUserRequestSchema } from '../requests/update-user.request'
import { responseError } from '@http/response-error'

export class UpdateUserController implements ControllerInterface {
    constructor(private readonly useCase: UpdateUserUseCaseInterface) {}

    async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { id } = request.params as { id: string }
            const body = updateUserRequestSchema.parse(request.body)
            const user = await this.useCase.execute({ id, ...body })
            reply.code(200).send(user)
        } catch (error) {
            responseError(error, reply)
        }
    }
}
