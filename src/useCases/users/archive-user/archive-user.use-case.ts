import { ArchiveUserRepositoryInterface } from './archive-user.repository-interface'
import { ArchiveUserUseCaseInterface } from './archive-user.use-case-interface'

export class ArchiveUserUseCase implements ArchiveUserUseCaseInterface {
    constructor(private readonly repository: ArchiveUserRepositoryInterface) {}

    async execute(id: string): Promise<void> {
        await this.repository.archive(id)
    }
}
