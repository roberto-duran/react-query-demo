import { useRef } from 'react'
import useAddTodo from '../hooks/useAddTodo'

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = ''
  })

  return (
    <form
      className='flex space-x-2 w-full'
      onSubmit={event => {
        event.preventDefault()
        if (ref.current && ref.current.value)
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: false,
            userId: 1
          })
      }}
    >
      <input
        ref={ref}
        type='text'
        placeholder='add todo'
        className='input input-bordered input-success w-full flex-1'
      />
      <button disabled={addTodo.isLoading} className='btn btn-success'>
        {addTodo.isLoading ? 'Creating TODO...' : 'Add'}
      </button>
    </form>
  )
}

export default TodoForm
