import { createContext } from "react";

export type TodoContextInterface = {
    createTodo: (value: string) => void
    deleteTodoList: () => void
}

const TodoContext = createContext<TodoContextInterface>({
    createTodo: () => {},
    deleteTodoList: () => {}
})
TodoContext.displayName = 'TodoContext'

export default TodoContext