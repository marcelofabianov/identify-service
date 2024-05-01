import { UserDTO } from '@/entities/dto/user.dto'
import { UserRepositoryInterface } from './user.repository-interface'
import { ConnectionInterface } from '@/adapters/database/connection.interface'
import { UserErrorEnum } from '@/errors/user.error-enum'
import { ErrorHandle } from '@/errors/error-handle'
import { UserInterface } from '@/entities/user.interface'
import { User } from '@/entities/user'

export class UserRepository implements UserRepositoryInterface {
    constructor(private readonly db: ConnectionInterface) {}

    async create(dto: UserDTO): Promise<void> {
        try {
            const db = this.db.get()
            await db.user.create({ data: dto })
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.CREATE_USER)
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
            throw new ErrorHandle(500, UserErrorEnum.EXISTS_USER_BY_EMAIL)
        }
    }

    async findById(id: string): Promise<UserInterface | null> {
        try {
            const db = this.db.get()

            const user = await db.user.findUnique({
                where: {
                    id,
                },
            })

            if (!user) {
                return new Promise((resolve) => resolve(null))
            }

            const dto = {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            } as UserDTO

            return Promise.resolve(User.create(dto))
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.FIND_USER_BY_ID)
        }
    }

    async findAll(): Promise<UserInterface[]> {
        try {
            const db = this.db.get()

            const users = await db.user.findMany()

            return users.map((user) => {
                const dto = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                } as UserDTO

                return User.create(dto)
            })
        } catch (error) {
            throw new ErrorHandle(500, UserErrorEnum.FIND_ALL_USERS)
        }
    }
}
