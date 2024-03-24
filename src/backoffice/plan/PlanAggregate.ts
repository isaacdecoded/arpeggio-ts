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
  SendNotificationOnPlanCreatedSubscriber,
  SendNotificationOnPlanCompletedSubscriber,
  SendNotificationOnTodoAddedSubscriber,
} from "./application/subscribers"
import {
  InMemoryFindPlansRepository,
  InMemoryGetPlanRepository,
  InMemoryPlanRepository,
} from "./infrastructure/repositories"
import { OnScreenNotificationService } from "./infrastructure/services"

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

  private readonly findPlansRepository = new InMemoryFindPlansRepository()
  private readonly getPlanRepository = new InMemoryGetPlanRepository()
  private readonly planRepository = new InMemoryPlanRepository()
  private readonly notificationService = new OnScreenNotificationService()

  constructor(domainEventBus: DomainEventBus) {
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

    domainEventBus.addSubscribers([
      new SendNotificationOnPlanCreatedSubscriber(this.notificationService),
      new SendNotificationOnPlanCompletedSubscriber(this.notificationService),
      new SendNotificationOnTodoAddedSubscriber(this.notificationService),
    ])
  }
}
