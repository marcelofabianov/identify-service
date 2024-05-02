import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
import { FastifyReply, FastifyRequest } from 'fastify'

import { DeleteUserUseCaseInterface } from '@/useCases/users/delete-user/delete-user.use-case-interface'

export class DeleteUserController implements ControllerInterface {
  constructor(private readonly useCase: DeleteUserUseCaseInterface) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      await this.useCase.execute(id)
      reply.code(204).send()
    } catch (error) {
      responseError(error, reply)
    }
  }
}
