import { View } from "@core/adapters"
import { FindTodosViewModel } from "../../adapters/presenters"

export class OnScreenFindTodosView implements View<FindTodosViewModel> {
  public async transform(viewModel: FindTodosViewModel): Promise<void> {
    if (viewModel.error) {
      console.error(viewModel.error.message)
    }
    if (viewModel.todos) {
      const info: Record<string, string> = {}
      viewModel.todos.forEach(
        (todo, idx) => (info[`Todo ${idx + 1}`] = `${todo.id} - ${todo.name}`)
      )
      console.table({
        OnScreenFindTodosView: "Todo list:",
        ...info,
      })
    }
  }
}
