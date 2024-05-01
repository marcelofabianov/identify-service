import { UserDTO } from '@/entities/dto/user.dto'
import { UserRepositoryInterface } from './user.repository-interface'
import { ConnectionInterface } from '@/adapters/database/connection.interface'
import { UserErrorEnum } from '@/errors/user.error-enum'

export class UserRepository implements UserRepositoryInterface {
    constructor(private readonly db: ConnectionInterface) {}

    async create(dto: UserDTO): Promise<void> {
        try {
            const db = this.db.get()
            await db.user.create({ data: dto })
        } catch (error) {
            throw new Error(UserErrorEnum.CREATE_USER)
        }
    }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            const db = this.db.get()

            const user = await db.user.findUnique({
                where: {
                    email,
                },
            })

            return !!user
        } catch (error) {
            console.log(error)
            throw new Error(UserErrorEnum.FIND_USER_BY_EMAIL)
        }
    }
}
