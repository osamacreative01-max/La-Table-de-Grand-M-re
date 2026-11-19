import type { Category, Product } from "./types";

/**
 * Seven categories, in the order approved in the developer guide.
 */
export const categories: Category[] = [
  {
    key: "fruits-legumes",
    slug: { fr: "fruits-legumes-en-conserve", en: "canned-fruits-vegetables" },
    name: {
      fr: "Fruits et légumes en conserve",
      en: "Canned Fruits & Vegetables",
    },
    intro: {
      fr: "Des fruits et légumes pratiques pour les collations, les accompagnements et les repas du quotidien.",
      en: "Convenient fruits and vegetables for snacks, sides and everyday meals.",
    },
    caption: { fr: "Légumes colorés dans un bol", en: "Colourful vegetables in a bowl" },
    image: "/products/whole-peeled-tomatoes.webp",
    tone: "wheat",
  },
  {
    key: "haricots-legumineuses",
    slug: { fr: "haricots-et-pois-chiches-en-conserve", en: "canned-beans-chickpeas" },
    name: {
      fr: "Haricots et pois chiches en conserve",
      en: "Canned Beans & Chickpeas",
    },
    intro: {
      fr: "Des essentiels du garde-manger pour les salades, les chilis et les repas qui réchauffent.",
      en: "Pantry essentials for salads, chilis and comforting meals.",
    },
    caption: { fr: "Haricots et pois chiches", en: "Beans and chickpeas" },
    image: "/products/red-kidney-beans.webp",
    tone: "clay",
  },
  {
    key: "legumineuses-seches",
    slug: { fr: "legumineuses-seches", en: "dry-beans-legumes" },
    name: {
      fr: "Légumineuses sèches",
      en: "Dry Beans & Legumes",
    },
    intro: {
      fr: "Pour prendre plaisir à cuisiner des soupes, des salades et des plats mijotés.",
      en: "For making soups, salads and hearty home cooked dishes.",
    },
    caption: { fr: "Lentilles et haricots secs", en: "Lentils and dry beans" },
    tone: "sage",
  },
  {
    key: "riz-pates-nouilles",
    slug: { fr: "riz-pates-et-nouilles", en: "rice-pasta-noodles" },
    name: {
      fr: "Riz, pâtes et nouilles",
      en: "Rice, Pasta & Noodles",
    },
    intro: {
      fr: "Des ingrédients polyvalents pour les recettes préférées de toute la famille.",
      en: "Versatile ingredients for the whole family's favourite meals.",
    },
    caption: { fr: "Riz, pâtes et nouilles", en: "Rice, pasta and noodles" },
    tone: "linen",
  },
  {
    key: "poissons",
    slug: { fr: "poissons-en-conserve", en: "canned-fish" },
    name: {
      fr: "Poissons en conserve",
      en: "Canned Fish",
    },
    intro: {
      fr: "Des idées faciles pour les lunchs, les salades et les repas improvisés.",
      en: "Easy options for lunches, salads and quick meals.",
    },
    caption: { fr: "Poissons en conserve", en: "Canned fish" },
    tone: "honey",
  },
  {
    key: "viandes",
    slug: { fr: "viandes-en-conserve", en: "canned-meats" },
    name: {
      fr: "Viandes en conserve",
      en: "Canned Meats",
    },
    intro: {
      fr: "Des produits pratiques pour préparer sandwichs, lunchs et repas rapides.",
      en: "Convenient products for sandwiches, lunches and quick meals.",
    },
    caption: { fr: "Viandes en conserve", en: "Canned meats" },
    tone: "cocoa",
  },
  {
    key: "tartinades",
    slug: { fr: "tartinades", en: "spreads" },
    name: {
      fr: "Tartinades",
      en: "Spreads",
    },
    intro: {
      fr: "De quoi accompagner les déjeuners, les collations et les petites faims.",
      en: "For breakfasts, snacks and quick bites.",
    },
    caption: { fr: "Tartinade sur rôtie", en: "Spread on toast" },
    tone: "honey",
  },
];

/**
 * Products, exact names and descriptions from the guide.
 * Pack sizes, ingredients and nutrition facts are intentionally absent:
 * the owner must approve them before publication.
 */
export const products: Product[] = [
  {
    key: "mais-en-creme",
    category: "fruits-legumes",
    slug: { fr: "mais-en-creme", en: "cream-style-corn" },
    name: { fr: "Maïs en crème", en: "Cream Style Corn" },
    description: {
      fr: "Une touche douce et onctueuse pour accompagner les soupers en famille ou enrichir vos recettes préférées.",
      en: "A smooth and comforting side for family dinners, or a simple addition to favourite recipes.",
    },
    image: "/products/creamed-corn.webp",
    tone: "wheat",
  },
  {
    key: "legumes-melanges",
    category: "fruits-legumes",
    slug: { fr: "legumes-melanges-en-conserve", en: "canned-mixed-vegetables" },
    name: { fr: "Légumes mélangés en conserve", en: "Canned Mixed Vegetables" },
    description: {
      fr: "Un mélange pratique de légumes pour ajouter de la couleur aux soupers, aux soupes et aux plats du quotidien.",
      en: "A convenient vegetable mix that adds colour to dinners, soups and everyday meals.",
    },
    image: "/products/mixed-vegetables.webp",
    tone: "sage",
  },
  {
    key: "pois-verts",
    category: "fruits-legumes",
    slug: { fr: "pois-verts-en-conserve", en: "canned-green-peas" },
    name: { fr: "Pois verts en conserve", en: "Canned Green Peas" },
    description: {
      fr: "Un classique du garde-manger qui accompagne naturellement les plats préférés de la famille.",
      en: "A pantry classic that makes an easy side for family favourite dishes.",
    },
    image: "/products/green-peas.webp",
    tone: "sage",
  },
  {
    key: "pois-et-carottes",
    category: "fruits-legumes",
    slug: { fr: "pois-et-carottes-en-conserve", en: "canned-peas-carrots" },
    name: { fr: "Pois et carottes en conserve", en: "Canned Peas & Carrots" },
    description: {
      fr: "Deux légumes bien connus, réunis pour des accompagnements simples et colorés.",
      en: "Two familiar vegetables together for colourful, easy side dishes.",
    },
    image: "/products/peas-and-carrots.webp",
    tone: "honey",
  },
  {
    key: "fruits-en-conserve",
    category: "fruits-legumes",
    slug: { fr: "fruits-en-conserve", en: "canned-fruits" },
    name: { fr: "Fruits en conserve", en: "Canned Fruits" },
    description: {
      fr: "Une touche fruitée pour les desserts, les collations et les petites douceurs à partager.",
      en: "A fruity addition to desserts, snacks and sweet moments worth sharing.",
    },
    tone: "honey",
  },
  {
    key: "tomates-entieres-pelees",
    category: "fruits-legumes",
    slug: { fr: "tomates-entieres-pelees", en: "whole-peeled-tomatoes" },
    name: { fr: "Tomates entières pelées", en: "Whole Peeled Tomatoes" },
    description: {
      fr: "Des tomates entières pelées, prêtes à ajouter aux sauces, aux soupes et aux plats mijotés.",
      en: "Whole peeled tomatoes, ready for sauces, soups and slow simmered dishes.",
    },
    image: "/products/whole-peeled-tomatoes.webp",
    tone: "clay",
  },
  {
    key: "san-marzano",
    category: "fruits-legumes",
    slug: { fr: "tomates-san-marzano", en: "san-marzano-tomatoes" },
    name: { fr: "Tomates San Marzano D.O.P.", en: "San Marzano D.O.P. Tomatoes" },
    description: {
      fr: "Des tomates San Marzano D.O.P. pour les sauces, les pâtes et les recettes qui méritent le meilleur.",
      en: "San Marzano D.O.P. tomatoes for sauces, pasta and recipes that deserve the best.",
    },
    image: "/products/san-marzano.webp",
    tone: "clay",
  },
  {
    key: "haricots-rouges",
    category: "haricots-legumineuses",
    slug: { fr: "haricots-rouges-en-conserve", en: "canned-red-kidney-beans" },
    name: { fr: "Haricots rouges en conserve", en: "Canned Red Kidney Beans" },
    description: {
      fr: "Un ingrédient polyvalent pour préparer chilis, salades et plats mijotés.",
      en: "A versatile ingredient for chilis, salads and hearty slow simmered meals.",
    },
    image: "/products/red-kidney-beans.webp",
    tone: "clay",
  },
  {
    key: "haricots-pinto",
    category: "haricots-legumineuses",
    slug: { fr: "haricots-pinto-en-conserve", en: "canned-pinto-beans" },
    name: { fr: "Haricots pinto en conserve", en: "Canned Pinto Beans" },
    description: {
      fr: "De bons haricots à ajouter aux bols repas, aux soupes et à vos recettes de tous les jours.",
      en: "Great in meal bowls, soups and everyday recipes.",
    },
    image: "/products/pinto-beans.webp",
    tone: "cocoa",
  },
  {
    key: "haricots-noirs",
    category: "haricots-legumineuses",
    slug: { fr: "haricots-noirs-en-conserve", en: "canned-black-beans" },
    name: { fr: "Haricots noirs en conserve", en: "Canned Black Beans" },
    description: {
      fr: "Une belle façon de varier les salades, les bols repas et les plats inspirés de partout.",
      en: "A tasty way to add variety to salads, meal bowls and dishes from many traditions.",
    },
    image: "/products/black-beans.webp",
    tone: "cocoa",
  },
  {
    key: "pois-chiches",
    category: "haricots-legumineuses",
    slug: { fr: "pois-chiches-en-conserve", en: "canned-chickpeas" },
    name: { fr: "Pois chiches en conserve", en: "Canned Chickpeas" },
    description: {
      fr: "Pratiques pour préparer des salades, des soupes ou un repas improvisé en toute simplicité.",
      en: "Convenient for salads, soups and easy last minute meals.",
    },
    image: "/products/chick-peas.webp",
    tone: "wheat",
  },
  {
    key: "feves-au-boeuf",
    category: "haricots-legumineuses",
    slug: { fr: "feves-au-boeuf", en: "baked-beans-with-beef" },
    name: { fr: "Fèves au bœuf", en: "Baked Beans with Beef" },
    description: {
      fr: "Un plat réconfortant à servir au déjeuner ou en accompagnement d'un bon repas.",
      en: "A comforting option for breakfast or as a side with a satisfying meal.",
    },
    image: "/products/baked-beans.webp",
    tone: "clay",
  },
  {
    key: "pois-chiches-secs",
    category: "legumineuses-seches",
    slug: { fr: "pois-chiches-secs", en: "dry-chickpeas" },
    name: { fr: "Pois chiches secs", en: "Dry Chickpeas" },
    description: {
      fr: "À faire tremper et à cuisiner pour préparer des plats généreux, des salades et des recettes maison.",
      en: "Soak and cook for hearty meals, salads and favourite homemade dishes.",
    },
    tone: "wheat",
  },
  {
    key: "lentilles-seches",
    category: "legumineuses-seches",
    slug: { fr: "lentilles-seches", en: "dry-lentils" },
    name: { fr: "Lentilles sèches", en: "Dry Lentils" },
    description: {
      fr: "Un incontournable pour les soupes, les mijotés et les repas réconfortants.",
      en: "A pantry staple for soups, simmered dishes and comforting meals.",
    },
    tone: "sage",
  },
  {
    key: "haricots-secs",
    category: "legumineuses-seches",
    slug: { fr: "haricots-secs", en: "dry-beans" },
    name: { fr: "Haricots secs", en: "Dry Beans" },
    description: {
      fr: "Pour les recettes qu'on laisse doucement mijoter et qu'on aime partager autour de la table.",
      en: "For slowly simmered recipes and good meals shared around the table.",
    },
    tone: "clay",
  },
  {
    key: "riz",
    category: "riz-pates-nouilles",
    slug: { fr: "riz", en: "rice" },
    name: { fr: "Riz", en: "Rice" },
    description: {
      fr: "Un incontournable du garde-manger pour accompagner les plats en famille et cuisiner une foule de recettes.",
      en: "A pantry essential for family meals and countless everyday recipes.",
    },
    tone: "linen",
  },
  {
    key: "pates-alimentaires",
    category: "riz-pates-nouilles",
    slug: { fr: "pates-alimentaires", en: "pasta" },
    name: { fr: "Pâtes alimentaires", en: "Pasta" },
    description: {
      fr: "Pour les soupers pressés, les repas en famille et les recettes que tout le monde aime retrouver.",
      en: "For busy weeknight dinners, family meals and the recipes everyone asks for again.",
    },
    tone: "honey",
  },
  {
    key: "nouilles",
    category: "riz-pates-nouilles",
    slug: { fr: "nouilles", en: "noodles" },
    name: { fr: "Nouilles", en: "Noodles" },
    description: {
      fr: "Pratiques pour préparer des soupes, des plats sautés et des soupers réconfortants.",
      en: "Handy for soups, stir fries and comforting dinners.",
    },
    tone: "wheat",
  },
  {
    key: "thon",
    category: "poissons",
    slug: { fr: "thon-en-conserve", en: "canned-tuna" },
    name: { fr: "Thon en conserve", en: "Canned Tuna" },
    description: {
      fr: "Un essentiel pratique pour les sandwichs, les salades et les lunchs du quotidien.",
      en: "A convenient essential for sandwiches, salads and everyday lunches.",
    },
    tone: "honey",
  },
  {
    key: "sardines",
    category: "poissons",
    slug: { fr: "sardines-en-conserve", en: "canned-sardines" },
    name: { fr: "Sardines en conserve", en: "Canned Sardines" },
    description: {
      fr: "À déguster sur des rôties, dans une salade ou dans un repas simple et savoureux.",
      en: "Enjoy on toast, in a salad or as part of a simple, tasty meal.",
    },
    tone: "sage",
  },
  {
    key: "poulet",
    category: "viandes",
    slug: { fr: "viande-a-sandwich-au-poulet", en: "chicken-luncheon-meat" },
    name: { fr: "Viande à sandwich au poulet", en: "Chicken Luncheon Meat" },
    description: {
      fr: "Pratique pour préparer des sandwichs, des lunchs et des repas rapides selon vos envies.",
      en: "Convenient for sandwiches, lunches and quick meals made your way.",
    },
    tone: "linen",
  },
  {
    key: "boeuf",
    category: "viandes",
    slug: { fr: "viande-a-sandwich-au-boeuf", en: "beef-luncheon-meat" },
    name: { fr: "Viande à sandwich au bœuf", en: "Beef Luncheon Meat" },
    description: {
      fr: "Une option facile à intégrer aux sandwichs, aux lunchs et aux petites faims.",
      en: "An easy option for sandwiches, packed lunches and quick bites.",
    },
    tone: "cocoa",
  },
  {
    key: "beurre-darachide",
    category: "tartinades",
    slug: { fr: "beurre-darachide", en: "peanut-butter" },
    name: { fr: "Beurre d'arachide", en: "Peanut Butter" },
    description: {
      fr: "Un classique à tartiner sur les rôties, à savourer en collation ou à utiliser dans vos recettes.",
      en: "A classic for toast, snacks and favourite recipes.",
    },
    tone: "honey",
  },
];

export const recipes = [
  { key: "salade-pois-chiches", tone: "sage" as const },
  { key: "riz-legumes", tone: "wheat" as const },
  { key: "salade-pates-thon", tone: "linen" as const },
  { key: "soupe-lentilles", tone: "clay" as const },
  { key: "salade-haricots", tone: "cocoa" as const },
  { key: "dessert-fruits", tone: "honey" as const },
]
