import { TODO_ITEMS } from "../components/App/App.config";
import { type TodoItemsInterface } from "../types/TodoItemsInterface";

export const DELETE_TODO_ITEMS = 'DELETE_TODO_ITEMS';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const UPDATE_IS_TODO_ITEM_CHECKED = 'UPDATE_IS_TODO_ITEM_CHECKED';

export const initialState: TodoItemsInterface[] = JSON.parse(localStorage.getItem(TODO_ITEMS) ?? '') ?? {};

export type ActionType = {
    type: string
    payload?: {
        name?: string
        id?: number
    }
}

const updateLocalStorage = (items: TodoItemsInterface[]) => {
    localStorage.setItem(TODO_ITEMS, JSON.stringify(items));
}

export function TodoReducer(state: TodoItemsInterface[], action: ActionType) {
    const { type, payload } = action;

    switch (type) {
        case DELETE_TODO_ITEMS:
            if (!state?.length) {
                return state;
            }

            return []
        
        case CREATE_TODO: {
            const { name = '' } = payload || {};
            const id = state.length ? state[state.length - 1].id + 1 : 1;
            const newState = [
                ...state,
                { id, name, checked: false }
            ];

            updateLocalStorage(newState);

            return newState;
        }

        case DELETE_TODO_ITEM: {
            const { id } = payload || {};
            const newState = state.filter((todo) => todo.id !== id);

            if (!newState?.length) {
                return state;
            }

            updateLocalStorage(newState);

            return newState
        }

        case UPDATE_IS_TODO_ITEM_CHECKED: {
            const { id } = payload || {};
            const newState = state.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, checked: !todo.checked };
                }

                return todo;
            });

            updateLocalStorage(newState);

            return newState;
        }

        default:
            return state;
    }
}

export default TodoReducer;