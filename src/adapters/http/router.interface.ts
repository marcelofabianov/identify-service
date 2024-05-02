import { FastifyInstance } from 'fastify'

export interface RouterInterface {
  register(fastify: FastifyInstance, _: unknown, done: () => void): void
}
