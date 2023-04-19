import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'

export default function TodoList () {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const { data: todos, error, isLoading } = useTodos({ page, pageSize })

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>
  return (
    <div className='flex flex-col space-y-4 w-full'>
      <ul className='border-2 border-[#36d399] rounded-lg divide-y-2 divide-[#36d399]'>
        {todos?.map((todo, index) => (
          <li key={index} className='text-white p-3'>
            {todo.title}
          </li>
        ))}
      </ul>
      <div className='btn-group grid grid-cols-2'>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className='btn btn-outline btn-success'
        >
          Previous page
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className='btn btn-outline btn-success'
        >
          Next
        </button>
      </div>
    </div>
  )
}
