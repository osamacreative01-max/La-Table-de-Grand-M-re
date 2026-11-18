import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24 md:py-36">
        <Badge variant="outline" className="mb-8 w-fit border-brand/40 text-brand">
          Est. 2014 · {siteConfig.contact.address.city}
        </Badge>

        <h1 className="max-w-3xl text-5xl leading-[1.05] tracking-tight md:text-7xl">
          A table set for the season.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button size="xl" render={<Link href="/reservations" />}>
            Reserve a table
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button size="xl" variant="ghost" render={<Link href="/menu" />}>
            View the menu
          </Button>
        </div>

        <Separator className="my-14" />

        <dl className="grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Hours</dt>
            <dd className="mt-2 space-y-1">
              {siteConfig.openingHours.slice(0, 2).map((slot) => (
                <span key={slot.days} className="block">
                  {slot.days} · {slot.hours}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Address</dt>
            <dd className="mt-2 leading-relaxed">
              {siteConfig.contact.address.street}
              <br />
              {siteConfig.contact.address.city}, {siteConfig.contact.address.region}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Contact</dt>
            <dd className="mt-2 leading-relaxed">
              <a className="hover:text-brand" href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                {siteConfig.contact.phone}
              </a>
              <br />
              <a className="hover:text-brand" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
