import { NavLink } from "react-router";
import { motion } from "motion/react";
import { StaggeredRollingText } from "../../Primitives/StaggeredRollingText";
const MotionNavLink = motion.create(NavLink);

const NoUser = () => {
  return (
    <>
        <div className="flex items-center gap-4">
          <MotionNavLink
            to="/login"
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={{
              rest: {},
              hover: {},
              tap: {},
            }}
            className="
        relative hidden overflow-hidden rounded-lg
        px-5 py-2.5 text-xs text-muted
        border border-(--accent-bg)
        sm:inline-block
      "
          >
            <motion.span
              variants={{
                rest: {
                  width: "0%",
                },
                hover: {
                  width: "100%",
                },
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
          absolute inset-y-0 left-0
          z-0 bg-(--accent-bg)
        "
            />

            <motion.span
              variants={{
                rest: {
                  color: "var(--muted)",
                },
                hover: {
                  color: "#fff",
                },
              }}
              transition={{ duration: 0.25 }}
              className="relative z-10"
            >
              Log in
            </motion.span>
          </MotionNavLink>
          <MotionNavLink
            to="/signup"
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            className="
    group inline-flex items-center justify-center
    rounded-lg bg-(--accent-bg)
    p-3 text-xs font-semibold
    transition-colors hover:bg-accent-hover
  "
            aria-label="Get started"
          >
            <StaggeredRollingText text="Get started free" />
          </MotionNavLink>
        </div>
      </>
  )
}

export default NoUser