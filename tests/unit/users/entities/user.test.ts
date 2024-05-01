import { randomUUID } from 'crypto'
import { describe, test, expect } from 'vitest'
import { UserDTO } from '@/entities/dto/user.dto'
import { User } from '@/entities/user'

describe('Entity: User', () => {
    test('Deve criar um Usuario e retornar seus atributos por getters', () => {
        const dto = {
            id: randomUUID(),
            name: 'Marcelo',
            email: 'marcelo@email.com',
            password: '12345678',
            role: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date(),
            archivedAt: null,
            deletedAt: null,
        } as UserDTO

        const user = User.create(dto)

        expect(user.getId()).toBe(dto.id)
        expect(user.getName()).toBe(dto.name)
        expect(user.getEmail()).toBe(dto.email)
        expect(user.getPassword()).toBe(dto.password)
        expect(user.getRole()).toBe(dto.role)
        expect(user.getCreatedAt()).toBe(dto.createdAt)
        expect(user.getUpdatedAt()).toBe(dto.updatedAt)
        expect(user.getArchivedAt()).toBe(dto.archivedAt)
        expect(user.getDeletedAt()).toBe(dto.deletedAt)
    })
})
