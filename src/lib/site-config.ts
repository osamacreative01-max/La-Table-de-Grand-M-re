export const siteConfig = {
  name: "La Table de Grand",
  shortName: "La Table",
  description:
    "A seasonal French table in the heart of the city. Wood-fired plates, a short wine list, and a room built for long evenings.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  contact: {
    email: "bonjour@latabledegrand.com",
    phone: "+1 (555) 010-2030",
    address: {
      street: "12 Rue des Orfèvres",
      city: "Montréal",
      region: "QC",
      postalCode: "H2Y 1B6",
      country: "CA",
    },
  },
  openingHours: [
    { days: "Tuesday – Thursday", hours: "17:30 – 22:00" },
    { days: "Friday – Saturday", hours: "17:00 – 23:00" },
    { days: "Sunday", hours: "11:00 – 15:00" },
    { days: "Monday", hours: "Closed" },
  ],
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
  { href: "/contact", label: "Contact" },
];
