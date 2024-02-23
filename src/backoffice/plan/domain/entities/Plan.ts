import { EntityProps, AggregateRoot, IdentityObject } from "@core/domain/models"
import { TodoCreatedDomainEvent, PlanCompletedDomainEvent } from "../events"
import { Todo, TodoStatuses } from "./Todo"
import { PlanName, TodoDescription } from "../value-objects"

interface Props extends EntityProps {
  name: PlanName
  todos?: Todo[]
}

export class Plan extends AggregateRoot {
  private _name: PlanName
  private _todos: Todo[]

  private constructor(props: Props) {
    super(props)
    this._name = props.name
    this._todos = props.todos || []
  }

  get name() {
    return this._name
  }

  get todos() {
    return this._todos
  }

  public static create(props: Props): Plan {
    return new Plan(props)
  }

  public static recreate(
    props: Props & Required<Pick<EntityProps, "createdAt">>
  ): Plan {
    return new Plan(props)
  }

  public updateName(name: PlanName) {
    this._name = name
    this.update()
  }

  public isCompleted(): boolean {
    return this.todos.every((t) => t.status === TodoStatuses.DONE)
  }

  public addTodo(id: IdentityObject, description: TodoDescription) {
    this.validateTodoDescription(description)
    const todo = new Todo({
      id,
      description,
      status: TodoStatuses.PENDING,
    })
    this._todos.push(todo)
    this.addDomainEvent(new TodoCreatedDomainEvent(todo))
    this.update()
  }

  public removeTodo(todoId: IdentityObject) {
    if (this.isCompleted()) {
      throw new Error("This Plan aggregation's lifecycle is completed")
    }
    const [idx, todo] = this.getTodo(todoId)
    todo.setStatus(TodoStatuses.REMOVED)
    this._todos.splice(idx, 1, todo)
    this.update()
  }

  public changeTodoDescription(
    todoId: IdentityObject,
    description: TodoDescription
  ) {
    this.validateTodoDescription(description)
    const [idx, todo] = this.getTodo(todoId)
    todo.setDescription(description)
    this._todos.splice(idx, 1, todo)
  }

  public markTodoAsDone(todoId: IdentityObject) {
    const [idx, todo] = this.getTodo(todoId)
    todo.setStatus(TodoStatuses.DONE)
    this._todos.splice(idx, 1, todo)
    this.checkCompleteness()
  }

  private checkCompleteness() {
    if (this.isCompleted()) {
      this.addDomainEvent(new PlanCompletedDomainEvent(this))
    }
  }

  private validateTodoDescription(description: TodoDescription) {
    const descriptionAlreadyExist = this.todos.some((t) =>
      t.description.isEqual(description)
    )
    if (descriptionAlreadyExist) {
      throw new Error(
        `Todo with the same description already exist: ${description.value}`
      )
    }
  }

  private getTodo(id: IdentityObject): [number, Todo] {
    const idx = this.todos.findIndex((t) => t.id.isEqual(id))
    if (idx === -1) {
      throw new Error(
        `Todo not found in current Plan aggregation <${this.id.value}>`
      )
    }
    return [idx, this.todos[idx]]
  }
}
