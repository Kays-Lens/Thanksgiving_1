const CATS = ["Art de la table", "Cuisine", "Déco", "Coffrets"];

const CATEGORIES_DATA = [
  {
    name: "Art de la table",
    img: "img/cat_table.jpg",
    icon: "🍽️",
    desc: "Nappes en lin, grès émaillé & verres ambrés"
  },
  {
    name: "Cuisine",
    img: "img/cat_cuisine.jpg",
    icon: "🍲",
    desc: "Cocottes en fonte, plats à tarte & saucières"
  },
  {
    name: "Déco",
    img: "img/cat_deco.jpg",
    icon: "🍁",
    desc: "Couronnes d'automne, bougies & chandeliers"
  },
  {
    name: "Coffrets",
    img: "img/cat_coffrets.jpg",
    icon: "🎁",
    desc: "Idées cadeaux pour hôtes & marrons glacés"
  }
];

const PRODUCTS = [
  /* Art de la table (4 articles) */
  {
    id: 1,
    n: "Nappe en lin « Automne »",
    c: "Art de la table",
    img: "img/nappe_en_lin_automne.jpg",
    p: 59.9,
    o: 79.9,
    e: "🍂",
    b: "-25%",
    s: 12,
    r: 4.8,
    h: "#D9A066",
    d: "Lin lavé tissé serré, teinte terre cuite chaleureuse. Apporte une élégance naturelle à vos grandes tablées de fête. Lavable en machine à 40°C, 240 × 150 cm."
  },
  {
    id: 2,
    n: "Set de 6 assiettes en grès",
    c: "Art de la table",
    img: "img/set_de_6_assiettes_en_grès.jpg",
    p: 44.9,
    o: 59.9,
    e: "🍽️",
    b: "-25%",
    s: 5,
    r: 4.7,
    h: "#C98B5A",
    d: "Grès émaillé à la main avec une finition artisanale aux légères nuances organiques. Résistant aux rayures, passe au micro-ondes et au lave-vaisselle."
  },
  {
    id: 3,
    n: "Chemin de table en jute",
    c: "Art de la table",
    img: "img/chemin_de_table_en_jute.jpg",
    p: 24.9,
    e: "🌾",
    s: 20,
    r: 4.5,
    h: "#C9B27A",
    d: "Tissage en fibres naturelles de jute bordé d'un liseré crème raffiné. La touche rustique chic incontournable pour structurer votre centre de table."
  },
  {
    id: 4,
    n: "Service de 4 verres en cristal ambré",
    c: "Art de la table",
    img: "img/service_de_4_veres_en_cristal_ambré.jpg",
    p: 38.0,
    o: 45.0,
    e: "🍷",
    b: "-15%",
    s: 10,
    r: 4.9,
    h: "#D9A066",
    d: "Verres soufflés à la bouche d'une subtile teinte miel ambrée. Parfaits pour accompagner les vins d'automne et sublimer votre dressage de fête."
  },

  /* Cuisine (4 articles) */
  {
    id: 5,
    n: "Cocotte en fonte rouille",
    c: "Cuisine",
    img: "img/cocotte_en_fonte_rouille.jpg",
    p: 89.0,
    o: 119.0,
    e: "🍲",
    b: "Vente Flash",
    s: 4,
    r: 4.9,
    h: "#B5541C",
    d: "Fonte émaillée haute performance de 4,2 L. Diffusion optimale de la chaleur pour rôtir la dinde de Thanksgiving ou mijoter vos plats de saison. Compatible tous feux + induction."
  },
  {
    id: 6,
    n: "Plat à tarte en céramique",
    c: "Cuisine",
    img: "img/plat_à_tarte_en_céramique.jpg",
    p: 27.5,
    o: 34.0,
    e: "🥧",
    b: "-19%",
    s: 15,
    r: 4.6,
    h: "#E0B37A",
    d: "Céramique réfractaire garantissant une cuisson parfaitement dorée et homogène. Bords cannelés élégants, idéal pour les tartes aux citrouilles et aux noix de pécan."
  },
  {
    id: 7,
    n: "Set à découper de fête",
    c: "Cuisine",
    img: "img/set_à_découper_de_fête.jpg",
    p: 39.9,
    e: "🔪",
    s: 9,
    r: 4.7,
    h: "#8A6A4F",
    d: "Couteau à découper de précision et sa fourchette assortie. Lames en acier inoxydable forgé et manches ergonomiques en véritable bois d'olivier."
  },
  {
    id: 8,
    n: "Saucière en grès & louche inox",
    c: "Cuisine",
    img: "img/Saucière_en_grès_&_louche_inox.jpg",
    p: 22.9,
    o: 28.0,
    e: "🫗",
    b: "-18%",
    s: 14,
    r: 4.7,
    h: "#C98B5A",
    d: "Saucière isotherme avec maintien au chaud prolongé pour vos jus de rôti et sauces cranberry. Capacité 500 ml avec bec verseur anti-goutte."
  },

  /* Déco (4 articles) */
  {
    id: 9,
    n: "Couronne de feuilles séchées",
    c: "Déco",
    img: "img/Couronne_de_feuilles_séchées.jpg",
    p: 34.9,
    o: 44.9,
    e: "🍁",
    b: "-22%",
    s: 8,
    r: 4.8,
    h: "#C46A2B",
    d: "Composition artisanale à partir de véritables feuilles de chêne séchées, baies rouges et pommes de pin. Diamètre 40 cm, boucle de suspension incluse."
  },
  {
    id: 10,
    n: "Bougies aux épices (x3)",
    c: "Déco",
    img: "img/Bougies_aux_épices_(x3).jpg",
    p: 21.9,
    e: "🕯️",
    b: "Dernières pièces",
    s: 3,
    r: 4.9,
    h: "#D8A35A",
    d: "Trio de bougies en cire 100% végétale coulées dans des verres ambrés. Effluves réconfortants de cannelle, clou de girofle et zeste d'orange douce."
  },
  {
    id: 11,
    n: "Centre de table Citrouilles (x4)",
    c: "Déco",
    img: "img/Centre_de_table_Citrouilles_(x4).jpg",
    p: 29.9,
    o: 39.9,
    e: "🎃",
    b: "-25%",
    s: 9,
    r: 4.8,
    h: "#C46A2B",
    d: "Ensemble de 4 mini citrouilles décoratives en céramique émaillée mate (terracotta, crème, ocre). Idéal pour habiller votre centre de table."
  },
  {
    id: 12,
    n: "Duo de chandeliers laiton patiné",
    c: "Déco",
    img: "img/Duo_de_chandeliers_laiton_patiné.jpg",
    p: 42.0,
    e: "🕯️",
    s: 6,
    r: 4.9,
    h: "#D8A35A",
    d: "Chandeliers élégants longueurs 25 cm et 30 cm en laiton patiné au charme ancien. Conviennent à toutes les bougies flambeaux standards."
  },

  /* Coffrets (4 articles) */
  {
    id: 13,
    n: "Coffret gourmand du récoltant",
    c: "Coffrets",
    img: "img/Coffret_gourmand_du_récoltant.jpg",
    p: 49.9,
    o: 64.9,
    e: "🎁",
    b: "-23%",
    s: 6,
    r: 4.8,
    h: "#7C8A45",
    d: "Caisse en bois brut contenant pots de confiture artisanale châtaigne-vanille, miel de forêt, sirop d'érable du Québec et sablés au beurre."
  },
  {
    id: 14,
    n: "Coffret « Hôte parfait »",
    c: "Coffrets",
    img: "img/Coffret_« Hôte parfait ».jpg",
    p: 69.0,
    o: 89.0,
    e: "🎀",
    b: "-22%",
    s: 7,
    r: 4.9,
    h: "#6B7F3A",
    d: "Le présent raffiné pour remercier ceux qui vous reçoivent : bougie parfumée, torchon brodé en lin pur et boîte de mignardises pralinées."
  },
  {
    id: 15,
    n: "Coffret Épices & Infusions Récolte",
    c: "Coffrets",
    img: "img/Coffret_Épices_&_Infusions_Récolte.jpg",
    p: 39.0,
    o: 49.0,
    e: "🫖",
    b: "-20%",
    s: 8,
    r: 4.9,
    h: "#7C8A45",
    d: "Boîte en métal illustrée contenant 4 mélanges d'épices à vin chaud et 2 mélanges d'infusions d'automne bio avec cuillère infuseur inox."
  },
  {
    id: 16,
    n: "Coffret Douceurs & Marrons Glacés",
    c: "Coffrets",
    img: "img/Coffret_Douceurs_&_Marrons_Glacés.jpg",
    p: 32.9,
    o: 39.9,
    e: "🌰",
    b: "-17%",
    s: 12,
    r: 4.7,
    h: "#6B7F3A",
    d: "Sélection artisanale de 8 marrons glacés de l'Ardèche enveloppés sous foil or et brisures de marrons au sirop de vanille Bourbon."
  }
];
