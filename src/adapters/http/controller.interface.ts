import { FastifyReply, FastifyRequest } from 'fastify'

export interface ControllerInterface {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<void>
}
