import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ActivateUserUseCaseInterface } from '@/useCases/users/activate-user/activate-user.use-case-interface'

export class ActivateUserController implements ControllerInterface {
  constructor(private readonly useCase: ActivateUserUseCaseInterface) {}

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
