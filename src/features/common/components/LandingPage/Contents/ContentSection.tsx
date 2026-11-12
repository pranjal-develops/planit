import { NavLink } from "react-router";
import { ProductPreview } from "../../Landing/Preview/ProductPreview";
import { motion } from "motion/react";
import { StaggeredRollingText } from "../../../Primitives/StaggeredRollingText";

const MotionNavLink = motion.create(NavLink);

export function ContentSection() {
  return (
        <section className="grid items-center gap-10 py-12 lg:grid-cols-[0.8fr_1.4fr] overflow-x-hidden">
            <div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent text-(--accent-font)" />
          A better way to manage your work
        </p>
                <motion.h1
                initial={{opacity: 0, y:40}}
                animate={{opacity:1, y:0}}
                transition={{duration: 0.8, ease:"easeOut"}}
                className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl lg:text-7xl 
                ">
                    {/* bg-linear-to-r from-(--accent-font) via-(--primary-text) to-(--accent-font) text-transparent bg-clip-text */}
          Organize tasks.
          <br />
          Plan together.
          <br />
          <span className="text-(--accent-bg)">Achieve more.</span>
        </motion.h1>
        
        <p className="mt-6 max-w-md text-sm leading-7 text-muted">
          The all-in-one space for managing tasks, calendars,
          and collaboration.
        </p>

<div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <MotionNavLink
          initial="rest"
  whileHover="hover"
  whileTap={{ scale: 0.96 }}
            to="/signup"
            className="rounded-md bg-accent px-5 py-3 text-center text-xs font-semibold bg-(--accent-bg) transition hover:bg-accent-hover focus-ring"
          >
            <StaggeredRollingText text="Get started for free →" />
          </MotionNavLink>

          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 text-xs transition hover:text-accent focus-ring hover:text-(--accent-font)"
          >
            Login
            <span aria-hidden="true">◉</span>
          </NavLink>
        </div>

            </div>
            <ProductPreview/>
        </section>    
);
}
