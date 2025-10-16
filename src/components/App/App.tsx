import { useCallback, useMemo, useState } from 'react'
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

  const filteredItems = useMemo(
    () => (todos ?? [])?.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [todos, search]
  );

  const setAndSaveItems = (newItems: TodoItemsInterface[] = []) => {
    setTodos(newItems);
    localStorage.setItem(TODO_ITEMS, JSON.stringify(newItems))
  }

  const createTodo = useCallback((name: string) => {
    const id = todos?.length ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { id, name, checked: false };
    const newItems = [ ...todos, newTodo ];

    setAndSaveItems(newItems);
  }, [todos])

  const deleteTodoList = useCallback(() => {
    if (!todos?.length) {
      return;
    }

    setAndSaveItems([]);
  }, [todos])

  const deleteTodoItem = useCallback((id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setAndSaveItems(newTodos);
  }, [todos])

  const updateIsTodoItemChecked = useCallback((id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: !todo.checked };
      }

      return todo;
    })

    setAndSaveItems(newTodos);
  }, [todos])

  const contextValue = useMemo(() => ({ createTodo, deleteTodoList }), [createTodo, deleteTodoList])

  return (
    <div className="App">
      <TodoContext.Provider value={ contextValue }>
          <TodoManager />
      </TodoContext.Provider>
      <SearchInput search={ search } setSearch={ setSearch } />
      <Content
        items={ filteredItems }
        deleteTodoItem={ deleteTodoItem }
        updateIsTodoItemChecked={ updateIsTodoItemChecked } />
    </div>
  )
}

export default App