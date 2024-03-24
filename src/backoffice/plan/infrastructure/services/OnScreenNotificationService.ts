import {
  NotificationService,
  PlanCreatedNotificationRequest,
  PlanCompletedNotificationRequest,
  TodoAddedNotificationRequest,
} from "../../domain/services"

export class OnScreenNotificationService implements NotificationService {
  public async notifyPlanCreated(
    request: PlanCreatedNotificationRequest,
  ): Promise<void> {
    console.table({
      OnScreenNotificationService: "[Notification] PLAN CREATED:",
      Content: `Plan <${
        request.planName
      }> has been created at <${request.planCreatedAt.toISOString()}> with ID <${
        request.planId
      }>.`,
    })
  }

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
