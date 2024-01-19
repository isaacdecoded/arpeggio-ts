import { Criteria } from "@core/domain/repositories"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { TodosNotFoundError } from "../errors"
import { FindTodosRepository } from "../../domain/repositories"

export interface FindTodosInputData {
  name?: string
  offset: number
  limit: number
}

export interface FindTodosReadModel {
  id: string
  name: string
  createdAt?: Date
}

export type FindTodosReadCriteria = Criteria<FindTodosReadModel>

export interface FindTodosOutputData {
  todos: FindTodosReadModel[]
}

export class FindTodosUseCase implements UseCaseInputPort<FindTodosInputData> {
  constructor(
    private todoRepository: FindTodosRepository<
      FindTodosReadCriteria,
      FindTodosReadModel[]
    >,
    private outputPort: UseCaseOutputPort<FindTodosOutputData>
  ) {}

  public async interact({
    name,
    offset,
    limit,
  }: FindTodosInputData): Promise<void> {
    try {
      const criteria: FindTodosReadCriteria = {
        filters: [],
        limit,
        offset,
        selection: ["id", "name"],
        sort: { field: "createdAt", order: "desc" },
      }
      if (name) {
        criteria.filters.push({
          field: "name",
          operator: "contains",
          value: name,
        })
      }
      const todos = await this.todoRepository.find(criteria)
      return this.outputPort.success({ todos })
    } catch (e) {
      return this.outputPort.failure(new TodosNotFoundError(e as string))
    }
  }
}
