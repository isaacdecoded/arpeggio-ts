import "module-alias/register"
import { InMemoryDomainEventBus } from "@core/infrastructure"
import { BackofficeContext } from "@backoffice/BackofficeContext"

process.on("uncaughtException", async (err) => {
  console.error("Process uncaughtException:", err)
  process.exit(1)
})

process.on("SIGTERM", async () => {
  console.error("SIGTERM - Process stopped.")
})

async function main() {
  // Setup DomainEventBus and Bounded Contexts
  const inMemoryDomainEventBus = new InMemoryDomainEventBus()
  const backofficeContext = new BackofficeContext(inMemoryDomainEventBus)

  // Run controllers
  await backofficeContext.planAggregate.createPlanController.execute({
    name: "My First Plan",
  })
  await backofficeContext.planAggregate.findPlansController.execute({
    limit: 10,
    offset: 0,
  })
  await backofficeContext.planAggregate.addTodoController.execute({
    planId: backofficeContext.planAggregate.caughtPlanId,
    description: "My First Todo",
  })
  await backofficeContext.planAggregate.updateTodoController.execute({
    planId: backofficeContext.planAggregate.caughtPlanId,
    todoId: backofficeContext.planAggregate.caughtTodoId,
    description: "My First Todo (Updated)",
  })
  await backofficeContext.planAggregate.checkTodoController.execute({
    planId: backofficeContext.planAggregate.caughtPlanId,
    todoId: backofficeContext.planAggregate.caughtTodoId,
  })
  await backofficeContext.planAggregate.getPlanController.execute({
    id: backofficeContext.planAggregate.caughtPlanId,
  })
  await backofficeContext.planAggregate.removeTodoController.execute({
    planId: backofficeContext.planAggregate.caughtPlanId,
    todoId: backofficeContext.planAggregate.caughtTodoId,
  })
}

main()
