export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface TodoQuery {
  page: number;
  pageSize: number;
}

export interface AddTodoContext {
  previousTodos: Todo[]
}

export const CACHE_KEY_TODOS = 'todos';