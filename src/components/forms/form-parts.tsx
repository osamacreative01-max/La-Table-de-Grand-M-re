import { cn } from "@/lib/utils";
import type { FieldError } from "@/app/actions";
export const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground/60 focus-visible:border-brand/60 focus-visible:ring-3 focus-visible:ring-brand/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20";

export const textareaClass =
  "min-h-32 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground/60 focus-visible:border-brand/60 focus-visible:ring-3 focus-visible:ring-brand/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20";

export const selectClass = cn(inputClass, "appearance-none pr-10");

export function FieldShell({
  id,
  label,
  optional,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium">
        <span>{label}</span>
        {optional && (
          <span className="text-[0.68rem] font-normal uppercase tracking-[0.1em] text-muted-foreground">
            {optional}
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function errorText(lang: "fr" | "en", error?: FieldError) {
  if (!error) return undefined;
  const map = {
    fr: {
      required: "Champ obligatoire",
      invalid: "Veuillez vérifier ce champ",
      "too-long": "Ce texte est trop long",
    },
    en: {
      required: "Required field",
      invalid: "Please check this field",
      "too-long": "This text is too long",
    },
  } as const;
  return map[lang][error];
}
