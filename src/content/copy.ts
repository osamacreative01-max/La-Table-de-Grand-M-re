import type { Lang } from "./types";

export const brand = {
  name: "La Table de Grand-Mère",
  short: "La Table",
  line: {
    fr: "Le goût de se retrouver.",
    en: "The Taste of Coming Together.",
  } satisfies Record<Lang, string>,
  founded: "Québec",
} as const;

export type NavKey =
  | "home"
  | "products"
  | "recipes"
  | "story"
  | "business"
  | "contact";

export const nav: Record<Lang, { key: NavKey; label: string }[]> = {
  fr: [
    { key: "home", label: "Accueil" },
    { key: "products", label: "Nos produits" },
    { key: "recipes", label: "Recettes" },
    { key: "story", label: "Notre histoire" },
    { key: "business", label: "Pour les professionnels" },
    { key: "contact", label: "Nous joindre" },
  ],
  en: [
    { key: "home", label: "Home" },
    { key: "products", label: "Our Products" },
    { key: "recipes", label: "Recipes" },
    { key: "story", label: "Our Story" },
    { key: "business", label: "For Business" },
    { key: "contact", label: "Contact Us" },
  ],
};

export const businessSubnav = {
  fr: [
    { key: "retailers", label: "Détaillants" },
    { key: "wholesale", label: "Grossistes et distributeurs" },
    { key: "foodservice", label: "Restauration et services alimentaires" },
  ],
  en: [
    { key: "retailers", label: "Retailers" },
    { key: "wholesale", label: "Wholesale & Distribution" },
    { key: "foodservice", label: "Foodservice & Institutions" },
  ],
} as const;

export const ui = {
  fr: {
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    openMenu: "Ouvrir le menu",
    language: "Langue",
    translate: "Traduire",
    otherLanguages: "Autres langues",
    business: "Espace professionnel",
    home: "Accueil",
    breadcrumb: "Fil d'Ariane",
    allProducts: "Tous nos produits",
    backToCategory: "Retour à la catégorie",
    backToProducts: "Retour aux produits",
    businessEnquiry: "Demande commerciale",
    categories: "Catégories",
    productsInCategory: "Produits dans cette catégorie",
    seeProducts: "Voir les produits",
    viewProduct: "Voir le produit",
    viewCategory: "Découvrir la catégorie",
    languageNotice:
      "Traduction automatique fournie pour votre commodité. La version française demeure la version officielle.",
    copyright: "Tous droits réservés.",
    privacy: "Politique de confidentialité",
  },
  en: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    language: "Language",
    translate: "Translate",
    otherLanguages: "Other languages",
    business: "Business Enquiries",
    home: "Home",
    breadcrumb: "Breadcrumb",
    allProducts: "All our products",
    backToCategory: "Back to the category",
    backToProducts: "Back to products",
    businessEnquiry: "Business Enquiry",
    categories: "Categories",
    productsInCategory: "Products in this category",
    seeProducts: "See products",
    viewProduct: "View product",
    viewCategory: "Explore the category",
    languageNotice:
      "Automated translation provided for convenience. The French version remains the official version.",
    copyright: "All rights reserved.",
    privacy: "Privacy Policy",
  },
} as const;

export const home = {
  fr: {
    eyebrow: "Le goût de se retrouver",
    hero: {
      title: "Les bons moments commencent autour de la table.",
      body: "Des fruits et légumes en conserve aux légumineuses, en passant par les poissons, les nouilles et les tartinades : de quoi inspirer les repas du quotidien.",
      cta: "Découvrir nos produits",
    },
    collections: {
      title: "Des essentiels pour chaque repas.",
      body: "Huit gammes pensées pour le garde-manger : fruits et légumes, haricots, légumineuses sèches, riz et nouilles, poissons et fruits de mer, viandes à lunch et beurre d'arachide.",
      cta: "Explorer nos produits",
    },
    story: {
      title: "Chez grand-maman, il y a toujours une place à table.",
      body: "Une bonne odeur dans la cuisine, un repas qu'on partage et le plaisir d'être ensemble : voilà ce qui nous inspire.",
      cta: "Notre histoire",
    },
    recipes: {
      title: "Qu'est-ce qu'on mange ce soir?",
      body: "De bonnes idées pour cuisiner simplement avec les ingrédients du garde-manger.",
      cta: "Voir les recettes",
    },
    business: {
      title: "Vous êtes un professionnel de l'alimentation?",
      body: "Découvrez nos gammes et communiquez avec nous pour discuter de vos besoins d'approvisionnement.",
      cta: "Espace professionnel",
    },
  },
  en: {
    eyebrow: "The Taste of Coming Together",
    hero: {
      title: "The Best Moments Begin Around the Table.",
      body: "From canned fruit and vegetables to pulses, seafood, noodles and spreads: everyday inspiration for the meals you share.",
      cta: "Discover Our Products",
    },
    collections: {
      title: "Everyday Essentials for Every Meal.",
      body: "Eight pantry ranges: fruit and vegetables, beans, dried pulses, rice and noodles, seafood, luncheon meats and peanut butter.",
      cta: "Explore Our Products",
    },
    story: {
      title: "There's Always Room at Grandma's Table.",
      body: "The aroma of home cooking, a meal to share and the joy of being together: that's what inspires us.",
      cta: "Our Story",
    },
    recipes: {
      title: "What's for Dinner Tonight?",
      body: "Easy meal inspiration using everyday pantry ingredients.",
      cta: "See Recipes",
    },
    business: {
      title: "Work in the Food Industry?",
      body: "Explore our product ranges and contact us to discuss your supply requirements.",
      cta: "Business Enquiries",
    },
  },
} as const;

export const productsPage = {
  fr: {
    title: "Nos produits",
    intro:
      "Des fruits et légumes en conserve aux légumineuses, poissons, nouilles et tartinades : explorez les gammes La Table de Grand-Mère et trouvez de nouvelles idées pour votre table.",
    categoryLabel: "Gamme",
  },
  en: {
    title: "Our Products",
    intro:
      "From canned fruit and vegetables to pulses, seafood, noodles and spreads, explore the La Table de Grand-Mère ranges and find new ideas for your table.",
    categoryLabel: "Range",
  },
} as const;

export const productPage = {
  fr: {
    relatedTitle: "Produits similaires",
    businessTitle: "Demande commerciale",
    businessBody:
      "Vous êtes détaillant, grossiste ou acheteur en restauration? Communiquez avec notre équipe au sujet de ce produit.",
    businessCta: "Demande commerciale",
    formatLabel: "Format",
    weightLabel: "Poids net",
    servingLabel: "Idée de service",
    storageLabel: "Conservation",
  },
  en: {
    relatedTitle: "Similar products",
    businessTitle: "Business Enquiry",
    businessBody:
      "Are you a retailer, wholesaler or foodservice buyer? Contact our team about this product.",
    businessCta: "Business Enquiry",
    formatLabel: "Format",
    weightLabel: "Net weight",
    servingLabel: "Serving idea",
    storageLabel: "Storage",
  },
} as const;

export const storyPage = {
  fr: {
    title: "Notre histoire",
    kicker: "Le goût de se retrouver.",
    paragraphs: [
      "Il y a des souvenirs qui restent avec nous toute une vie.",
      "Une bonne odeur qui vient de la cuisine. Le bruit des assiettes sur la table. Les conversations qui s'animent. Et cette voix familière qui nous appelle : « Viens t'asseoir, c'est prêt! »",
      "Chez grand-maman, il y avait toujours une place de plus. On prenait le temps de cuisiner, de partager et de profiter des petits bonheurs du quotidien.",
      "C'est cet esprit de générosité et de réconfort qui inspire La Table de Grand-Mère.",
      "Nous croyons que les aliments de tous les jours peuvent faire partie de moments extraordinaires : un souper en famille, une recette qu'on aime retrouver ou un repas improvisé avec ceux qui nous sont chers.",
      "Parce qu'au fond, les meilleurs repas ne sont pas seulement ceux qu'on mange. Ce sont ceux dont on se souvient.",
    ],
    closing: "La Table de Grand-Mère. Le goût de se retrouver.",
    imageCaption: "Une table familiale dressée pour le souper",
  },
  en: {
    title: "Our Story",
    kicker: "The Taste of Coming Together.",
    paragraphs: [
      "Some memories stay with us for a lifetime.",
      "The aroma coming from the kitchen. Plates being set on the table. Lively conversation. And that familiar voice calling, “Come sit down, it's ready!”",
      "At Grandma's house, there was always room for one more. We took time to cook, share and enjoy life's small everyday pleasures.",
      "That spirit of generosity and comfort inspires La Table de Grand-Mère.",
      "We believe everyday food can be part of extraordinary moments: a family dinner, a favourite recipe or an unexpected meal with those closest to us.",
      "Because the best meals are not simply the ones we eat. They are the ones we remember.",
    ],
    closing: "La Table de Grand-Mère. The Taste of Coming Together.",
    imageCaption: "A family table set for dinner",
  },
} as const;

export const recipesPage = {
  fr: {
    title: "Nos recettes",
    kicker: "Des idées simples pour des repas qu'on aime partager.",
    intro:
      "Qu'est-ce qu'on mange ce soir? Inspirez-vous de nos ingrédients pour cuisiner des plats savoureux au quotidien.",
    cards: [
      { title: "Crumble aux pêches", caption: "Crumble aux pêches en morceaux" },
      {
        title: "Salade de pois chiches, concombre et citron",
        caption: "Bol de salade de pois chiches",
      },
      {
        title: "Sardines en sauce tomate sur pain grillé",
        caption: "Sardines en sauce tomate sur pain grillé",
      },
      {
        title: "Rôtie au beurre d'arachide, banane et arachides concassées",
        caption: "Rôtie au beurre d'arachide et banane",
      },
      {
        title: "Linguines aux palourdes, à l'ail et au citron",
        caption: "Linguines aux palourdes",
      },
      { title: "Verrine de yogourt, fruits et granola", caption: "Verrine de yogourt et fruits" },
    ],
  },
  en: {
    title: "Our Recipes",
    kicker: "Simple ideas for meals worth sharing.",
    intro:
      "What's for dinner tonight? Find inspiration to cook tasty everyday meals with our ingredients.",
    cards: [
      { title: "Peach Crumble", caption: "Peach crumble made with peach chunks" },
      {
        title: "Chickpea, Cucumber and Lemon Salad",
        caption: "A bowl of chickpea salad",
      },
      {
        title: "Sardines in Tomato Sauce on Grilled Bread",
        caption: "Sardines in tomato sauce with grilled sourdough",
      },
      {
        title: "Peanut Butter Toast with Banana and Crushed Peanuts",
        caption: "Peanut butter toast with banana",
      },
      {
        title: "Clam Linguine with Garlic and Lemon",
        caption: "Clam linguine",
      },
      { title: "Yogurt, Fruit and Granola Parfait", caption: "Yogurt and fruit parfait" },
    ],
  },
} as const;

export const recipePage = {
  fr: {
    prep: "Préparation",
    cook: "Cuisson",
    servings: "Portions",
    minutes: "min",
    none: "Aucune",
    ingredients: "Ingrédients",
    steps: "Préparation",
    tip: "Le conseil de grand-maman",
    productsTitle: "Dans le garde-manger",
    productsKicker: "Les produits de cette recette",
    moreTitle: "D'autres idées à essayer",
    viewRecipe: "Voir la recette",
    backToRecipes: "Toutes les recettes",
    withProduct: "Recettes avec ce produit",
  },
  en: {
    prep: "Prep",
    cook: "Cook",
    servings: "Servings",
    minutes: "min",
    none: "None",
    ingredients: "Ingredients",
    steps: "Method",
    tip: "Grandma's tip",
    productsTitle: "From the pantry",
    productsKicker: "Products in this recipe",
    moreTitle: "More ideas to try",
    viewRecipe: "View recipe",
    backToRecipes: "All recipes",
    withProduct: "Recipes with this product",
  },
} as const;

export const businessPage = {
  fr: {
    title: "Pour les professionnels",
    kicker: "Ensemble, servons de bons produits.",
    body: "Vous êtes détaillant, grossiste, distributeur ou responsable des achats alimentaires? Découvrez nos gammes — fruits et légumes en conserve, légumineuses, poissons et fruits de mer, nouilles instantanées et tartinades — et communiquez avec nous pour discuter de vos besoins.",
    cards: [
      {
        key: "retailers" as const,
        title: "Détaillants",
        body: "Une gamme qui trouve sa place dans votre commerce.",
      },
      {
        key: "wholesale" as const,
        title: "Grossistes et distributeurs",
        body: "Des produits pour votre réseau de distribution.",
      },
      {
        key: "foodservice" as const,
        title: "Restauration et services alimentaires",
        body: "Des essentiels pour les cuisines qui servent du monde.",
      },
    ],
  },
  en: {
    title: "For Business",
    kicker: "Good Food. Stronger Partnerships.",
    body: "Are you a retailer, wholesaler, distributor or food purchasing professional? Explore our ranges — canned fruit and vegetables, pulses, seafood, instant noodles and spreads — and contact us to discuss your needs.",
    cards: [
      {
        key: "retailers" as const,
        title: "Retailers",
        body: "A range that belongs on your shelves.",
      },
      {
        key: "wholesale" as const,
        title: "Wholesale & Distribution",
        body: "Products for your distribution network.",
      },
      {
        key: "foodservice" as const,
        title: "Foodservice & Institutions",
        body: "Everyday essentials for kitchens that serve people.",
      },
    ],
  },
} as const;

export const buyerPages = {
  retailers: {
    fr: {
      title: "Pour les détaillants",
      kicker: "Une gamme qui trouve sa place dans votre commerce.",
      paragraphs: [
        "La Table de Grand-Mère propose des aliments du garde-manger pour les repas de tous les jours : fruits et légumes en conserve, légumineuses, riz et nouilles, poissons et fruits de mer, viandes à lunch et tartinades.",
        "Vous souhaitez en savoir plus sur notre sélection pour votre magasin? Communiquez avec notre équipe pour discuter des produits et des formats disponibles.",
      ],
      cta: "Demander des renseignements",
      caption: "Produits sur une tablette d'épicerie",
    },
    en: {
      title: "For Retailers",
      kicker: "A Range That Belongs on Your Shelves.",
      paragraphs: [
        "La Table de Grand-Mère offers pantry foods for everyday meals, including canned fruit and vegetables, pulses, rice and noodles, seafood, luncheon meats and spreads.",
        "Interested in carrying our products in your store? Contact our team to discuss the range and available formats.",
      ],
      cta: "Request Information",
      caption: "Products on a grocery shelf",
    },
  },
  wholesale: {
    fr: {
      title: "Grossistes et distributeurs",
      kicker: "Des produits pour votre réseau de distribution.",
      paragraphs: [
        "Vous approvisionnez des épiceries, des détaillants ou d'autres clients commerciaux? Découvrez notre gamme de produits alimentaires et discutons des catégories qui répondent à vos besoins.",
        "Notre équipe peut examiner avec vous les produits, les formats, les volumes et les modalités d'approvisionnement selon les disponibilités.",
      ],
      cta: "Parler à notre équipe commerciale",
      caption: "Cartons de produits alimentaires",
    },
    en: {
      title: "Wholesale & Distribution",
      kicker: "Products for Your Distribution Network.",
      paragraphs: [
        "Do you supply grocery stores, retailers or other commercial customers? Explore our food range and let's discuss the categories that fit your business.",
        "Our team can review products, pack formats, quantities and supply arrangements with you, subject to availability.",
      ],
      cta: "Speak With Our Sales Team",
      caption: "Boxed food products",
    },
  },
  foodservice: {
    fr: {
      title: "Restauration et services alimentaires",
      kicker: "Des essentiels pour les cuisines qui servent du monde.",
      paragraphs: [
        "Restaurants, traiteurs, hôtels, cafétérias et acheteurs institutionnels : découvrez notre sélection de fruits et légumes en conserve, légumineuses, riz et nouilles, poissons et fruits de mer, viandes à lunch et tartinades.",
        "Dites-nous quels produits vous recherchez, vos formats souhaités et vos besoins d'approvisionnement. Notre équipe pourra étudier votre demande et vous proposer les options disponibles.",
      ],
      cta: "Faire une demande d'approvisionnement",
      caption: "Cuisine commerciale et ingrédients",
    },
    en: {
      title: "Foodservice & Institutions",
      kicker: "Everyday Essentials for Kitchens That Serve People.",
      paragraphs: [
        "Restaurants, caterers, hotels, cafeterias and institutional food buyers: explore our range of canned fruit and vegetables, pulses, rice and noodles, seafood, luncheon meats and spreads.",
        "Tell us which products you need, your preferred formats and your supply requirements. Our team can review your request and discuss available options.",
      ],
      cta: "Request Supply Information",
      caption: "Commercial kitchen and ingredients",
    },
  },
} as const;

export const contactPage = {
  fr: {
    title: "Nous joindre",
    kicker: "On aime avoir de vos nouvelles!",
    body: "Une question sur nos produits ou un commentaire à partager? Écrivez-nous. Notre équipe sera heureuse de vous répondre.",
    cta: "Envoyer le message",
    success: "Merci! Votre message a bien été envoyé.",
  },
  en: {
    title: "Contact Us",
    kicker: "We'd Love to Hear From You!",
    body: "Have a question about our products or a comment to share? Send us a message. Our team will be happy to help.",
    cta: "Send Message",
    success: "Thank you! Your message has been sent.",
  },
} as const;

export const forms = {
  fr: {
    contact: {
      name: "Nom",
      email: "Adresse courriel",
      message: "Message",
      required: "Champ obligatoire",
      invalidEmail: "Veuillez entrer une adresse courriel valide",
    },
    business: {
      title: "Formulaire de demande commerciale",
      businessType: "Type d'entreprise",
      businessTypeRequired: "Choisissez un type d'entreprise",
      types: [
        "Détaillant",
        "Grossiste ou distributeur",
        "Restauration ou institution",
        "Autre",
      ],
      name: "Nom",
      company: "Entreprise",
      email: "Adresse courriel",
      phone: "Téléphone",
      city: "Ville et province",
      products: "Produits recherchés",
      packSizes: "Formats souhaités",
      quantity: "Volume estimé",
      frequency: "Fréquence des commandes",
      message: "Message",
      optional: "Facultatif",
      submit: "Envoyer ma demande",
      success:
        "Merci de votre intérêt! Nous avons reçu votre demande et notre équipe vous répondra dès que possible.",
      error: "Une erreur est survenue. Veuillez réessayer.",
    },
  },
  en: {
    contact: {
      name: "Name",
      email: "Email Address",
      message: "Message",
      required: "Required field",
      invalidEmail: "Please enter a valid email address",
    },
    business: {
      title: "Business Enquiry Form",
      businessType: "Business Type",
      businessTypeRequired: "Choose a business type",
      types: ["Retailer", "Wholesaler or distributor", "Foodservice or institution", "Other"],
      name: "Name",
      company: "Company",
      email: "Email Address",
      phone: "Phone",
      city: "City and Province",
      products: "Products of Interest",
      packSizes: "Preferred Pack Sizes",
      quantity: "Estimated Quantity",
      frequency: "Order Frequency",
      message: "Message",
      optional: "Optional",
      submit: "Submit Enquiry",
      success:
        "Thank you for your interest! We have received your enquiry and our team will respond as soon as possible.",
      error: "Something went wrong. Please try again.",
    },
  },
} as const;

export const seo = {
  home: {
    fr: {
      title: "La Table de Grand-Mère | Aliments pour se retrouver",
      description:
        "Découvrez les fruits et légumes en conserve, légumineuses, poissons et fruits de mer, nouilles instantanées et tartinades La Table de Grand-Mère.",
    },
    en: {
      title: "La Table de Grand-Mère | Food That Brings Us Together",
      description:
        "Explore La Table de Grand-Mère canned fruit and vegetables, pulses, seafood, instant noodles and spreads for everyday meals.",
    },
  },
  products: {
    fr: { title: "Nos produits | La Table de Grand-Mère" },
    en: { title: "Our Products | La Table de Grand-Mère" },
  },
  story: {
    fr: { title: "Notre histoire | La Table de Grand-Mère" },
    en: { title: "Our Story | La Table de Grand-Mère" },
  },
  recipes: {
    fr: { title: "Recettes et idées repas | La Table de Grand-Mère" },
    en: { title: "Recipes & Meal Ideas | La Table de Grand-Mère" },
  },
  business: {
    fr: { title: "Pour les professionnels | La Table de Grand-Mère" },
    en: { title: "For Business | La Table de Grand-Mère" },
  },
  contact: {
    fr: { title: "Nous joindre | La Table de Grand-Mère" },
    en: { title: "Contact Us | La Table de Grand-Mère" },
  },
  privacy: {
    fr: { title: "Politique de confidentialité | La Table de Grand-Mère" },
    en: { title: "Privacy Policy | La Table de Grand-Mère" },
  },
} as const;

export const privacyPage = {
  fr: {
    title: "Politique de confidentialité",
    body: [
      "La Table de Grand-Mère recueille uniquement les renseignements que vous choisissez de nous transmettre par les formulaires du site : nom, adresse courriel, entreprise, téléphone et message. Ces renseignements servent à répondre à votre demande et à assurer le suivi de nos échanges.",
      "Aucun renseignement n'est vendu ni transmis à des tiers à des fins publicitaires. Pour toute question concernant vos renseignements personnels, communiquez avec nous par le formulaire de contact.",
    ],
  },
  en: {
    title: "Privacy Policy",
    body: [
      "La Table de Grand-Mère only collects the information you choose to send us through the site's forms: name, email address, company, phone number and message. This information is used to respond to your request and to follow up on our exchanges.",
      "No information is sold or shared with third parties for advertising purposes. For any question about your personal information, contact us through the contact form.",
    ],
  },
} as const;
