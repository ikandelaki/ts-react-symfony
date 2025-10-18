import { useCallback, useMemo, useState, useReducer } from 'react'
import './App.css'
import TodoContext from '../../contexts/TodoContext.ts'
import TodoManager from '../TodoManager/index.ts'
import Content from '../Content/Content.component.tsx'
import SearchInput from '../SearchInput/SearchInput.component.tsx'
import TodoReducer, {
  initialState,
  DELETE_TODO_ITEMS,
  CREATE_TODO,
  DELETE_TODO_ITEM,
  UPDATE_IS_TODO_ITEM_CHECKED
} from '../../reducers/TodoReducer.ts'

function App() {
  const [todos, dispatch] = useReducer(TodoReducer, initialState);
  const [search, setSearch] = useState<string>('');

  const filteredItems = useMemo(
    () => (todos ?? [])?.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())),
    [todos, search]
  );

  const createTodo = useCallback((name: string) => {
    dispatch({ type: CREATE_TODO, payload: { name } })
  }, [dispatch]);

  const deleteTodoList = useCallback(() => {
    dispatch({ type: DELETE_TODO_ITEMS })
  }, [dispatch]);

  const deleteTodoItem = useCallback((id: number) => {
    dispatch({ type: DELETE_TODO_ITEM, payload: { id } })
  }, [dispatch]);

  const updateIsTodoItemChecked = useCallback((id: number) => {
    dispatch({ type: UPDATE_IS_TODO_ITEM_CHECKED, payload: { id } })
  }, [dispatch]);

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