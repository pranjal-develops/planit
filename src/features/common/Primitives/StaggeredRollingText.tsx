import { motion } from "framer-motion";

// const textVariants = {
//   rest: {
//     y: "0%",
//   },
//   hover: {
//     y: "-100%",
//   },
// };

type RollingTextProps = {
  text: string;
};

export const StaggeredRollingText = ({ text }: RollingTextProps) => {
  return (
    <span className="flex overflow-hidden">
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="relative block h-[1em] overflow-hidden"
        >
          {/* Original text moves down */}
          <motion.span
            initial={{ y: "0%" }}
            variants={{
              rest: { y: "0%" },
              hover: { y: "100%" },
            }}
            transition={{
              duration: 0.2,
              delay: index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>

          {/* Replacement text comes down from above */}
          <motion.span
            variants={{
              rest: { y: "-100%" },
              hover: { y: "0%" },
            }}
            transition={{
              duration: 0.35,
              delay: index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 top-0 block"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
