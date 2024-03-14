import {
  NotificationService,
  PlanCompletedNotificationRequest,
  TodoAddedNotificationRequest,
} from "../../domain/services"

export class OnScreenNotificationService implements NotificationService {
  public async notifyPlanCompleted(
    request: PlanCompletedNotificationRequest,
  ): Promise<void> {
    console.table({
      OnScreenNotificationService: "[Notification] PLAN COMPLETED:",
      Content: `Plan <${
        request.planName
      }> has been completed at <${request.planCompletedAt.toISOString()}>.`,
    })
  }

  public async notifyTodoAdded(
    request: TodoAddedNotificationRequest,
  ): Promise<void> {
    console.table({
      OnScreenNotificationService: "[Notification] TODO ADDED:",
      Content: `Todo <${
        request.todoDescription
      }> has been added at <${request.todoCreatedAt.toISOString()}> with ID <${
        request.todoId
      }>.`,
    })
  }
}
