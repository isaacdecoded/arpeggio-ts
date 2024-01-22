import { ValueObject } from "@core/domain/entities"

export enum TodoStatuses {
  ARCHIVED = "ARCHIVED",
  DONE = "DONE",
  REMOVED = "REMOVED",
}

export class TodoStatus extends ValueObject<TodoStatuses> {}
