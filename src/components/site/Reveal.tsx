import { useReveal } from "@/hooks/use-reveal";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "zoom" | "fade";
  as?: "div" | "section";
  id?: string;
};

const variantClass: Record<NonNullable<Props["variant"]>, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
  fade: "reveal-fade",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  as: Tag = "div",
  id,
}: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      id={id}
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${variantClass[variant]} ${shown ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
