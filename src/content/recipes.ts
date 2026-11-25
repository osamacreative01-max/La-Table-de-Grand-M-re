import type { Recipe } from "@/content/types";

/**
 * Home-style recipes built around the catalogue. Quantities refer to the
 * product formats listed in `catalog.ts`; adjust when net weights are confirmed.
 */
export const recipes: Recipe[] = [
  {
    key: "crumble-aux-peches",
    slug: { fr: "crumble-aux-peches", en: "peach-crumble" },
    title: { fr: "Crumble aux pêches", en: "Peach Crumble" },
    summary: {
      fr: "Un dessert réconfortant, doré et croustillant, prêt à enfourner en 15 minutes.",
      en: "A comforting golden, crunchy dessert that's ready for the oven in 15 minutes.",
    },
    caption: {
      fr: "Crumble aux pêches en morceaux",
      en: "Peach crumble made with peach chunks",
    },
    prepMinutes: 15,
    cookMinutes: 35,
    servings: 6,
    products: ["peches-en-morceaux"],
    ingredients: {
      fr: [
        "2 boîtes de pêches en morceaux, égouttées (réserver 60 ml de sirop)",
        "15 ml (1 c. à soupe) de fécule de maïs",
        "5 ml (1 c. à thé) de cannelle moulue",
        "250 ml (1 tasse) de flocons d'avoine",
        "125 ml (½ tasse) de farine tout usage",
        "125 ml (½ tasse) de cassonade",
        "90 ml (6 c. à soupe) de beurre froid, en dés",
        "1 pincée de sel",
      ],
      en: [
        "2 cans peach chunks, drained (reserve 60 ml / ¼ cup syrup)",
        "15 ml (1 tbsp) cornstarch",
        "5 ml (1 tsp) ground cinnamon",
        "250 ml (1 cup) rolled oats",
        "125 ml (½ cup) all-purpose flour",
        "125 ml (½ cup) brown sugar",
        "90 ml (6 tbsp) cold butter, diced",
        "1 pinch salt",
      ],
    },
    steps: {
      fr: [
        "Préchauffer le four à 190 °C (375 °F).",
        "Dans un plat de cuisson de 20 cm (8 po), mélanger les pêches, le sirop réservé, la fécule de maïs et la moitié de la cannelle.",
        "Dans un bol, mélanger l'avoine, la farine, la cassonade, le reste de la cannelle et le sel. Ajouter le beurre et l'incorporer du bout des doigts jusqu'à l'obtention d'une texture grumeleuse.",
        "Répartir le mélange sur les pêches.",
        "Cuire au four de 30 à 35 minutes, jusqu'à ce que le dessus soit doré et que le fruit bouillonne. Laisser tiédir 10 minutes avant de servir.",
      ],
      en: [
        "Preheat the oven to 190 °C (375 °F).",
        "In an 8-inch (20 cm) baking dish, combine the peaches, reserved syrup, cornstarch and half the cinnamon.",
        "In a bowl, mix the oats, flour, brown sugar, remaining cinnamon and salt. Rub in the butter with your fingertips until crumbly.",
        "Scatter the topping over the peaches.",
        "Bake for 30 to 35 minutes, until golden on top and bubbling. Let cool for 10 minutes before serving.",
      ],
    },
    tip: {
      fr: "Servez-le tiède avec une boule de crème glacée à la vanille.",
      en: "Serve warm with a scoop of vanilla ice cream.",
    },
    tone: "honey",
  },
  {
    key: "salade-pois-chiches",
    slug: {
      fr: "salade-de-pois-chiches-concombre-et-citron",
      en: "chickpea-cucumber-lemon-salad",
    },
    title: {
      fr: "Salade de pois chiches, concombre et citron",
      en: "Chickpea, Cucumber and Lemon Salad",
    },
    summary: {
      fr: "Fraîche, croquante et prête en 10 minutes, idéale pour les lunchs de la semaine.",
      en: "Fresh, crunchy and ready in 10 minutes, ideal for weekday lunches.",
    },
    caption: {
      fr: "Bol de salade de pois chiches",
      en: "A bowl of chickpea salad",
    },
    prepMinutes: 10,
    cookMinutes: 0,
    servings: 4,
    products: ["pois-chiches", "pois-chiches-secs"],
    ingredients: {
      fr: [
        "1 boîte de pois chiches, rincés et égouttés (ou 500 ml de pois chiches secs cuits)",
        "1 concombre anglais, en dés",
        "1 poivron rouge, en dés",
        "¼ d'oignon rouge, finement haché",
        "60 ml (¼ tasse) de persil frais, haché",
        "Le zeste et le jus d'un citron",
        "45 ml (3 c. à soupe) d'huile d'olive",
        "Sel et poivre, au goût",
      ],
      en: [
        "1 can chickpeas, rinsed and drained (or 500 ml / 2 cups cooked dried chickpeas)",
        "1 English cucumber, diced",
        "1 red bell pepper, diced",
        "¼ red onion, finely chopped",
        "60 ml (¼ cup) fresh parsley, chopped",
        "Zest and juice of 1 lemon",
        "45 ml (3 tbsp) olive oil",
        "Salt and pepper, to taste",
      ],
    },
    steps: {
      fr: [
        "Dans un grand bol, fouetter le zeste et le jus de citron avec l'huile d'olive. Saler et poivrer.",
        "Ajouter les pois chiches, le concombre, le poivron, l'oignon et le persil.",
        "Bien mélanger et laisser reposer 10 minutes au frais pour que les saveurs se marient.",
      ],
      en: [
        "In a large bowl, whisk the lemon zest and juice with the olive oil. Season with salt and pepper.",
        "Add the chickpeas, cucumber, bell pepper, onion and parsley.",
        "Toss well and chill for 10 minutes to let the flavours come together.",
      ],
    },
    tip: {
      fr: "Ajoutez du fromage feta émietté pour un repas plus consistant.",
      en: "Add crumbled feta cheese for a heartier meal.",
    },
    tone: "sage",
  },
  {
    key: "sardines-pain-grille",
    slug: {
      fr: "sardines-en-sauce-tomate-sur-pain-grille",
      en: "sardines-tomato-sauce-grilled-bread",
    },
    title: {
      fr: "Sardines en sauce tomate sur pain grillé",
      en: "Sardines in Tomato Sauce on Grilled Bread",
    },
    summary: {
      fr: "Un repas express, savoureux et généreux, à la manière des petits bistros.",
      en: "A quick, tasty and generous meal, bistro style.",
    },
    caption: {
      fr: "Sardines en sauce tomate sur pain grillé",
      en: "Sardines in tomato sauce with grilled sourdough",
    },
    prepMinutes: 5,
    cookMinutes: 5,
    servings: 2,
    products: ["sardines-sauce-tomate", "sardines-huile-olive"],
    ingredients: {
      fr: [
        "1 boîte de sardines dans la sauce tomate",
        "2 tranches épaisses de pain au levain",
        "1 gousse d'ail, coupée en deux",
        "15 ml (1 c. à soupe) d'huile d'olive",
        "Quelques feuilles de roquette",
        "Le zeste d'un demi-citron",
        "Flocons de piment, au goût",
      ],
      en: [
        "1 can sardines in tomato sauce",
        "2 thick slices sourdough bread",
        "1 garlic clove, halved",
        "15 ml (1 tbsp) olive oil",
        "A handful of arugula",
        "Zest of ½ lemon",
        "Chili flakes, to taste",
      ],
    },
    steps: {
      fr: [
        "Badigeonner le pain d'huile d'olive et le faire griller à la poêle ou au grille-pain.",
        "Frotter les tranches chaudes avec la gousse d'ail.",
        "Déposer la roquette, puis les sardines et leur sauce.",
        "Garnir de zeste de citron et de flocons de piment. Servir aussitôt.",
      ],
      en: [
        "Brush the bread with olive oil and toast it in a skillet or toaster.",
        "Rub the warm slices with the cut garlic clove.",
        "Top with arugula, then the sardines and their sauce.",
        "Finish with lemon zest and chili flakes. Serve right away.",
      ],
    },
    tip: {
      fr: "Les sardines dans l'huile d'olive fonctionnent aussi : ajoutez quelques tomates cerises.",
      en: "Sardines in olive oil work too: add a few cherry tomatoes.",
    },
    tone: "clay",
  },
  {
    key: "rotie-beurre-arachide-banane",
    slug: {
      fr: "rotie-au-beurre-d-arachide-banane-et-arachides",
      en: "peanut-butter-banana-toast",
    },
    title: {
      fr: "Rôtie au beurre d'arachide, banane et arachides concassées",
      en: "Peanut Butter Toast with Banana and Crushed Peanuts",
    },
    summary: {
      fr: "Le déjeuner préféré des petits et des grands, en 5 minutes chrono.",
      en: "A breakfast favourite for kids and grown-ups, in 5 minutes flat.",
    },
    caption: {
      fr: "Rôtie au beurre d'arachide et banane",
      en: "Peanut butter toast with banana",
    },
    prepMinutes: 5,
    cookMinutes: 2,
    servings: 2,
    products: [
      "beurre-darachide-croquant",
      "beurre-darachide-cremeux",
      "beurre-darachide-chocolat",
    ],
    ingredients: {
      fr: [
        "2 tranches de pain au levain",
        "45 ml (3 c. à soupe) de beurre d'arachide croquant",
        "1 banane, tranchée",
        "15 ml (1 c. à soupe) d'arachides grillées, concassées",
        "Un filet de miel ou de sirop d'érable",
        "1 pincée de cannelle (facultatif)",
      ],
      en: [
        "2 slices sourdough bread",
        "45 ml (3 tbsp) crunchy peanut butter",
        "1 banana, sliced",
        "15 ml (1 tbsp) roasted peanuts, crushed",
        "A drizzle of honey or maple syrup",
        "1 pinch cinnamon (optional)",
      ],
    },
    steps: {
      fr: [
        "Faire griller le pain.",
        "Tartiner généreusement de beurre d'arachide pendant que la rôtie est encore chaude.",
        "Disposer les tranches de banane, parsemer d'arachides concassées.",
        "Arroser de miel ou de sirop d'érable et saupoudrer de cannelle.",
      ],
      en: [
        "Toast the bread.",
        "Spread generously with peanut butter while the toast is still warm.",
        "Arrange the banana slices and sprinkle with crushed peanuts.",
        "Drizzle with honey or maple syrup and dust with cinnamon.",
      ],
    },
    tip: {
      fr: "Pour une version gourmande, essayez le beurre d'arachide au chocolat avec des fraises.",
      en: "For a treat, try chocolate peanut butter with strawberries.",
    },
    tone: "wheat",
  },
  {
    key: "linguines-palourdes",
    slug: {
      fr: "linguines-aux-palourdes-ail-et-citron",
      en: "clam-linguine-garlic-lemon",
    },
    title: {
      fr: "Linguines aux palourdes, à l'ail et au citron",
      en: "Clam Linguine with Garlic and Lemon",
    },
    summary: {
      fr: "Un plat de pâtes parfumé qui goûte la mer, prêt en moins de 25 minutes.",
      en: "A fragrant pasta dish with a taste of the sea, ready in under 25 minutes.",
    },
    caption: {
      fr: "Linguines aux palourdes",
      en: "Clam linguine",
    },
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 4,
    products: ["palourdes-entieres-cuites", "moules-entieres-cuites"],
    ingredients: {
      fr: [
        "350 g de linguines",
        "1 sac de palourdes entières cuites, décongelées",
        "45 ml (3 c. à soupe) d'huile d'olive",
        "4 gousses d'ail, émincées",
        "1 pincée de flocons de piment",
        "125 ml (½ tasse) de vin blanc sec ou de bouillon de poisson",
        "Le zeste et le jus d'un citron",
        "60 ml (¼ tasse) de persil frais, haché",
        "Sel et poivre, au goût",
      ],
      en: [
        "350 g linguine",
        "1 bag whole cooked clams, thawed",
        "45 ml (3 tbsp) olive oil",
        "4 garlic cloves, minced",
        "1 pinch chili flakes",
        "125 ml (½ cup) dry white wine or fish stock",
        "Zest and juice of 1 lemon",
        "60 ml (¼ cup) fresh parsley, chopped",
        "Salt and pepper, to taste",
      ],
    },
    steps: {
      fr: [
        "Cuire les linguines dans une grande casserole d'eau bouillante salée jusqu'à ce qu'elles soient al dente. Réserver 125 ml (½ tasse) d'eau de cuisson.",
        "Pendant ce temps, chauffer l'huile dans une grande poêle à feu moyen. Faire revenir l'ail et le piment 1 minute, sans laisser colorer.",
        "Ajouter le vin blanc et laisser réduire de moitié, environ 2 minutes.",
        "Ajouter les palourdes et réchauffer 3 minutes en remuant.",
        "Ajouter les pâtes égouttées, le zeste et le jus de citron, le persil et un peu d'eau de cuisson. Mélanger, rectifier l'assaisonnement et servir.",
      ],
      en: [
        "Cook the linguine in a large pot of salted boiling water until al dente. Reserve 125 ml (½ cup) of the cooking water.",
        "Meanwhile, heat the oil in a large skillet over medium heat. Cook the garlic and chili flakes for 1 minute without browning.",
        "Add the white wine and let it reduce by half, about 2 minutes.",
        "Add the clams and warm through for 3 minutes, stirring.",
        "Add the drained pasta, lemon zest and juice, parsley and a splash of cooking water. Toss, adjust the seasoning and serve.",
      ],
    },
    tip: {
      fr: "Remplacez la moitié des palourdes par des moules cuites pour un plat encore plus généreux.",
      en: "Swap half the clams for cooked mussels for an even more generous dish.",
    },
    tone: "linen",
  },
  {
    key: "verrine-yogourt-fruits",
    slug: {
      fr: "verrine-de-yogourt-fruits-et-granola",
      en: "yogurt-fruit-granola-parfait",
    },
    title: {
      fr: "Verrine de yogourt, fruits et granola",
      en: "Yogurt, Fruit and Granola Parfait",
    },
    summary: {
      fr: "Des étages colorés pour un déjeuner ou une collation qu'on prépare d'avance.",
      en: "Colourful layers for a make-ahead breakfast or snack.",
    },
    caption: {
      fr: "Verrine de yogourt et fruits",
      en: "Yogurt and fruit parfait",
    },
    prepMinutes: 10,
    cookMinutes: 0,
    servings: 4,
    products: ["salade-de-fruits", "peches-en-cubes", "quartiers-de-mandarines"],
    ingredients: {
      fr: [
        "1 boîte de salade de fruits, égouttée",
        "500 ml (2 tasses) de yogourt grec nature ou à la vanille",
        "250 ml (1 tasse) de granola",
        "30 ml (2 c. à soupe) de miel ou de sirop d'érable",
        "Quelques feuilles de menthe (facultatif)",
      ],
      en: [
        "1 can fruit cocktail, drained",
        "500 ml (2 cups) plain or vanilla Greek yogurt",
        "250 ml (1 cup) granola",
        "30 ml (2 tbsp) honey or maple syrup",
        "A few mint leaves (optional)",
      ],
    },
    steps: {
      fr: [
        "Mélanger le yogourt avec le miel ou le sirop d'érable.",
        "Dans quatre verres, déposer une couche de yogourt, puis une couche de fruits et une couche de granola.",
        "Répéter les étages en terminant par les fruits.",
        "Garnir de menthe et servir aussitôt, ou réfrigérer sans le granola jusqu'au lendemain.",
      ],
      en: [
        "Stir the honey or maple syrup into the yogurt.",
        "In four glasses, layer yogurt, then fruit, then granola.",
        "Repeat the layers, finishing with fruit.",
        "Garnish with mint and serve right away, or refrigerate overnight without the granola.",
      ],
    },
    tip: {
      fr: "Variez les plaisirs avec des pêches en cubes ou des quartiers de mandarines.",
      en: "Mix it up with peach dices or mandarin orange segments.",
    },
    tone: "cocoa",
  },
];

export function recipesForProduct(productKey: string): Recipe[] {
  return recipes.filter((recipe) => recipe.products.includes(productKey));
}
