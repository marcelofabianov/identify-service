import { ControllerInterface } from '@http/controller.interface'
import { responseError } from '@http/response-error'
import { FastifyReply, FastifyRequest } from 'fastify'

import { ChangePasswordUseCaseInterface } from '@/useCases/users/change-password/change-password.use-case-interface'

import { changePasswordRequestSchema } from '../requests/change-password.request'

export class ChangePasswordController implements ControllerInterface {
  constructor(private readonly useCase: ChangePasswordUseCaseInterface) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const body = changePasswordRequestSchema.parse(request.body)
      await this.useCase.execute({ id, ...body })
      reply.code(204).send()
    } catch (error) {
      responseError(error, reply)
    }
  }
}
