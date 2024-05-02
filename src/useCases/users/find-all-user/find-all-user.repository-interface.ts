import { UserInterface } from '@/entities/user.interface'

export interface FindAllUserRepositoryInterface {
  findAll(): Promise<UserInterface[]>
}
