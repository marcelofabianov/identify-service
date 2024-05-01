import { PrismaClient } from '@prisma/client'

export interface DatabaseInterface {
    get(): PrismaClient
}
