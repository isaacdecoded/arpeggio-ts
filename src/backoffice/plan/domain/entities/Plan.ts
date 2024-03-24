import {
  EntityProps,
  AggregateRoot,
  IdentityObject,
  DateObject,
} from "@core/domain/models"
import {
  PlanCreatedDomainEvent,
  PlanCompletedDomainEvent,
  TodoAddedDomainEvent,
} from "../events"
import { Todo } from "./Todo"
import { PlanName, TodoDescription } from "../value-objects"
import { TodoStatus } from "../enums"

interface Props extends EntityProps<IdentityObject> {
  name: PlanName
  todos: Todo[]
}

interface CreateProps {
  id: IdentityObject
  name: PlanName
}

export class Plan extends AggregateRoot<IdentityObject> {
  private _name: PlanName
  private _todos: Todo[]

  private constructor(props: Props) {
    super(props)
    this._name = props.name
    this._todos = props.todos
  }

  get name() {
    return this._name
  }

  get todos() {
    return this._todos
  }

  public static create(props: CreateProps): Plan {
    const plan = new Plan({
      id: props.id,
      name: props.name,
      todos: [],
      createdAt: DateObject.now(),
    })
    plan.addDomainEvent(new PlanCreatedDomainEvent(plan))
    return plan
  }

  public static recreate(props: Props): Plan {
    return new Plan(props)
  }

  public changeName(name: PlanName) {
    this._name = name
    this.update(DateObject.now())
  }

  public addTodo(id: IdentityObject, description: TodoDescription) {
    this.validateDescriptionDuplication(description)
    const todo = new Todo({
      id,
      description,
      status: TodoStatus.PENDING,
      createdAt: DateObject.now(),
    })
    this._todos.push(todo)
    this.addDomainEvent(new TodoAddedDomainEvent(todo))
    this.update(DateObject.now())
  }

  public removeTodo(todoId: IdentityObject) {
    if (this.isCompleted()) {
      throw new Error("This Plan aggregation's lifecycle is completed")
    }
    const [idx, todo] = this.getTodo(todoId)
    todo.changeStatus(TodoStatus.REMOVED)
    this._todos.splice(idx, 1, todo)
    this.update(DateObject.now())
  }

  public changeTodoDescription(
    todoId: IdentityObject,
    description: TodoDescription,
  ) {
    this.validateDescriptionDuplication(description)
    const [idx, todo] = this.getTodo(todoId)
    todo.changeDescription(description)
    this._todos.splice(idx, 1, todo)
  }

  public markTodoAsDone(todoId: IdentityObject) {
    const [idx, todo] = this.getTodo(todoId)
    todo.changeStatus(TodoStatus.DONE)
    this._todos.splice(idx, 1, todo)
    this.checkCompleteness()
  }

  public isCompleted(): boolean {
    return this.todos.every((t) => t.status === TodoStatus.DONE)
  }

  private checkCompleteness() {
    if (this.isCompleted()) {
      this.addDomainEvent(new PlanCompletedDomainEvent(this))
    }
  }

  private validateDescriptionDuplication(description: TodoDescription) {
    const descriptionAlreadyExist = this.todos.some((t) =>
      t.description.isEqual(description),
    )
    if (descriptionAlreadyExist) {
      throw new Error(
        `Todo with the same description already exist: ${description.value}`,
      )
    }
  }

  private getTodo(id: IdentityObject): [number, Todo] {
    const idx = this.todos.findIndex((t) => t.id.isEqual(id))
    if (idx === -1) {
      throw new Error(
        `Todo not found in current Plan aggregation <${this.id.value}>`,
      )
    }
    return [idx, this.todos[idx]]
  }
}
