import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12 2xl:px-20",
        // Wide sections fill the screen up to very large monitors (only the
        // side padding remains); default sections stay a touch narrower.
        size === "default" && "max-w-[1600px]",
        size === "wide" && "max-w-[2000px]",
        size === "narrow" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "default",
  as: Tag = "section",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "paper" | "card" | "ink";
  as?: "section" | "div" | "footer" | "article";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-14 md:py-24",
        tone === "paper" && "bg-grain",
        tone === "card" && "bg-card",
        tone === "ink" && "bg-ink text-ink-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "muted" | "light";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em]",
        tone === "brand" && "text-primary",
        tone === "muted" && "text-muted-foreground",
        tone === "light" && "text-ink-foreground/80",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "start",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-[1.875rem] leading-[1.08] sm:text-[2.5rem]", titleClassName)}>
        {title}
      </h2>
      {body && (
        <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}
