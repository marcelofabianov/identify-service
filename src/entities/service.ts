import { ServiceDTO } from './dto/service.dto'
import { ServiceInterface } from './service.interface'

export class Service implements ServiceInterface {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly description: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly archivedAt: Date | null,
    private readonly deletedAt: Date | null,
  ) {}

  static create(
    dto: ServiceDTO,
    deletedAt: Date | null = null,
  ): ServiceInterface {
    return new Service(
      dto.id,
      dto.name,
      dto.description,
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

  getDescription(): string {
    return this.description
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
