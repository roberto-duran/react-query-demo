import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CACHE_KEY_TODOS, Todo, TodoQuery } from "../model/Todo";

export const useTodos = (query: TodoQuery) => {
  const fetchTodos = () => 
    axios
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        }
      })
      .then(res => res.data);

    return useQuery<Todo[], Error>({
      queryKey: [CACHE_KEY_TODOS, query],
      queryFn: fetchTodos,
      keepPreviousData: true,
      staleTime: 1000 * 10, // 10 seconds of cached data
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined
      }
    })

}
