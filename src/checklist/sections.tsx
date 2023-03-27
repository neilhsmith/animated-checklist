import { memo } from "react"
import { MdChecklist } from "react-icons/md"
import { ChecklistItem, ItemAddedCallback, ItemDeletedCallback } from "./types"
import List from "./list"
import ProgressBar from "./progress-bar"

export const Header = memo(
  ({
    title,
    isFiltering,
    onFilterClicked,
  }: {
    title: string
    isFiltering: boolean
    onFilterClicked: () => void
  }) => (
    <div className="checklist__header-section">
      <div className="checklist__row">
        <div className="checklist__col">
          <MdChecklist className="checklist__header-icon" />
        </div>
        <div className="checklist__col">
          <div className="checklist__flex checklist__flex--s-between">
            <span className="checklist__title">{title}</span>
            <button className="checklist__btn" onClick={onFilterClicked}>
              {isFiltering ? "Show" : "Hide"} checked items
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
)

export const Progress = memo(
  ({ current, total }: { current: number; total: number }) => {
    const percentComplete = total > 0 ? Math.floor(100 / (total / current)) : 0

    return (
      <div className="checklist__progress-section">
        <div className="checklist__row">
          <div className="checklist__col">
            <span className="checklist__percentage">{percentComplete}%</span>
          </div>
          <div className="checklist__col">
            <ProgressBar percentComplete={percentComplete} />
          </div>
        </div>
      </div>
    )
  },
)

export const Body = memo(
  ({
    items,
    onItemToggled,
    onItemValueChanged,
    onItemDeleted,
  }: {
    items: ChecklistItem[]
    onItemToggled: (id: number, val: boolean) => void
    onItemValueChanged: (id: number, val: string) => void
    onItemDeleted: ItemDeletedCallback
  }) => {
    return (
      <div className="checklist__body-section">
        <List
          items={items}
          onItemToggled={onItemToggled}
          onItemValueChanged={onItemValueChanged}
          onItemDeleted={onItemDeleted}
        />
      </div>
    )
  },
)

export const Footer = memo(
  ({ onItemAdded }: { onItemAdded: ItemAddedCallback }) => {
    return (
      <div className="checklist__footer-section">
        <button className="checklist__btn" onClick={onItemAdded}>
          Add item
        </button>
      </div>
    )
  },
)
