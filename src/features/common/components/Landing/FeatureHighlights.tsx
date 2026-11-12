const features = [
  {
    icon: "👥",
    title: "Collaborate seamlessly",
    description: "Keep your team aligned from planning to delivery.",
  },
  {
    icon: "▣",
    title: "Plan with clarity",
    description: "Organize tasks and deadlines in one workspace.",
  },
  {
    icon: "↗",
    title: "Track progress",
    description: "Understand what is moving forward and what is blocked.",
  },
  {
    icon: "✓",
    title: "Secure by default",
    description: "Protect your team's work with reliable access controls.",
  },
];

export function FeatureHighlights() {
  return (
    <section
      id="features"
      className="grid gap-2 pb-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {features.map((feature) => (
        <article
          key={feature.title}
          className="flex gap-3 rounded-lg border border-white/10 bg-surface/80 p-4"
        >
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
            {feature.icon}
          </div>

          <div>
            <h2 className="text-xs font-semibold text-white">
              {feature.title}
            </h2>
            <p className="mt-1 text-[10px] leading-relaxed text-muted">
              {feature.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
