import "module-alias/register"

import { InMemoryDomainEventBus } from "@core/infrastructure"
import {
  CreatePlanUseCase,
  AddTodoUseCase,
  UpdateTodoUseCase,
  RemoveTodoUseCase,
  CheckTodoUseCase,
} from "@backoffice/plan/application/commands"
import {
  FindPlansUseCase,
  GetPlanUseCase,
} from "@backoffice/plan/application/queries"
import {
  CreatePlanController,
  FindPlansController,
  GetPlanController,
  AddTodoController,
  UpdateTodoController,
  RemoveTodoController,
  CheckTodoController,
} from "@backoffice/plan/adapters/controllers"
import {
  CreatePlanPresenter,
  FindPlansPresenter,
  GetPlanPresenter,
  AddTodoPresenter,
  UpdateTodoPresenter,
  RemoveTodoPresenter,
  CheckTodoPresenter,
} from "@backoffice/plan/adapters/presenters"
import {
  InMemoryFindPlansRepository,
  InMemoryGetPlanRepository,
  InMemoryPlanRepository,
} from "@backoffice/plan/infrastructure/repositories"

import {
  SendNotificationOnTodoCreatedSubscriber,
  SendNotificationOnPlanCompletedSubscriber,
} from "@notifications/application/subscribers"
import { OnScreenNotificationService } from "@notifications/infrastructure/services"

process.on("uncaughtException", async (err) => {
  console.error("Process uncaughtException:", err)
  process.exit(1)
})

process.on("SIGTERM", async () => {
  console.error("SIGTERM - Process stopped.")
})

async function main() {
  let caughtPlanId = ""
  let caughtTodoId = ""

  // Setup DomainEventBus and Subscribers
  const inMemoryDomainEventBus = new InMemoryDomainEventBus()
  const notificationService = new OnScreenNotificationService()
  await inMemoryDomainEventBus.addSubscribers([
    new SendNotificationOnTodoCreatedSubscriber(notificationService),
    new SendNotificationOnPlanCompletedSubscriber(notificationService),
  ])

  // Prepare Use Cases
  const createPlanUseCase = new CreatePlanUseCase(
    new InMemoryPlanRepository(),
    new CreatePlanPresenter((id) => (caughtPlanId = id)),
    inMemoryDomainEventBus
  )

  const findPlansUseCase = new FindPlansUseCase(
    new InMemoryFindPlansRepository(),
    new FindPlansPresenter()
  )

  const addTodoUseCase = new AddTodoUseCase(
    new InMemoryPlanRepository(),
    new AddTodoPresenter((id) => (caughtTodoId = id)),
    inMemoryDomainEventBus
  )

  const updateTodoUseCase = new UpdateTodoUseCase(
    new InMemoryPlanRepository(),
    new UpdateTodoPresenter()
  )

  const checkTodoUseCase = new CheckTodoUseCase(
    new InMemoryPlanRepository(),
    new CheckTodoPresenter(),
    inMemoryDomainEventBus
  )

  const getPlanUseCase = new GetPlanUseCase(
    new InMemoryGetPlanRepository(),
    new GetPlanPresenter()
  )

  const removeTodoUseCase = new RemoveTodoUseCase(
    new InMemoryPlanRepository(),
    new RemoveTodoPresenter()
  )

  // Run controllers
  const createPlanController = new CreatePlanController(createPlanUseCase)
  await createPlanController.execute({ name: "My First Plan" })

  const findPlansController = new FindPlansController(findPlansUseCase)
  await findPlansController.execute({ limit: 10, offset: 0 })

  const addTodoController = new AddTodoController(addTodoUseCase)
  await addTodoController.execute({
    planId: caughtPlanId,
    description: "My First Todo",
  })

  const updateTodoController = new UpdateTodoController(updateTodoUseCase)
  await updateTodoController.execute({
    planId: caughtPlanId,
    todoId: caughtTodoId,
    description: "My First Todo (Updated)",
  })

  const checkTodoController = new CheckTodoController(checkTodoUseCase)
  await checkTodoController.execute({
    planId: caughtPlanId,
    todoId: caughtTodoId,
  })

  const getTodoController = new GetPlanController(getPlanUseCase)
  await getTodoController.execute({ id: caughtPlanId })

  const removeTodoController = new RemoveTodoController(removeTodoUseCase)
  await removeTodoController.execute({
    planId: caughtPlanId,
    todoId: caughtTodoId,
  })
}

main()
