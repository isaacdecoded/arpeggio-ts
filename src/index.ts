import "module-alias/register"

import { InMemoryDomainEventBus } from "@core/infrastructure"
import {
  CreateTodoUseCase,
  UpdateTodoUseCase,
  RemoveTodoUseCase,
} from "@backoffice/commands/application/use-cases"
import {
  FindTodosUseCase,
  GetTodoUseCase,
} from "@backoffice/queries/application/use-cases"
import { SendNotificationOnTodoCreatedSubscriber } from "@backoffice/commands/application/subscribers"
import {
  CreateTodoController,
  UpdateTodoController,
  RemoveTodoController,
} from "@backoffice/commands/adapters/controllers"
import {
  FindTodosController,
  GetTodoController,
} from "@backoffice/queries/adapters/controllers"
import {
  CreateTodoPresenter,
  UpdateTodoPresenter,
  RemoveTodoPresenter,
} from "@backoffice/commands/adapters/presenters"
import {
  FindTodosPresenter,
  GetTodoPresenter,
} from "@backoffice/queries/adapters/presenters"
import {
  InMemoryCreateTodoRepository,
  InMemoryRemoveTodoRepository,
  InMemoryUpdateTodoRepository,
} from "@backoffice/commands/infrastructure/repositories"
import { OnScreenNotificationService } from "@backoffice/commands/infrastructure/services"
import {
  InMemoryFindTodosRepository,
  InMemoryGetTodoRepository,
} from "@backoffice/queries/infrastructure/repositories"
import {
  OnScreenCreateTodoView,
  OnScreenUpdateTodoView,
  OnScreenRemoveTodoView,
} from "@backoffice/commands/infrastructure/views"
import {
  OnScreenFindTodosView,
  OnScreenGetTodoView,
} from "@backoffice/queries/infrastructure/views"

process.on("uncaughtException", async (err) => {
  console.error("Process uncaughtException:", err)
  process.exit(1)
})

process.on("SIGTERM", async () => {
  console.error("SIGTERM - Process stopped.")
})

async function main() {
  // Setup DomainEventBus and Subscribers
  const inMemoryDomainEventBus = new InMemoryDomainEventBus()
  await inMemoryDomainEventBus.addSubscribers([
    new SendNotificationOnTodoCreatedSubscriber(
      new OnScreenNotificationService()
    ),
  ])
  await inMemoryDomainEventBus.start()

  // Prepare Use Cases
  const createTodoPresenter = new CreateTodoPresenter(
    new OnScreenCreateTodoView()
  )
  const createTodoUseCase = new CreateTodoUseCase(
    new InMemoryCreateTodoRepository(),
    createTodoPresenter,
    inMemoryDomainEventBus
  )

  const findTodosPresenter = new FindTodosPresenter(new OnScreenFindTodosView())
  const findTodosUseCase = new FindTodosUseCase(
    new InMemoryFindTodosRepository(),
    findTodosPresenter
  )

  const getTodoPresenter = new GetTodoPresenter(new OnScreenGetTodoView())
  const getTodoUseCase = new GetTodoUseCase(
    new InMemoryGetTodoRepository(),
    getTodoPresenter
  )

  const updateTodoPresenter = new UpdateTodoPresenter(
    new OnScreenUpdateTodoView()
  )
  const updateTodoUseCase = new UpdateTodoUseCase(
    new InMemoryUpdateTodoRepository(),
    updateTodoPresenter
  )

  const deleteTodosPresenter = new RemoveTodoPresenter(
    new OnScreenRemoveTodoView()
  )
  const deleteTodoUseCase = new RemoveTodoUseCase(
    new InMemoryRemoveTodoRepository(),
    deleteTodosPresenter
  )

  // Run controllers
  const defaultId = "MyFirstTodoID"

  const findTodosController = new FindTodosController(findTodosUseCase)
  await findTodosController.execute({ limit: 10, offset: 0 })

  const createTodoController = new CreateTodoController(createTodoUseCase)
  await createTodoController.execute({ name: "My First Todo" })

  const updateTodoController = new UpdateTodoController(updateTodoUseCase)
  await updateTodoController.execute({
    id: defaultId,
    name: "My First Todo (Updated)",
  })

  const getTodoController = new GetTodoController(getTodoUseCase)
  await getTodoController.execute({ id: defaultId })

  const deleteTodosController = new RemoveTodoController(deleteTodoUseCase)
  await deleteTodosController.execute({ id: defaultId })
}

main()
