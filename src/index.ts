import 'module-alias/register'

import { InMemoryDomainEventBus } from '@core/infrastructure'
import {
  CreateTodoUseCase,
  FindTodosUseCase,
  GetTodoUseCase,
  UpdateTodoUseCase,
  DeleteTodoUseCase,
} from '@backoffice/todo/application'
import {
  CreateTodoController,
  FindTodosController,
  GetTodoController,
  UpdateTodoController,
  DeleteTodosController,
} from '@backoffice/todo/adapters/controllers'
import {
  CreateTodoPresenter,
  FindTodosPresenter,
  GetTodoPresenter,
  UpdateTodoPresenter,
  DeleteTodosPresenter,
} from '@backoffice/todo/adapters/presenters'
import { InMemoryTodoRepository } from '@backoffice/todo/infrastructure/repositories'
import {
  OnScreenCreateTodoView,
  OnScreenFindTodosView,
  OnScreenGetTodoView,
  OnScreenUpdateTodoView,
  OnScreenDeleteTodosView,
} from '@backoffice/todo/infrastructure/views'

process.on('uncaughtException', async (err) => {
  console.error('Process uncaughtException:', err)
  process.exit(1)
})

process.on('SIGTERM', async () => {
  console.error('SIGTERM - Process stopped.')
})

async function main() {
  // Setup implementation components
  const inMemoryDomainEventBus = new InMemoryDomainEventBus()
  const inMemoryTodoRepository = new InMemoryTodoRepository()
  await inMemoryDomainEventBus.addSubscribers([]) // add required subscribers
  await inMemoryDomainEventBus.start()

  // Prepare Use Cases
  const createTodoPresenter = new CreateTodoPresenter(
    new OnScreenCreateTodoView(),
  )
  const createTodoUseCase = new CreateTodoUseCase(
    inMemoryTodoRepository,
    createTodoPresenter,
    inMemoryDomainEventBus,
  )

  const findTodosPresenter = new FindTodosPresenter(
    new OnScreenFindTodosView(),
  )
  const findTodosUseCase = new FindTodosUseCase(
    inMemoryTodoRepository,
    findTodosPresenter,
  )

  const getTodoPresenter = new GetTodoPresenter(
    new OnScreenGetTodoView(),
  )
  const getTodoUseCase = new GetTodoUseCase(
    inMemoryTodoRepository,
    getTodoPresenter,
  )

  const updateTodoPresenter = new UpdateTodoPresenter(
    new OnScreenUpdateTodoView(),
  )
  const updateTodoUseCase = new UpdateTodoUseCase(
    inMemoryTodoRepository,
    updateTodoPresenter,
  )

  const deleteTodosPresenter = new DeleteTodosPresenter(
    new OnScreenDeleteTodosView(),
  )
  const deleteTodoUseCase = new DeleteTodoUseCase(
    inMemoryTodoRepository,
    deleteTodosPresenter,
  )

  // Run controllers
  const createTodoController = new CreateTodoController(createTodoUseCase)
  await createTodoController.execute({ name: "My First Todo" })

  const findTodosController = new FindTodosController(findTodosUseCase)
  await findTodosController.execute({ limit: 10, offset: 0 })

  const updateTodoController = new UpdateTodoController(updateTodoUseCase)
  await updateTodoController.execute({ id: "MyFirstTodoID", name: "My First Todo (Updated)" })

  const getTodoController = new GetTodoController(getTodoUseCase)
  await getTodoController.execute({ id: "MyFirstTodoID" })

  const deleteTodosController = new DeleteTodosController(deleteTodoUseCase)
  await deleteTodosController.execute()
}

main()
