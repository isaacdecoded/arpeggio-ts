import { Criteria } from "@core/domain/repositories"

export interface FindPlansRepository<ReadModel> {
  find(criteria: Criteria<ReadModel>): Promise<ReadModel[]>
}
