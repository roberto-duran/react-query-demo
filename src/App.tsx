import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App () {
  const [count, setCount] = useState(0)

  return (
    <main className='flex flex-col mx-auto items-center p-10 space-y-4 max-w-xl'>
      <TodoForm />
      <TodoList />
    </main>
  )
}

export default App
