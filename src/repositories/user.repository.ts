import { UserDTO } from '@/entities/dto/user.dto'
import { UserRepositoryInterface } from './user.repository-interface'
import { DatabaseInterface } from '@/adapters/database.interface'

export class UserRepository implements UserRepositoryInterface {
    constructor(private readonly db: DatabaseInterface) {}

    async create(dto: UserDTO): Promise<void> {
        const db = this.db.get()

        await db.user.create({ data: dto })
    }
}
