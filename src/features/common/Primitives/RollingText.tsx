import { motion } from "framer-motion";

type RollingTextProps = {
  text: string;
  className?: string;
};

const RollingText = ({
  text,
  className = "",
}: RollingTextProps) => {
  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      variants={{
        rest: {},
        hover: {},
      }}
      className={`
        relative inline-block
        h-[1.25em]
        overflow-hidden
        align-middle
        ${className}
      `}
    >
      {/* Current text */}
      <motion.span
        variants={{
          rest: { y: "0%" },
          hover: { y: "100%" },
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute inset-x-0 top-0
          block whitespace-nowrap
          leading-tight
        "
      >
        {text}
      </motion.span>

      {/* Replacement text */}
      <motion.span
        variants={{
          rest: { y: "-100%" },
          hover: { y: "0%" },
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute inset-x-0 top-0
          block whitespace-nowrap
          leading-tight
        "
      >
        {text}
      </motion.span>

      {/* Keeps the parent width and height */}
      <span className="invisible block whitespace-nowrap leading-tight">
        {text}
      </span>
    </motion.span>
  );
};

export default RollingText;
