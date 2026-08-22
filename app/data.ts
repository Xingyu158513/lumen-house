import { assetPath } from "./assets";

export const bookingDestinations = [
  { id: "haeon", label: "海隅 HAEON COAST", shortLabel: "海隅 · 东海岸", name: "HAEON COAST", chinese: "海隅" },
  { id: "yura", label: "屿庭 YURA COURTYARD", shortLabel: "屿庭 · 南方群岛", name: "YURA COURTYARD", chinese: "屿庭" },
  { id: "moru", label: "雾麓 MORU VALLEY", shortLabel: "雾麓 · 北境杉谷", name: "MORU VALLEY", chinese: "雾麓" },
] as const;

export type Property = {
  id: string;
  name: string;
  chinese: string;
  location: string;
  region: "海岸" | "岛屿" | "山境" | "城市";
  image: string;
  blurb: string;
  note: string;
  from: string;
};

export const properties: Property[] = [
  {
    id: "haeon",
    name: "HAEON COAST",
    chinese: "海隅",
    location: "东海岸 · 松岬",
    region: "海岸",
    image: assetPath("/images/hero-coast.webp"),
    blurb: "低伏于松林与海崖之间，房间沿地势展开，让第一束晨光穿过石墙。",
    note: "26 SUITES · PRIVATE COAST",
    from: "¥6,800",
  },
  {
    id: "yura",
    name: "YURA COURTYARD",
    chinese: "屿庭",
    location: "南方群岛 · 榕湾",
    region: "岛屿",
    image: assetPath("/images/courtyard-pool.webp"),
    blurb: "一座围绕水院生长的隐居之所，白墙、旧木与热带树影共同调节时间。",
    note: "18 COURTYARDS · ISLAND GARDEN",
    from: "¥5,200",
  },
  {
    id: "moru",
    name: "MORU VALLEY",
    chinese: "雾麓",
    location: "北境 · 杉谷",
    region: "山境",
    image: assetPath("/images/mountain-onsen.webp"),
    blurb: "雨后的杉谷、火山石汤池与温暖木构，在雾里构成一段安静的山居。",
    note: "32 LODGES · MINERAL SPRING",
    from: "¥4,900",
  },
  {
    id: "sora",
    name: "SORA HOUSE",
    chinese: "空庭",
    location: "西岸 · 白汀",
    region: "海岸",
    image: assetPath("/images/suite-ocean.webp"),
    blurb: "向海展开的长窗与下沉客厅，让建筑退到视野之外，只留下潮汐。",
    note: "12 HOUSES · OPEN HORIZON",
    from: "¥7,600",
  },
  {
    id: "nami",
    name: "NAMI CLIFF",
    chinese: "浪崖",
    location: "澄湾 · 火岬",
    region: "岛屿",
    image: assetPath("/images/dining-cliff.webp"),
    blurb: "夜幕落下后，开放火房成为旅店的中心，山海风物在同一张长桌相遇。",
    note: "20 ROOMS · FIRE KITCHEN",
    from: "¥5,800",
  },
  {
    id: "noa",
    name: "NOA RESIDENCE",
    chinese: "诺雅公馆",
    location: "澜城 · 旧港",
    region: "城市",
    image: assetPath("/images/courtyard-pool.webp"),
    blurb: "藏在旧港石巷后的城市庭院，以私宅尺度连接餐厅、艺廊与客房。",
    note: "40 ROOMS · CITY COURTYARD",
    from: "¥3,900",
  },
];

export const navItems = [
  { href: "/hotels", label: "酒店与居所", en: "STAYS" },
  { href: "/property", label: "海隅酒店", en: "HAEON" },
  { href: "/#experiences", label: "体验", en: "EXPERIENCES" },
  { href: "/#journal", label: "行旅志", en: "JOURNAL" },
];
