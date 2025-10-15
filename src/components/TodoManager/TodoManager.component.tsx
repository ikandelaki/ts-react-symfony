import { useContext, useState, type FormEvent } from 'react';
import { INPUT_NAME } from './TodoManager.config.ts'
import TodoContext from '../../contexts/TodoContext.ts'
import TrashIcon from '../../assets/trash-bin.svg'
import './TodoManager.style.scss'
import DeleteIcon from '../DeleteIcon/DeleteIcon.component.tsx'

export default function TodoManagerComponent() {
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