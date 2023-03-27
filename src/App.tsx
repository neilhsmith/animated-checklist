import "./styles.scss"
import { useCallback, useState } from "react"
import { Checklist, ChecklistItem, UpdateItemPayload } from "./checklist"

const initialItems: ChecklistItem[] = [
  {
    id: 1,
    complete: true,
    value: "Clean house",
  },
  {
    id: 2,
    complete: true,
    value: "Make groceries",
  },
  {
    id: 3,
    complete: false,
    value: "Tell my dog she's pretty",
  },
  {
    id: 4,
    complete: false,
    value: "A fourth thing",
  },
]
let nextId = initialItems.length + 1

export default function App() {
  const [items, setItems] = useState(initialItems)

  const addItem = useCallback(() => {
    setItems((curr) => [
      ...curr,
      {
        id: nextId++,
        complete: false,
        value: "",
      },
    ])
  }, [])
  const updateItem = useCallback((id: number, payload: UpdateItemPayload) => {
    setItems((curr) =>
      curr.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...payload,
          }
        }

        return item
      }),
    )
  }, [])
  const deleteItem = useCallback((id: number) => {
    setItems((curr) => curr.filter((item) => item.id !== id))
  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <h1>Animated Checklist</h1>
        <p>An accessible and animated checklist inspired by Trello.</p>
        <p>react, framer-motion, vanilla css</p>
      </div>
      <div className="app__body">
        <Checklist
          items={items}
          title="Todo list"
          onItemAdded={addItem}
          onItemUpdated={updateItem}
          onItemDeleted={deleteItem}
        />
      </div>
    </div>
  )
}
