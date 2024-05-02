import { UserDTO } from '@/entities/dto/user.dto'
import { UserInterface } from '@/entities/user.interface'

export interface UpdateUserRepositoryInterface {
  findById(id: string): Promise<UserInterface | null>
  update: (id: string, dto: UserDTO) => Promise<void>
}
