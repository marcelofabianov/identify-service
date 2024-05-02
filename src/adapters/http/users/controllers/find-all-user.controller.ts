import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
import { FastifyReply, FastifyRequest } from 'fastify'

import { FindAllUserUseCaseInterface } from '@/useCases/users/find-all-user/find-all-user.use-case-interface'

export class FindAllUserController implements ControllerInterface {
  constructor(private readonly useCase: FindAllUserUseCaseInterface) {}

  public async handle(_: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const users = await this.useCase.execute()
      reply.code(200).send(users)
    } catch (error) {
      responseError(error, reply)
    }
  }
}
