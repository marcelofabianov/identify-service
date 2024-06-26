import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
import { FastifyReply, FastifyRequest } from 'fastify'

import { FindUserUseCaseInterface } from '@/useCases/users/find-user/find-user.use-case-interface'

export class FindUserController implements ControllerInterface {
  constructor(private readonly useCase: FindUserUseCaseInterface) {}

  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const user = await this.useCase.execute(id)
      reply.code(200).send(user)
    } catch (error) {
      responseError(error, reply)
    }
  }
}
