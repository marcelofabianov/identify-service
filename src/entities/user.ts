import { UserDTO } from './dto/user.dto'
import { UserInterface } from './user.interface'

export class User implements UserInterface {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly email: string,
        private readonly password: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly deletedAt: Date | null,
        private readonly archivedAt: Date | null,
    ) {}

    static create(dto: UserDTO): User {
        return new User(
            dto.id,
            dto.name,
            dto.email,
            dto.password,
            dto.createdAt,
            dto.updatedAt,
            dto.deletedAt,
            dto.archivedAt,
        )
    }

    getId(): string {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    getPassword(): string {
        return this.password
    }

    getCreatedAt(): Date {
        return this.createdAt
    }

    getUpdatedAt(): Date {
        return this.updatedAt
    }

    getDeletedAt(): Date | null {
        return this.deletedAt
    }

    getArchivedAt(): Date | null {
        return this.archivedAt
    }
}
