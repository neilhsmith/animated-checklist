import { motion } from "framer-motion"

type ProgressBarProps = {
  percentComplete: number
}

export default function ProgressBar({ percentComplete }: ProgressBarProps) {
  return (
    <div className="checklist__progress-bar">
      <motion.div
        animate={{
          width: `${percentComplete}%`,
        }}
        transition={{
          delay: 0.12,
        }}
        className="checklist__progress-current"
      />
    </div>
  )
}
