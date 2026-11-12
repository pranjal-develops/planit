import { MdOutlineCheck, MdPeople } from "react-icons/md";
import { RxPaperPlane } from "react-icons/rx";
import { PiNotePencilLight } from "react-icons/pi";
import Card from "../../../Primitives/Card";

const features = [
  {
    icon: <MdPeople />,
    title: "Collaborate seamlessly",
    description: "Keep your team aligned from planning to delivery.",
  },
  {
    icon: <RxPaperPlane />,
    title: "Plan with clarity",
    description: "Organize tasks and deadlines in one workspace.",
  },
  {
    icon: <PiNotePencilLight />,
    title: "Track progress",
    description: "Understand what is moving forward and what is blocked.",
  },
  {
    icon: <MdOutlineCheck />,
    title: "Secure by default",
    description: "Protect your team's work with reliable access controls.",
  },
];

export function Highlights() {
  return (
    <section
      id="features"
      className="grid gap-2 pb-8 sm:grid-cols-2 lg:grid-cols-4"
    >
      {features.map((feature) => (
        <Card>
        <article
          key={feature.title}
          className="flex gap-3 rounded-lg border border-(--primary-border) p-4 items-center"
        >
          <div className="flex shrink-0 h-15 w-15 rounded-md bg-(--secondary-accent-bg) text-(--accent-bg) text-2xl p-2 justify-center items-center">
            {feature.icon}
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              {feature.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-(--secondary-text)">
              {feature.description}
            </p>
          </div>
        </article>
        </Card>
      ))}
    </section>
  );
}
