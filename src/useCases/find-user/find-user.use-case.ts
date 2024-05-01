import { ErrorHandle } from '@/errors/ErrorHandle'
import { FindUserRepositoryInterface } from './find-user.repository-interface'
import { FindUserResponseInterface } from './find-user.response-interface'
import { FindUserUseCaseInterface } from './find-user.use-case-interface'

export class FindUserUseCase implements FindUserUseCaseInterface {
    constructor(private readonly repository: FindUserRepositoryInterface) {}

    public async execute(id: string): Promise<FindUserResponseInterface> {
        const user = await this.repository.findById(id)

        if (!user) {
            throw new ErrorHandle(404, 'User not found')
        }

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
            archivedAt: user.getArchivedAt(),
        }
    }
}
