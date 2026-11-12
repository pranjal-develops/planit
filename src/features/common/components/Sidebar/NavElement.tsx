import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type React from 'react';

interface NavElementProps {
    name: string,
    button:ReactNode,
    isActive: boolean
}

const NavElement:React.FC<NavElementProps> = ({name, button, isActive}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="flex w-full flex-row items-center gap-5"
    >
      <div
        className={
          isActive
            ? "text-lg text-(--accent-bg)"
            : "text-lg text-(--primary-text)"
        }
      >
        {button}
      </div>

      <span
        className={
          isActive
            ? "text-(--accent-bg)"
            : "text-(--primary-text)"
        }
      >
        {name}
      </span>
    </motion.div>
  )
}

export default NavElement