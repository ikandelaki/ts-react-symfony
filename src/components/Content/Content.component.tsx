import { type TodoItemsInterface } from "../../types/TodoItemsInterface"

type ContentComponentProps = {
    items: TodoItemsInterface[]
}

export default function ContentComponent({ items = [] }: ContentComponentProps) {
  const renderNoItemsMessage = () => {
    return <div>You have nothing to do.</div>
  }

  const renderItems = () => {
    if (!items?.length) {
        return renderNoItemsMessage()
    }

    return items.map((item, key) =>
        <li key={`${key}-${item.name}`}>
            {item.name}
        </li>
    )
  }

  return (
    <ul>
        { renderItems() }
    </ul>
  );
}