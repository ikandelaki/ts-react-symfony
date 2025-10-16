import { memo, useContext, useState, type FormEvent } from 'react';
import { INPUT_NAME } from './TodoManager.config.ts'
import TodoContext from '../../contexts/TodoContext.ts'
import './TodoManager.style.scss'
import DeleteIcon from '../DeleteIcon/DeleteIcon.component.tsx'
import { isEqual } from 'lodash'

export function TodoManagerComponent() {
    const [ value, setValue ] = useState('');
    const { createTodo, deleteTodoList } = useContext(TodoContext);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createTodo(value)
        setValue('')
    }

    return (
        <>
            <div className="TodoManager">
                <form onSubmit={ handleSubmit }>
                    <input
                        name={ INPUT_NAME }
                        type="text"
                        placeholder="Todo name"
                        value={ value }
                        onChange={ (e) => setValue(e.target.value) }
                        required
                        />
                    <button type="submit">Create todo</button>
                </form>
                <div className="TodoManager-Delete" onClick={ deleteTodoList }>
                    <DeleteIcon />
                </div>
            </div>
        </>
    );
}

export default memo(TodoManagerComponent, (prevProps, props) => {
    if (isEqual(prevProps, props)) {
        return true;
    }

    return false;
})