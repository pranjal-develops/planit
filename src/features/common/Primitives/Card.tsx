// Card.tsx
import { motion, type HTMLMotionProps } from "motion/react"
import type { CSSProperties, ReactNode } from "react"

interface CardProps
  extends Omit<HTMLMotionProps<"div">, "children" | "style"> {
  children: ReactNode
  contentClassName?: string
  style?: CSSProperties
}

const Card = ({
  children,
  className = "",
  contentClassName = "",
  style,
  ...props
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.5, ease: "easeOut" },
        y: { duration: 0.5, ease: "easeOut" },
      }}
      style={{
        ...style,
      }}
      className={`relative z-0 flex w-full flex-col rounded-xl border border-(--primary-border) ${className}`}
      {...props}
    >
      <motion.div
        initial={{
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
        }}
        animate={{
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
        }}
        transition={{
          delay: 1,
          duration: 0.5,
          ease: "easeIn",
        }}
        className={contentClassName}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Card
