import "./checklist.styles.scss"
import { useCallback, useMemo, useState } from "react"
import { LayoutGroup, motion } from "framer-motion"
import {
  ChecklistItem,
  ItemAddedCallback,
  ItemDeletedCallback,
  ItemUpdatedCallback,
} from "./types"
import { Header, Progress, Body, Footer } from "./sections"

type ChecklistProps = {
  items: ChecklistItem[]
  title?: string
  onItemAdded: ItemAddedCallback
  onItemDeleted: ItemDeletedCallback
  onItemUpdated: ItemUpdatedCallback
}

export default function Checklist({
  items,
  onItemAdded,
  onItemDeleted,
  onItemUpdated,
  title = "Checklist",
}: ChecklistProps) {
  const [filter, setFilter] = useState(false)

  const staggerFramerVariants = useMemo(
    () => ({
      visible: {
        transition: {
          when: "beforeChildren",
          delayChildren: 0.3,
          staggerChildren: 0.08,
        },
      },
    }),
    [],
  )
  const sectionFramerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: "-.8rem",
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    }),
    [],
  )

  const toggleFilter = useCallback(() => setFilter((curr) => !curr), [])
  const toggleItem = useCallback(
    (id: number, val: boolean) => onItemUpdated(id, { complete: val }),
    [onItemUpdated],
  )
  const updateItemValue = useCallback(
    (id: number, val: string) => onItemUpdated(id, { value: val }),
    [onItemUpdated],
  )

  const filteredItems = filter ? items.filter((i) => !i.complete) : items

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <LayoutGroup>
        <motion.div
          layout
          initial="hidden"
          animate="visible"
          variants={staggerFramerVariants}
          className="checklist"
        >
          <motion.div
            layout
            variants={sectionFramerVariants}
            className="checklist__section"
          >
            <Header
              title={title}
              isFiltering={filter}
              onFilterClicked={toggleFilter}
            />
          </motion.div>
          <motion.div
            layout
            variants={sectionFramerVariants}
            className="checklist__section"
          >
            <Progress
              total={items.length}
              current={items.filter((i) => i.complete).length}
            />
          </motion.div>
          <motion.div
            layout
            variants={sectionFramerVariants}
            className="checklist__section"
          >
            <Body
              items={filteredItems}
              onItemToggled={toggleItem}
              onItemValueChanged={updateItemValue}
              onItemDeleted={onItemDeleted}
            />
          </motion.div>
          <motion.div
            layout
            variants={sectionFramerVariants}
            className="checklist__section"
          >
            <Footer onItemAdded={onItemAdded} />
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  )
}
