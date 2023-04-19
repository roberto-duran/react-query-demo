import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"
import {Todo, AddTodoContext, CACHE_KEY_TODOS } from "../model/Todo"

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient()
  return  useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),
    onMutate: newTodo => {
      //creating a optimistic update
      const previousTodos =
        queryClient.getQueriesData<Todo[]>([CACHE_KEY_TODOS]) || []
      queryClient.setQueriesData<Todo[]>([CACHE_KEY_TODOS], (todos = []) => [
        newTodo,
        ...todos
      ])

      onAdd()

      return { previousTodos }
    },
    onSuccess: (savedTodo, newTodo) => {
      //if the response is successful, we update the cache and use the value from the response
      queryClient.setQueriesData<Todo[]>([CACHE_KEY_TODOS], todos =>
        todos?.map(todo => (todo === newTodo ? savedTodo : todo))
      )
    },
    onError: (error, newTodo, context) => {
      //if the response is unsuccessful, we rollback the optimistic update
      if (!context) return
      queryClient.setQueriesData<Todo[]>(
        [CACHE_KEY_TODOS],
        context.previousTodos
      )
    }
  })
}

export default useAddTodo