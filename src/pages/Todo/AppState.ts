import * as T from './todoStore'

export type AppState = {
  todoItemReducer: {
    todos: T.TodoItem[]
  }
}
