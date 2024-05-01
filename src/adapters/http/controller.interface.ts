import { FastifyReply, FastifyRequest } from 'fastify'

export interface ControllerInterface<T> {
    handle(request: FastifyRequest, reply: FastifyReply): Promise<T>
}
