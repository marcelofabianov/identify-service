import { PrismaClient } from '@prisma/client'

import { ConnectionInterface } from './connection.interface'

export class Connection implements ConnectionInterface {
  constructor(private db: PrismaClient) {}

  get(): PrismaClient {
    return this.db
  }
}
