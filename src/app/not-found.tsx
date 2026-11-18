import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-7xl text-brand">404</p>
      <h1 className="mt-4 text-3xl">This table isn&apos;t set</h1>
      <p className="mt-3 text-muted-foreground">
        The page you asked for has been cleared away. The menu, however, is still on.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />}>Back to the start</Button>
        <Button variant="ghost" render={<Link href="/menu" />}>
          See the menu
        </Button>
      </div>
    </main>
  );
}
