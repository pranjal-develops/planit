import { ProductPreview } from "./Preview/ProductPreview";

export function HeroSection() {
  return (
    <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
      <div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          A better way to manage your work
        </p>

        <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
          Organize tasks.
          <br />
          Plan together.
          <br />
          <span className="text-accent">Achieve more.</span>
        </h1>

        <p className="mt-6 max-w-md text-sm leading-7 text-muted">
          The all-in-one workspace for managing tasks, calendars, projects,
          and team collaboration.
        </p>

        <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <a
            href="/signup"
            className="rounded-md bg-accent px-5 py-3 text-center text-xs font-semibold text-black transition hover:bg-accent-hover focus-ring"
          >
            Get started for free →
          </a>

          <a
            href="#demo"
            className="flex items-center justify-center gap-2 text-xs text-white transition hover:text-accent focus-ring"
          >
            Watch demo
            <span aria-hidden="true">◉</span>
          </a>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex -space-x-2">
            {["A", "M", "S", "J"].map((letter, index) => (
              <span
                key={letter}
                className={`grid h-8 w-8 place-items-center rounded-full border-2 border-page text-[10px] font-semibold ${
                  index % 2 === 0
                    ? "bg-teal-700 text-teal-100"
                    : "bg-purple-700 text-purple-100"
                }`}
              >
                {letter}
              </span>
            ))}
          </div>

          <div>
            <div className="text-xs tracking-widest text-yellow-400">
              ★★★★★
            </div>
            <p className="text-[10px] text-muted">Loved by productive teams</p>
          </div>
        </div>
      </div>

      <ProductPreview />
    </section>
  );
}
