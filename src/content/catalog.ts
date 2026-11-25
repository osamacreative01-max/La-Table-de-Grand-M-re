import type { Category, Product } from "./types";

/**
 * Ranges follow the client's product portfolios: canned fruit, canned
 * vegetables, beans, dried pulses, rice/pasta/noodles, seafood, canned meats
 * and spreads. Names, formats and weights come from the supplied mockups.
 */
export const categories: Category[] = [
  {
    key: "fruits",
    slug: { fr: "fruits-en-conserve", en: "canned-fruits" },
    name: {
      fr: "Fruits en conserve",
      en: "Canned Fruit",
    },
    intro: {
      fr: "Des fruits sélectionnés avec soin, prêts à ajouter aux desserts, aux collations et aux petits déjeuners.",
      en: "Thoughtfully selected fruits, ready for desserts, snacks and breakfasts.",
    },
    caption: {
      fr: "Pêches, ananas et fruits tropicaux en conserve",
      en: "Canned peaches, pineapple and tropical fruit",
    },
    image: "/products/fruit-cocktail.webp",
    tone: "honey",
  },
  {
    key: "legumes",
    slug: { fr: "legumes-en-conserve", en: "canned-vegetables" },
    name: {
      fr: "Légumes en conserve",
      en: "Canned Vegetables",
    },
    intro: {
      fr: "Des légumes pratiques pour les accompagnements, les soupes et les repas du quotidien.",
      en: "Convenient vegetables for sides, soups and everyday meals.",
    },
    caption: { fr: "Légumes colorés en conserve", en: "Colourful canned vegetables" },
    image: "/products/mixed-vegetables.webp",
    tone: "sage",
  },
  {
    key: "haricots",
    slug: { fr: "haricots-et-pois-chiches", en: "beans-chickpeas" },
    name: {
      fr: "Haricots et pois chiches",
      en: "Beans & Chickpeas",
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
    key: "seches",
    slug: { fr: "legumineuses-seches", en: "dried-pulses" },
    name: {
      fr: "Légumineuses sèches",
      en: "Dried Pulses",
    },
    intro: {
      fr: "Des sachets de 500 g pour cuisiner en quantité : soupes, mijotés et repas à partager.",
      en: "500 g bags for batch cooking: soups, braises and meals to share.",
    },
    caption: { fr: "Lentilles et haricots secs", en: "Lentils and dried beans" },
    image: "/products/range-dried-pulses.webp",
    tone: "wheat",
  },
  {
    key: "riz-pates-nouilles",
    slug: { fr: "riz-pates-et-nouilles", en: "rice-pasta-noodles" },
    name: {
      fr: "Riz, pâtes et nouilles",
      en: "Rice, Pasta & Noodles",
    },
    intro: {
      fr: "Des ingrédients polyvalents et nos nouilles instantanées relevées, pour les repas pressés comme les soupers en famille.",
      en: "Versatile ingredients and our bold instant noodles, for busy weeknights and family dinners.",
    },
    caption: { fr: "Riz, pâtes et nouilles", en: "Rice, pasta and noodles" },
    image: "/products/range-instant-noodles.webp",
    tone: "linen",
  },
  {
    key: "poissons",
    slug: { fr: "poissons-et-fruits-de-mer", en: "seafood" },
    name: {
      fr: "Poissons et fruits de mer",
      en: "Seafood",
    },
    intro: {
      fr: "Conserves et produits surgelés : sardines, thon, filets de basa, moules et palourdes.",
      en: "Canned and frozen seafood: sardines, tuna, basa fillets, mussels and clams.",
    },
    caption: { fr: "Poissons et fruits de mer", en: "Fish and seafood" },
    image: "/products/range-seafood.webp",
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
      fr: "Des viandes à lunch pratiques pour les sandwichs, les lunchs et les repas rapides.",
      en: "Convenient luncheon meats for sandwiches, packed lunches and quick meals.",
    },
    caption: { fr: "Viandes à lunch en conserve", en: "Canned luncheon meats" },
    image: "/products/range-canned-meats.webp",
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
      fr: "Beurre d'arachide croquant, crémeux ou au chocolat, pour les rôties et les collations.",
      en: "Crunchy, smooth or chocolate peanut butter for toast and snacks.",
    },
    caption: { fr: "Beurre d'arachide sur rôtie", en: "Peanut butter on toast" },
    image: "/products/range-peanut-butter.webp",
    tone: "honey",
  },
];

const can = { fr: "Conserve", en: "Can" } as const;
const easyCan = { fr: "Boîte à ouverture facile", en: "Ring-pull can" } as const;

export const products: Product[] = [
  // ── Canned fruit ────────────────────────────────────────────────
  {
    key: "peches-en-morceaux",
    category: "fruits",
    slug: { fr: "peches-en-morceaux", en: "peach-chunks" },
    name: { fr: "Pêches en morceaux", en: "Peach Chunks" },
    description: {
      fr: "Des morceaux de pêche généreux, parfaits pour un crumble, une salade de fruits ou un dessert improvisé.",
      en: "Generous peach pieces, perfect for a crumble, a fruit salad or an impromptu dessert.",
    },
    serving: {
      fr: "Dans un crumble aux pêches.",
      en: "Bake into a peach crumble.",
    },
    image: "/products/peach-chunks.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "peches-en-cubes",
    category: "fruits",
    slug: { fr: "peches-en-cubes", en: "peach-dices" },
    name: { fr: "Pêches en cubes", en: "Peach Dices" },
    description: {
      fr: "De petits cubes de pêche, faciles à répartir sur un yogourt, un gruau ou une gaufre.",
      en: "Small peach cubes, easy to spoon over yogurt, oatmeal or waffles.",
    },
    serving: {
      fr: "En garniture sur un bol de yogourt.",
      en: "Spoon over a bowl of yogurt.",
    },
    image: "/products/peach-dices.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "peches-en-moities",
    category: "fruits",
    slug: { fr: "peches-en-moities", en: "peach-halves" },
    name: { fr: "Pêches en moitiés", en: "Peach Halves" },
    description: {
      fr: "Des demi-pêches moelleuses, à servir telles quelles ou légèrement réchauffées.",
      en: "Tender peach halves, ready to serve as is or gently warmed.",
    },
    serving: {
      fr: "Avec une boule de crème glacée à la vanille.",
      en: "Serve with a scoop of vanilla ice cream.",
    },
    image: "/products/peach-halves.webp",
    format: can,
    tone: "wheat",
  },
  {
    key: "poires-en-tranches",
    category: "fruits",
    slug: { fr: "poires-en-tranches", en: "pear-slices" },
    name: { fr: "Poires en tranches", en: "Pear Slices" },
    description: {
      fr: "Des tranches de poire régulières, prêtes pour les tartes, les salades et les plateaux de fromage.",
      en: "Even pear slices, ready for tarts, salads and cheese boards.",
    },
    serving: {
      fr: "Disposées en éventail sur une tarte.",
      en: "Fan the slices over a tart.",
    },
    image: "/products/pear-slices.webp",
    format: can,
    tone: "sage",
  },
  {
    key: "poires-en-moities",
    category: "fruits",
    slug: { fr: "poires-en-moities", en: "pear-halves" },
    name: { fr: "Poires en moitiés", en: "Pear Halves" },
    description: {
      fr: "Des demi-poires fondantes, un dessert simple à servir avec du chocolat ou une crème.",
      en: "Soft pear halves, an easy dessert with chocolate or cream.",
    },
    serving: {
      fr: "Avec du chocolat fondu, façon poire Belle-Hélène.",
      en: "Serve with melted chocolate, Belle Hélène style.",
    },
    image: "/products/pear-halves.webp",
    format: can,
    tone: "wheat",
  },
  {
    key: "ananas-en-tranches",
    category: "fruits",
    slug: { fr: "ananas-en-tranches", en: "pineapple-slices" },
    name: { fr: "Ananas en tranches", en: "Pineapple Slices" },
    description: {
      fr: "Des tranches d'ananas dorées, à déposer sur un gâteau, une pizza ou un plateau de fruits.",
      en: "Golden pineapple slices for cakes, pizzas or a fruit platter.",
    },
    serving: {
      fr: "En rosace sur un gâteau renversé.",
      en: "Arrange in a ring on an upside-down cake.",
    },
    image: "/products/pineapple-slices.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "ananas-en-morceaux",
    category: "fruits",
    slug: { fr: "ananas-en-morceaux", en: "pineapple-chunks" },
    name: { fr: "Ananas en morceaux", en: "Pineapple Chunks" },
    description: {
      fr: "Des morceaux d'ananas juteux, prêts pour les salsas, les salades et les brochettes.",
      en: "Juicy pineapple chunks, ready for salsas, salads and skewers.",
    },
    serving: {
      fr: "Dans une salsa à la coriandre et à la lime.",
      en: "Toss into a cilantro-lime salsa.",
    },
    image: "/products/pineapple-chunks.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "quartiers-de-mandarines",
    category: "fruits",
    slug: { fr: "quartiers-de-mandarines", en: "mandarin-orange-segments" },
    name: {
      fr: "Quartiers de mandarines",
      en: "Mandarin Orange Segments",
    },
    description: {
      fr: "Des quartiers de mandarine brillants, faciles à ajouter aux salades et aux desserts.",
      en: "Bright mandarin segments, easy to add to salads and desserts.",
    },
    serving: {
      fr: "Dans une salade de verdures.",
      en: "Toss into a green salad.",
    },
    image: "/products/mandarin-orange-segments.webp",
    format: can,
    tone: "clay",
  },
  {
    key: "abricots-en-moities",
    category: "fruits",
    slug: { fr: "abricots-en-moities", en: "apricot-halves" },
    name: { fr: "Abricots en moitiés", en: "Apricot Halves" },
    description: {
      fr: "Des demi-abricots tendres, pour les tartelettes, les croustades et les plateaux de desserts.",
      en: "Tender apricot halves for tarts, crumbles and dessert platters.",
    },
    serving: {
      fr: "Sur une pâte feuilletée pour des tartelettes.",
      en: "Arrange on puff pastry for apricot tarts.",
    },
    image: "/products/apricot-halves.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "cerises",
    category: "fruits",
    slug: { fr: "cerises", en: "cherries" },
    name: { fr: "Cerises", en: "Cherries" },
    description: {
      fr: "Des cerises rouges et sucrées, à servir sur un gâteau, une glace ou un bol de yogourt.",
      en: "Sweet red cherries for cakes, ice cream or a bowl of yogurt.",
    },
    serving: {
      fr: "En garniture sur un gâteau au fromage.",
      en: "Spoon over cheesecake.",
    },
    image: "/products/cherries.webp",
    format: can,
    tone: "clay",
  },
  {
    key: "raisins-entiers",
    category: "fruits",
    slug: { fr: "raisins-entiers", en: "whole-grapes" },
    name: { fr: "Raisins entiers", en: "Whole Grapes" },
    description: {
      fr: "Des raisins entiers en conserve, une touche fruitée pour les coupes de fruits et les desserts.",
      en: "Whole canned grapes, a fruity touch for fruit cups and desserts.",
    },
    serving: {
      fr: "Dans une coupe de fruits.",
      en: "Serve in a fruit cup.",
    },
    image: "/products/whole-grapes.webp",
    format: can,
    tone: "sage",
  },
  {
    key: "tranches-de-mangue",
    category: "fruits",
    slug: { fr: "tranches-de-mangue", en: "mango-slices" },
    name: { fr: "Tranches de mangue", en: "Mango Slices" },
    description: {
      fr: "Des tranches de mangue parfumées, pour les desserts tropicaux, les salades et les smoothies.",
      en: "Fragrant mango slices for tropical desserts, salads and smoothies.",
    },
    serving: {
      fr: "Avec du riz gluant à la noix de coco.",
      en: "Serve with coconut sticky rice.",
    },
    image: "/products/mango-slices.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "litchis-entiers",
    category: "fruits",
    slug: { fr: "litchis-entiers", en: "whole-lychees" },
    name: { fr: "Litchis entiers", en: "Whole Lychees" },
    description: {
      fr: "Des litchis entiers, délicats et parfumés, à servir frais en dessert.",
      en: "Whole lychees, delicate and fragrant, served chilled as a dessert.",
    },
    serving: {
      fr: "Dans une coupe avec un sorbet à la lime.",
      en: "Serve in a dessert glass with lime sorbet.",
    },
    image: "/products/whole-lychees.webp",
    format: can,
    tone: "cream",
  },
  {
    key: "melange-fruits-tropicaux",
    category: "fruits",
    slug: { fr: "melange-de-fruits-tropicaux", en: "tropical-fruit-mix" },
    name: {
      fr: "Mélange de fruits tropicaux",
      en: "Tropical Fruit Mix",
    },
    description: {
      fr: "Un mélange coloré de fruits tropicaux, prêt pour les bols de yogourt et les déjeuners.",
      en: "A colourful tropical fruit mix, ready for yogurt bowls and breakfasts.",
    },
    serving: {
      fr: "Sur un bol de gruau au déjeuner.",
      en: "Spoon over a bowl of oatmeal.",
    },
    image: "/products/tropical-fruit-mix.webp",
    format: can,
    tone: "wheat",
  },
  {
    key: "salade-de-fruits",
    category: "fruits",
    slug: { fr: "salade-de-fruits", en: "fruit-cocktail" },
    name: { fr: "Salade de fruits", en: "Fruit Cocktail" },
    description: {
      fr: "Un mélange classique de fruits en conserve, pour les desserts, les salades et les verrines.",
      en: "A classic canned fruit mix for desserts, salads and parfaits.",
    },
    serving: {
      fr: "Dans une verrine de yogourt et de granola.",
      en: "Layer with yogurt and granola in a parfait.",
    },
    image: "/products/fruit-cocktail.webp",
    format: can,
    tone: "honey",
  },

  // ── Canned vegetables ───────────────────────────────────────────
  {
    key: "mais-en-creme",
    category: "legumes",
    slug: { fr: "mais-en-creme", en: "cream-style-corn" },
    name: { fr: "Maïs en crème", en: "Cream Style Corn" },
    description: {
      fr: "Une touche douce et onctueuse pour accompagner les soupers en famille ou enrichir vos recettes préférées.",
      en: "A smooth and comforting side for family dinners, or a simple addition to favourite recipes.",
    },
    image: "/products/creamed-corn.webp",
    format: can,
    tone: "wheat",
  },
  {
    key: "legumes-melanges",
    category: "legumes",
    slug: { fr: "legumes-melanges-en-conserve", en: "canned-mixed-vegetables" },
    name: { fr: "Légumes mélangés en conserve", en: "Canned Mixed Vegetables" },
    description: {
      fr: "Un mélange pratique de légumes pour ajouter de la couleur aux soupers, aux soupes et aux plats du quotidien.",
      en: "A convenient vegetable mix that adds colour to dinners, soups and everyday meals.",
    },
    image: "/products/mixed-vegetables.webp",
    format: can,
    tone: "sage",
  },
  {
    key: "pois-verts",
    category: "legumes",
    slug: { fr: "pois-verts-en-conserve", en: "canned-green-peas" },
    name: { fr: "Pois verts en conserve", en: "Canned Green Peas" },
    description: {
      fr: "Un classique du garde-manger qui accompagne naturellement les plats préférés de la famille.",
      en: "A pantry classic that makes an easy side for family favourite dishes.",
    },
    image: "/products/green-peas.webp",
    format: can,
    tone: "sage",
  },
  {
    key: "pois-et-carottes",
    category: "legumes",
    slug: { fr: "pois-et-carottes-en-conserve", en: "canned-peas-carrots" },
    name: { fr: "Pois et carottes en conserve", en: "Canned Peas & Carrots" },
    description: {
      fr: "Deux légumes bien connus, réunis pour des accompagnements simples et colorés.",
      en: "Two familiar vegetables together for colourful, easy side dishes.",
    },
    image: "/products/peas-and-carrots.webp",
    format: can,
    tone: "honey",
  },
  {
    key: "tomates-entieres-pelees",
    category: "legumes",
    slug: { fr: "tomates-entieres-pelees", en: "whole-peeled-tomatoes" },
    name: { fr: "Tomates entières pelées", en: "Whole Peeled Tomatoes" },
    description: {
      fr: "Des tomates entières pelées, prêtes à ajouter aux sauces, aux soupes et aux plats mijotés.",
      en: "Whole peeled tomatoes, ready for sauces, soups and slow simmered dishes.",
    },
    image: "/products/whole-peeled-tomatoes.webp",
    format: can,
    tone: "clay",
  },
  {
    key: "san-marzano",
    category: "legumes",
    slug: { fr: "tomates-san-marzano", en: "san-marzano-tomatoes" },
    name: { fr: "Tomates San Marzano D.O.P.", en: "San Marzano D.O.P. Tomatoes" },
    description: {
      fr: "Des tomates San Marzano D.O.P. pour les sauces, les pâtes et les recettes qui méritent le meilleur.",
      en: "San Marzano D.O.P. tomatoes for sauces, pasta and recipes that deserve the best.",
    },
    image: "/products/san-marzano.webp",
    format: can,
    tone: "clay",
  },

  // ── Beans and chickpeas ─────────────────────────────────────────
  {
    key: "haricots-rouges",
    category: "haricots",
    slug: { fr: "haricots-rouges-en-conserve", en: "canned-red-kidney-beans" },
    name: { fr: "Haricots rouges en conserve", en: "Canned Red Kidney Beans" },
    description: {
      fr: "Un ingrédient polyvalent pour préparer chilis, salades et plats mijotés.",
      en: "A versatile ingredient for chilis, salads and hearty slow simmered meals.",
    },
    image: "/products/red-kidney-beans.webp",
    format: can,
    tone: "clay",
  },
  {
    key: "haricots-pinto",
    category: "haricots",
    slug: { fr: "haricots-pinto-en-conserve", en: "canned-pinto-beans" },
    name: { fr: "Haricots pinto en conserve", en: "Canned Pinto Beans" },
    description: {
      fr: "De bons haricots à ajouter aux bols repas, aux soupes et à vos recettes de tous les jours.",
      en: "Great in meal bowls, soups and everyday recipes.",
    },
    image: "/products/pinto-beans.webp",
    format: can,
    tone: "cocoa",
  },
  {
    key: "haricots-noirs",
    category: "haricots",
    slug: { fr: "haricots-noirs-en-conserve", en: "canned-black-beans" },
    name: { fr: "Haricots noirs en conserve", en: "Canned Black Beans" },
    description: {
      fr: "Une belle façon de varier les salades, les bols repas et les plats inspirés de partout.",
      en: "A tasty way to add variety to salads, meal bowls and dishes from many traditions.",
    },
    image: "/products/black-beans.webp",
    format: can,
    tone: "cocoa",
  },
  {
    key: "pois-chiches",
    category: "haricots",
    slug: { fr: "pois-chiches-en-conserve", en: "canned-chickpeas" },
    name: { fr: "Pois chiches en conserve", en: "Canned Chickpeas" },
    description: {
      fr: "Pratiques pour préparer des salades, des soupes ou un repas improvisé en toute simplicité.",
      en: "Convenient for salads, soups and easy last minute meals.",
    },
    image: "/products/chick-peas.webp",
    format: can,
    tone: "wheat",
  },
  {
    key: "feves-au-boeuf",
    category: "haricots",
    slug: { fr: "feves-au-boeuf", en: "baked-beans-with-beef" },
    name: { fr: "Fèves au bœuf", en: "Baked Beans with Beef" },
    description: {
      fr: "Un plat réconfortant à servir au déjeuner ou en accompagnement d'un bon repas.",
      en: "A comforting option for breakfast or as a side with a satisfying meal.",
    },
    image: "/products/baked-beans.webp",
    format: can,
    tone: "clay",
  },

  // ── Dried pulses ────────────────────────────────────────────────
  {
    key: "lentilles-rouges-fendues",
    category: "seches",
    slug: { fr: "lentilles-rouges-fendues", en: "red-split-lentils" },
    name: { fr: "Lentilles rouges fendues", en: "Red Split Lentils" },
    description: {
      fr: "Des lentilles rouges fendues qui cuisent rapidement en soupe onctueuse ou en dahl.",
      en: "Red split lentils that cook quickly into a creamy soup or dal.",
    },
    format: { fr: "Sachet", en: "Bag" },
    netWeight: "500 g",
    image: "/products/red-split-lentils.webp",
    lifestyle: "/images/lifestyle-red-split-lentils.webp",
    tone: "clay",
  },
  {
    key: "haricots-pinto-secs",
    category: "seches",
    slug: { fr: "haricots-pinto-secs", en: "dried-pinto-beans" },
    name: { fr: "Haricots pinto secs", en: "Dried Pinto Beans" },
    description: {
      fr: "Des haricots pinto secs pour les bols repas, les soupes et les plats mijotés.",
      en: "Dried pinto beans for meal bowls, soups and slow simmered dishes.",
    },
    format: { fr: "Sachet", en: "Bag" },
    netWeight: "500 g",
    image: "/products/dried-pinto-beans.webp",
    tone: "wheat",
  },
  {
    key: "pois-chiches-secs",
    category: "seches",
    slug: { fr: "pois-chiches-secs", en: "dried-chickpeas" },
    name: { fr: "Pois chiches secs", en: "Dried Chickpeas" },
    description: {
      fr: "Des pois chiches secs à faire tremper et à cuisiner pour des salades, des soupes et des ragoûts.",
      en: "Dried chickpeas to soak and cook for salads, soups and stews.",
    },
    format: { fr: "Sachet", en: "Bag" },
    netWeight: "500 g",
    image: "/products/dried-chickpeas.webp",
    tone: "wheat",
  },

  // ── Rice, pasta and noodles ─────────────────────────────────────
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
    key: "nouilles-poulet-epice",
    category: "riz-pates-nouilles",
    slug: { fr: "nouilles-poulet-epice", en: "hot-spicy-chicken-noodles" },
    name: {
      fr: "Nouilles instantanées au poulet épicé",
      en: "Hot & Spicy Chicken Instant Noodles",
    },
    description: {
      fr: "Un classique relevé qui a du caractère, prêt en quelques minutes.",
      en: "A bold take on a spicy chicken classic, ready in minutes.",
    },
    format: { fr: "Sachet", en: "Pack" },
    netWeight: "135 g",
    image: "/products/hot-spicy-chicken-noodles.webp",
    lifestyle: "/images/lifestyle-spicy-chicken-noodles.webp",
    tone: "clay",
  },
  {
    key: "nouilles-ecrevisses-epicees",
    category: "riz-pates-nouilles",
    slug: { fr: "nouilles-ecrevisses-epicees", en: "spicy-crawfish-noodles" },
    name: {
      fr: "Nouilles instantanées aux écrevisses épicées",
      en: "Spicy Crawfish Instant Noodles",
    },
    description: {
      fr: "Une saveur d'écrevisses au tempérament épicé, pour les amateurs de sensations fortes.",
      en: "Crawfish flavour with a fiery kick, for those who like it hot.",
    },
    format: { fr: "Sachet", en: "Pack" },
    netWeight: "110 g",
    image: "/products/spicy-crawfish-noodles.webp",
    tone: "cocoa",
  },
  {
    key: "nouilles-poulet-fromage",
    category: "riz-pates-nouilles",
    slug: { fr: "nouilles-poulet-fromage", en: "cheesy-hot-chicken-noodles" },
    name: {
      fr: "Nouilles instantanées au poulet épicé et fromage",
      en: "Cheesy Hot Chicken Instant Noodles",
    },
    description: {
      fr: "Le caractère du poulet épicé, avec une touche fromagère réconfortante.",
      en: "Spicy chicken flavour with a comforting cheesy twist.",
    },
    format: { fr: "Sachet", en: "Pack" },
    netWeight: "110 g",
    image: "/products/cheesy-hot-chicken-noodles.webp",
    tone: "wheat",
  },

  // ── Seafood ─────────────────────────────────────────────────────
  {
    key: "sardines-sauce-tomate",
    category: "poissons",
    slug: { fr: "sardines-dans-la-sauce-tomate", en: "sardines-in-tomato-sauce" },
    name: {
      fr: "Sardines dans la sauce tomate",
      en: "Sardines in Tomato Sauce",
    },
    description: {
      fr: "Des sardines dans une sauce tomate riche, prêtes à servir sur pain grillé ou avec des pâtes.",
      en: "Sardines in a rich tomato sauce, ready for grilled bread or pasta.",
    },
    serving: {
      fr: "Sardines en sauce tomate sur pain grillé.",
      en: "Sardines in tomato sauce with grilled sourdough.",
    },
    format: easyCan,
    netWeight: "125 g",
    image: "/products/sardines-tomato-sauce.webp",
    tone: "clay",
  },
  {
    key: "sardines-huile-olive",
    category: "poissons",
    slug: { fr: "sardines-a-l-huile-d-olive", en: "sardines-in-olive-oil" },
    name: {
      fr: "Sardines dans l'huile d'olive",
      en: "Sardines in Olive Oil",
    },
    description: {
      fr: "Des sardines à l'huile d'olive, à déguster avec des olives, du citron et du persil.",
      en: "Sardines in olive oil, best enjoyed with olives, lemon and parsley.",
    },
    serving: {
      fr: "Sardines, olives, citron et persil.",
      en: "Sardines with olives, lemon and parsley.",
    },
    format: easyCan,
    netWeight: "125 g",
    image: "/products/sardines-olive-oil.webp",
    tone: "sage",
  },
  {
    key: "thon-emiette-eau",
    category: "poissons",
    slug: { fr: "thon-emiette-dans-l-eau", en: "flaked-tuna-in-water" },
    name: { fr: "Thon émietté dans l'eau", en: "Flaked Tuna in Water" },
    description: {
      fr: "Du thon émietté dans l'eau, pratique pour les salades, les sandwichs et les rôties.",
      en: "Flaked tuna in water, handy for salads, sandwiches and toast.",
    },
    serving: {
      fr: "Rôtie au thon émietté et au concombre.",
      en: "Flaked tuna and cucumber on sourdough toast.",
    },
    format: easyCan,
    image: "/products/flaked-tuna-water.webp",
    tone: "linen",
  },
  {
    key: "thon-pale-morceaux",
    category: "poissons",
    slug: { fr: "thon-pale-en-morceaux", en: "chunk-light-tuna" },
    name: { fr: "Thon pâle en morceaux", en: "Chunk Light Tuna" },
    description: {
      fr: "Du thon pâle en morceaux pour les salades, les pâtes et les lunchs du quotidien.",
      en: "Chunk light tuna for salads, pasta and everyday lunches.",
    },
    serving: {
      fr: "Salade de thon, haricots blancs et tomates.",
      en: "Chunk tuna, white bean and tomato salad.",
    },
    format: easyCan,
    image: "/products/chunk-light-tuna.webp",
    tone: "linen",
  },
  {
    key: "filets-de-basa",
    category: "poissons",
    slug: { fr: "filets-de-basa", en: "basa-fillets" },
    name: { fr: "Filets de basa", en: "Basa Fillets" },
    description: {
      fr: "Des filets de basa surgelés, à poêler, à cuire au four ou à ajouter à vos recettes.",
      en: "Frozen basa fillets to pan-sear, bake or add to your recipes.",
    },
    serving: {
      fr: "Filet de basa poêlé, citron et asperges.",
      en: "Pan-seared basa with lemon and asparagus.",
    },
    format: { fr: "Sachet de produit surgelé", en: "Frozen product pouch" },
    storage: { fr: "Garder congelé", en: "Keep frozen" },
    netWeight: "454 g (1 lb)",
    image: "/products/basa-fillets.webp",
    tone: "sage",
  },
  {
    key: "moules-entieres-cuites",
    category: "poissons",
    slug: { fr: "moules-entieres-cuites", en: "whole-cooked-mussels" },
    name: { fr: "Moules entières cuites", en: "Whole Cooked Mussels" },
    description: {
      fr: "Des moules entières cuites et surgelées, prêtes pour un bouillon à l'ail et au persil.",
      en: "Whole cooked frozen mussels, ready for a garlic and parsley broth.",
    },
    serving: {
      fr: "Moules au bouillon à l'ail et au persil.",
      en: "Mussels in garlic and parsley broth.",
    },
    format: { fr: "Sachet de produit surgelé", en: "Frozen product pouch" },
    storage: { fr: "Garder congelé", en: "Keep frozen" },
    netWeight: "454 g (1 lb)",
    image: "/products/cooked-mussels.webp",
    tone: "cocoa",
  },
  {
    key: "palourdes-entieres-cuites",
    category: "poissons",
    slug: { fr: "palourdes-entieres-cuites", en: "whole-cooked-clams" },
    name: { fr: "Palourdes entières cuites", en: "Whole Cooked Clams" },
    description: {
      fr: "Des palourdes entières cuites et surgelées, idéales avec des pâtes, du vin blanc et du citron.",
      en: "Whole cooked frozen clams, ideal with pasta, white wine and lemon.",
    },
    serving: {
      fr: "Linguines aux palourdes, à l'ail et au citron.",
      en: "Clam linguine with garlic and lemon.",
    },
    format: { fr: "Sachet de produit surgelé", en: "Frozen product pouch" },
    storage: { fr: "Garder congelé", en: "Keep frozen" },
    netWeight: "454 g (1 lb)",
    image: "/products/cooked-clams.webp",
    tone: "wheat",
  },

  // ── Canned meats ────────────────────────────────────────────────
  {
    key: "poulet",
    category: "viandes",
    slug: { fr: "viande-a-sandwich-au-poulet", en: "chicken-luncheon-meat" },
    name: { fr: "Viande à sandwich au poulet", en: "Chicken Luncheon Meat" },
    description: {
      fr: "Pratique pour préparer des sandwichs, des lunchs et des repas rapides selon vos envies.",
      en: "Convenient for sandwiches, lunches and quick meals made your way.",
    },
    serving: {
      fr: "Sandwich grillé, laitue et tomate.",
      en: "Toasted sandwich with lettuce and tomato.",
    },
    format: easyCan,
    netWeight: "340 g (12 oz)",
    image: "/products/chicken-luncheon-meat.webp",
    lifestyle: "/images/lifestyle-chicken-luncheon-meat.webp",
    tone: "sage",
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
    serving: {
      fr: "Tranches poêlées, pommes de terre et haricots verts.",
      en: "Pan-seared slices with potatoes and green beans.",
    },
    format: easyCan,
    netWeight: "340 g (12 oz)",
    image: "/products/beef-luncheon-meat.webp",
    tone: "clay",
  },
  {
    key: "boeuf-sale",
    category: "viandes",
    slug: { fr: "boeuf-sale", en: "corned-beef" },
    name: { fr: "Bœuf salé", en: "Corned Beef" },
    description: {
      fr: "Du bœuf salé prêt à poêler avec des pommes de terre pour un repas simple et réconfortant.",
      en: "Corned beef ready to pan-fry with potatoes for a simple, comforting meal.",
    },
    serving: {
      fr: "Poêlée de bœuf salé et de pommes de terre.",
      en: "Corned beef and potato hash.",
    },
    format: easyCan,
    image: "/products/corned-beef.webp",
    tone: "cocoa",
  },

  // ── Spreads ─────────────────────────────────────────────────────
  {
    key: "beurre-darachide-croquant",
    category: "tartinades",
    slug: { fr: "beurre-d-arachide-croquant", en: "crunchy-peanut-butter" },
    name: { fr: "Beurre d'arachide croquant", en: "Crunchy Peanut Butter" },
    description: {
      fr: "Un beurre d'arachide croquant, fait pour les rôties, les muffins et les collations.",
      en: "Crunchy peanut butter, made for toast, muffins and snacks.",
    },
    serving: {
      fr: "Rôtie au levain, bananes et arachides concassées.",
      en: "Sourdough toast with banana and crushed peanuts.",
    },
    format: { fr: "Pot à couvercle vissé", en: "Screw-top jar" },
    netWeight: "170 g",
    image: "/products/crunchy-peanut-butter.webp",
    lifestyle: "/images/lifestyle-peanut-butter.webp",
    tone: "honey",
  },
  {
    key: "beurre-darachide-cremeux",
    category: "tartinades",
    slug: { fr: "beurre-d-arachide-cremeux", en: "smooth-peanut-butter" },
    name: { fr: "Beurre d'arachide crémeux", en: "Smooth Peanut Butter" },
    description: {
      fr: "Un beurre d'arachide crémeux, facile à tartiner et à ajouter aux recettes.",
      en: "Smooth peanut butter, easy to spread and add to recipes.",
    },
    serving: {
      fr: "Muffin anglais grillé et framboises.",
      en: "Toasted English muffin with raspberries.",
    },
    format: { fr: "Pot à couvercle vissé", en: "Screw-top jar" },
    netWeight: "170 g",
    image: "/products/smooth-peanut-butter.webp",
    tone: "wheat",
  },
  {
    key: "beurre-darachide-chocolat",
    category: "tartinades",
    slug: { fr: "beurre-d-arachide-au-chocolat", en: "chocolate-peanut-butter" },
    name: { fr: "Beurre d'arachide au chocolat", en: "Chocolate Peanut Butter" },
    description: {
      fr: "Un beurre d'arachide au chocolat, pour les crêpes, les fruits et les desserts.",
      en: "Chocolate peanut butter for crêpes, fruit and desserts.",
    },
    serving: {
      fr: "Crêpes, fraises et beurre d'arachide au chocolat.",
      en: "Crêpes with strawberries and chocolate peanut butter.",
    },
    format: { fr: "Pot à couvercle vissé", en: "Screw-top jar" },
    netWeight: "170 g",
    image: "/products/chocolate-peanut-butter.webp",
    tone: "cocoa",
  },
];
