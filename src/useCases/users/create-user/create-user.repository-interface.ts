import { UserDTO } from '@/entities/dto/user.dto'

export interface CreateUserRepositoryInterface {
  create(dto: UserDTO): Promise<void>
  existsByEmail(email: string): Promise<boolean>
}
