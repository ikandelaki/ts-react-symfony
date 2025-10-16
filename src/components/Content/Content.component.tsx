import { type TodoItemsInterface } from "../../types/TodoItemsInterface";
import DeleteIcon from '../DeleteIcon';
import './Content.style.scss'

type ContentComponentProps = {
    items: TodoItemsInterface[]
    deleteTodoItem: (id: number) => void
    updateIsTodoItemChecked: (id: number) => void
}

export default function ContentComponent({ items = [], deleteTodoItem, updateIsTodoItemChecked }: ContentComponentProps) {
  const renderNoItemsMessage = () => {
    return <div>You have nothing to do.</div>
  }

  const renderItems = () => {
    if (!items?.length) {
        return renderNoItemsMessage()
    }

    return items.map(({name, id, checked}) =>
        <li key={`${id}-${name}`} className={ `Todo-Item ${ checked ? 'Todo-Item_isChecked' : ''}` }>
            <input type="checkbox" name="todo-checked" checked={ checked } onChange={() => updateIsTodoItemChecked(id) } />
            <span>
              {name}
            </span>
            <button onClick={ () => deleteTodoItem(id)}>
              <DeleteIcon />
            </button>
        </li>
    )
  }

  return (
    <ul className="ContentComponent">
        { renderItems() }
    </ul>
  );
}