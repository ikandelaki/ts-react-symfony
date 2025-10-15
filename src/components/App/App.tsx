import { useState } from 'react'
import './App.css'
import TodoContext from '../../contexts/TodoContext.ts'
import TodoManager from '../TodoManager/index.ts'
import { type TodoItemsInterface } from '../../types/TodoItemsInterface.ts'
import { TODO_ITEMS } from './App.config.ts'
import Content from '../Content/Content.component.tsx'
import SearchInput from '../SearchInput/SearchInput.component.tsx'

function App() {
  const [todos, setTodos] = useState<TodoItemsInterface[]>(JSON.parse(localStorage.getItem(TODO_ITEMS) ?? ''));
  const [search, setSearch] = useState<string>('');

  const filteredItems = todos?.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

  const setAndSaveItems = (newItems: TodoItemsInterface[] = []) => {
    setTodos(newItems);
    localStorage.setItem(TODO_ITEMS, JSON.stringify(newItems))
  }

  const createTodo = (name: string) => {
    const id = todos?.length ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { id, name, checked: false };
    const newItems = [ ...todos, newTodo ];

    setAndSaveItems(newItems);
  }

  const deleteTodoList = () => {
    if (!todos?.length) {
      return;
    }

    setAndSaveItems([])
  }

  return (
    <div className="App">
      <TodoContext.Provider value={ { createTodo, deleteTodoList } }>
          <TodoManager />
      </TodoContext.Provider>
      <SearchInput search={ search } setSearch={ setSearch } />
      <Content items={ filteredItems } />
    </div>
  )
}

export default App