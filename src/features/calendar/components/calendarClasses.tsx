/**
 * calendarClasses.ts
 *
 * Shared Tailwind class strings and SVG helpers used by EventCalendar.
 * Kept in a separate file so EventCalendar.tsx only exports a React component
 * and Vite Fast Refresh works correctly.
 */

import { joinClassNames } from '@fullcalendar/react'

// ---------------------------------------------------------------------------
// Outline / focus ring
// ---------------------------------------------------------------------------

/** Applied to every interactive element on keyboard focus */
export const outlineWidthFocusClass = 'focus-visible:outline-3'

/** Accent-colored outline (uses --fc-monarch-outline CSS var) */
export const outlineColorClass = 'outline-(--fc-monarch-outline)'

// ---------------------------------------------------------------------------
// Neutral button surfaces
// ---------------------------------------------------------------------------

/**
 * Solid pressable — layered gradient over the background surface.
 * Used on the "more events" overflow pill in column/week views.
 */
export const strongSolidPressableClass = joinClassNames(
  '[background:linear-gradient(var(--fc-monarch-strong),var(--fc-monarch-strong))_var(--fc-monarch-background)]',
  'hover:[background:linear-gradient(var(--fc-monarch-stronger),var(--fc-monarch-stronger))_var(--fc-monarch-background)]',
  'active:[background:linear-gradient(var(--fc-monarch-strongest),var(--fc-monarch-strongest))_var(--fc-monarch-background)]',
)

/**
 * Muted pressable — subtle tinted bg on hover/focus/active.
 * Used on list events, more-links, popover close, and unselected toolbar buttons.
 */
export const mutedHoverPressableClass =
  'hover:bg-(--fc-monarch-muted) focus-visible:bg-(--fc-monarch-muted) active:bg-(--fc-monarch-strong)'

// ---------------------------------------------------------------------------
// Secondary (calendar content badge color)
// ---------------------------------------------------------------------------

/**
 * Secondary static — used on week-number badges and inline indicators
 * when they are not interactive.
 */
export const secondaryClass =
  'bg-(--fc-monarch-secondary) text-(--fc-monarch-secondary-foreground)'

/**
 * Secondary pressable — same badge but clickable (e.g. week-number nav links).
 */
export const secondaryPressableClass = `${secondaryClass} hover:bg-(--fc-monarch-secondary-over) active:bg-(--fc-monarch-secondary-down) ${outlineColorClass} ${outlineWidthFocusClass}`

// ---------------------------------------------------------------------------
// Interactive muted foreground
// ---------------------------------------------------------------------------

/**
 * Muted-fg group pressable — text starts muted, becomes full foreground when
 * the parent group is hovered or focused. Used on toolbar icon buttons.
 */
export const mutedFgPressableGroupClass =
  'text-(--fc-monarch-muted-foreground) group-hover:text-(--fc-monarch-foreground) group-focus-visible:text-(--fc-monarch-foreground)'

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

/**
 * Chevron-down icon (Google Material style).
 * Exported so parent pages can reuse the same icon in custom toolbar buttons.
 */
export function chevronDown(className?: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="20"
      height="20"
      viewBox="80 -880 800 800"
      fill="currentColor"
    >
      <path d="M480-304 240-544l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  )
}
