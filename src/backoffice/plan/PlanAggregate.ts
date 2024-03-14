import { DomainEventBus } from "@core/domain/events"
import {
  CreatePlanController,
  FindPlansController,
  GetPlanController,
  AddTodoController,
  UpdateTodoController,
  RemoveTodoController,
  CheckTodoController,
} from "./adapters/controllers"
import {
  CreatePlanPresenter,
  FindPlansPresenter,
  GetPlanPresenter,
  AddTodoPresenter,
} from "./adapters/presenters"
import {
  CreatePlanUseCase,
  AddTodoUseCase,
  UpdateTodoUseCase,
  RemoveTodoUseCase,
  CheckTodoUseCase,
} from "./application/commands"
import { FindPlansUseCase, GetPlanUseCase } from "./application/queries"
import {
  InMemoryFindPlansRepository,
  InMemoryGetPlanRepository,
  InMemoryPlanRepository,
} from "./infrastructure/repositories"

export class PlanAggregate {
  public readonly createPlanController: CreatePlanController
  public readonly findPlansController: FindPlansController
  public readonly getPlanController: GetPlanController
  public readonly addTodoController: AddTodoController
  public readonly updateTodoController: UpdateTodoController
  public readonly removeTodoController: RemoveTodoController
  public readonly checkTodoController: CheckTodoController
  public caughtPlanId = ""
  public caughtTodoId = ""

  private readonly findPlansRepository: InMemoryFindPlansRepository
  private readonly getPlanRepository: InMemoryGetPlanRepository
  private readonly planRepository: InMemoryPlanRepository

  constructor(domainEventBus: DomainEventBus) {
    this.findPlansRepository = new InMemoryFindPlansRepository()
    this.getPlanRepository = new InMemoryGetPlanRepository()
    this.planRepository = new InMemoryPlanRepository()
    this.findPlansController = new FindPlansController(
      new FindPlansUseCase(this.findPlansRepository, new FindPlansPresenter()),
    )
    this.getPlanController = new GetPlanController(
      new GetPlanUseCase(this.getPlanRepository, new GetPlanPresenter()),
    )
    this.addTodoController = new AddTodoController(
      new AddTodoUseCase(
        this.planRepository,
        domainEventBus,
        new AddTodoPresenter((id) => (this.caughtTodoId = id)),
      ),
    )
    this.createPlanController = new CreatePlanController(
      new CreatePlanUseCase(
        this.planRepository,
        domainEventBus,
        new CreatePlanPresenter((id) => (this.caughtPlanId = id)),
      ),
    )
    this.updateTodoController = new UpdateTodoController(
      new UpdateTodoUseCase(this.planRepository),
    )
    this.removeTodoController = new RemoveTodoController(
      new RemoveTodoUseCase(this.planRepository),
    )
    this.checkTodoController = new CheckTodoController(
      new CheckTodoUseCase(this.planRepository, domainEventBus),
    )
  }
}
