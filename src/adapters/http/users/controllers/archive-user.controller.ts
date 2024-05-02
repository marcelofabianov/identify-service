import { ArchiveUserUseCaseInterface } from '@/useCases/users/archive-user/archive-user.use-case-interface'
import { ControllerInterface } from '@http/controller.interface'
import { FastifyReply, FastifyRequest } from 'fastify'
import { responseError } from '@http/response-error'

export class ArchiveUserController implements ControllerInterface {
  constructor(private readonly useCase: ArchiveUserUseCaseInterface) {}

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
