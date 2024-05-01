import { PrismaClient } from '@prisma/client'
import { DatabaseInterface } from './database.interface'

export class Database implements DatabaseInterface {
    constructor(private db: PrismaClient) {}

    get(): PrismaClient {
        return this.db
    }
}
