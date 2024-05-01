import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { ErrorHandle } from '@/errors/error-handle'

export function responseError(error: unknown, reply: FastifyReply) {
    if (error instanceof ZodError) {
        reply.code(400).send({
            error: 'Bad Request',
            message: error.errors,
            statusCode: 400,
        })
    }
    if (error instanceof ErrorHandle) {
        reply.code(error.statusCode).send({ message: error.message })
    }

    reply.code(500).send({
        error: 'Internal server error',
        statusCode: 500,
    })
}
