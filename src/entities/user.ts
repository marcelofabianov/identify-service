import { UserDTO } from './dto/user.dto'
import { UserInterface } from './user.interface'

export class User implements UserInterface {
    private constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly email: string,
        private readonly password: string,
        private readonly role: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date,
        private readonly archivedAt: Date | null,
        private readonly deletedAt: Date | null,
    ) {}

    static create(dto: UserDTO, deletedAt: Date | null = null): User {
        return new User(
            dto.id,
            dto.name,
            dto.email,
            dto.password,
            dto.role,
            dto.createdAt,
            dto.updatedAt,
            dto.archivedAt,
            deletedAt,
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

    getRole(): string {
        return this.role
    }

    getCreatedAt(): Date {
        return this.createdAt
    }

    getUpdatedAt(): Date {
        return this.updatedAt
    }

    getArchivedAt(): Date | null {
        return this.archivedAt
    }

    getDeletedAt(): Date | null {
        return this.deletedAt
    }
}
