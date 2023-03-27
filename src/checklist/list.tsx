/* eslint @typescript-eslint/no-use-before-define: 0 */

import { ChecklistItem, ItemDeletedCallback } from "./types"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"
import { BsThreeDots, BsFillTrashFill } from "react-icons/bs"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePrevious } from "./usePrevious"

export default function List({
  items,
  onItemToggled,
  onItemValueChanged,
  onItemDeleted,
}: {
  items: ChecklistItem[]
  onItemToggled: (id: number, val: boolean) => void
  onItemValueChanged: (id: number, val: string) => void
  onItemDeleted: ItemDeletedCallback
}) {
  const [scope, animate] = useAnimate()

  const allComplete = !items.some((i) => !i.complete)
  const prevAllComplete = usePrevious(allComplete)

  useEffect(() => {
    if (!allComplete || prevAllComplete) return

    animate(
      ".checklist__checkbox",
      { x: [-2, 2, 0] },
      {
        delay: stagger(0.1),
        duration: 0.2,
        repeat: 4,
        repeatType: "mirror",
      },
    )
  }, [animate, allComplete, prevAllComplete])

  return (
    <motion.div layout ref={scope}>
      <ul className="checklist__list">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.4,
                },
              }}
              exit={{
                opacity: 0,
              }}
              className="checklist__item"
            >
              <div className="checklist__row">
                <div className="checklist__col">
                  <input
                    type="checkbox"
                    className="checklist__checkbox"
                    checked={item.complete}
                    onChange={() => onItemToggled(item.id, !item.complete)}
                  />
                </div>
                <div className="checklist__col">
                  <div className="checklist__flex checklist__flex--s-between">
                    <input
                      type="text"
                      value={item.value}
                      disabled={item.complete}
                      onChange={(e) =>
                        onItemValueChanged(item.id, e.target.value)
                      }
                      className={`checklist__value ${
                        item.complete ? "checklist__value--complete" : ""
                      }`}
                    />
                    <PrimerButton onClick={() => onItemDeleted(item.id)} />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

function PrimerButton({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [primed, setPrimed] = useState(false)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPrimed(false)
      }
    }
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setPrimed(false)
      }
    }

    if (primed) {
      window.addEventListener("click", handleClick, true)
      window.addEventListener("keydown", handleKeydown, true)
    } else {
      window.removeEventListener("click", handleClick, true)
      window.removeEventListener("keydown", handleKeydown, true)
    }

    return () => {
      window.removeEventListener("click", handleClick, true)
      window.removeEventListener("keydown", handleKeydown, true)
    }
  }, [primed])

  const buttonAnimations = useMemo(
    () => ({
      initial: {
        x: "-100%",
      },
      animate: {
        x: 0,
      },
      exit: {
        x: "100%",
      },
      transition: {
        duration: 0.1,
      },
    }),
    [],
  )

  return (
    <div ref={ref} className="checklist__primer">
      {/* FIXME: this wait causes an issue if we hide the row while primed */}
      <AnimatePresence initial={false} mode="wait">
        {primed ? (
          <motion.div
            key={1}
            initial={buttonAnimations.initial}
            animate={buttonAnimations.animate}
            exit={buttonAnimations.exit}
            transition={buttonAnimations.transition}
          >
            <button
              className="checklist__primer-btn checklist__primer-btn--danger"
              onClick={onClick}
            >
              <BsFillTrashFill className="checklist__primer-icon" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={2}
            initial={buttonAnimations.initial}
            animate={buttonAnimations.animate}
            exit={buttonAnimations.exit}
            transition={buttonAnimations.transition}
          >
            <button
              className="checklist__primer-btn"
              onClick={() => setPrimed(true)}
            >
              <BsThreeDots className="checklist__primer-icon" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
