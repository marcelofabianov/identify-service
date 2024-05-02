import { PrismaClient } from '@prisma/client'

export interface ConnectionInterface {
  get(): PrismaClient
}
