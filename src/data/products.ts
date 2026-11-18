export type ProductCategory =
  | "Ruang Tamu"
  | "Kamar Tidur"
  | "Ruang Kerja"
  | "Dekorasi";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: ProductCategory;
  material: string;
  description: string;
  dimensions?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Sofa Tiga Dudukan Asahi",
    slug: "sofa-tiga-dudukan-asahi",
    price: 8750000,
    category: "Ruang Tamu",
    material: "Rangka Kayu Jati Solid, Busa High-Resilience, Pelapis Linen Alami Belgia",
    description:
      "Sofa dengan proporsi rendah khas Japandi yang menggabungkan ketenangan estetika Jepang dengan kenyamanan bantalan empuk berlapis serat linen murni bersirkulasi udara sejuk.",
    dimensions: "210 x 88 x 72 cm",
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    featured: true,
    image: "",
  },
  {
    id: "prod-2",
    name: "Kursi Santai Natsumi Lounge",
    slug: "kursi-santai-natsumi-lounge",
    price: 3450000,
    category: "Ruang Tamu",
    material: "Kayu Jati Solid Perhutani, Anyaman Rotan Alami Dikerjakan Manual",
    description:
      "Kursi santai beraksen anyaman rotan dengan lekuk ergonomis lembut untuk sudut baca yang hening dan menenangkan di ruang keluarga Anda.",
    dimensions: "68 x 76 x 78 cm",
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    featured: true,
    image: "",
  },
  {
    id: "prod-3",
    name: "Rangka Tempat Tidur Mori Platform",
    slug: "rangka-tempat-tidur-mori-platform",
    price: 11200000,
    category: "Kamar Tidur",
    material: "Kayu Oak Alami & Jati Solid dengan Lapisan Hardwax Oil Organik",
    description:
      "Tempat tidur platform berdesain mengambang (floating base) dengan sandaran kepala miring yang menyatu harmonis dengan suasana hening kamar tidur.",
    dimensions: "180 x 200 x 85 cm (King Size)",
    rating: 5.0,
    reviewsCount: 24,
    inStock: true,
    featured: true,
    image: "",
  },
  {
    id: "prod-4",
    name: "Nakas Minimalis Sora Bedside",
    slug: "nakas-minimalis-sora-bedside",
    price: 1850000,
    category: "Kamar Tidur",
    material: "Kayu Jati Grade A dengan Laci Sambungan Tradisional Dovetail",
    description:
      "Meja samping tempat tidur dengan laci senyap bertutup halus dan kompartemen terbuka untuk buku favorit, kacamata, dan lampu tidur.",
    dimensions: "45 x 40 x 50 cm",
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    featured: false,
    image: "",
  },
  {
    id: "prod-5",
    name: "Meja Kerja Eksekutif Takumi",
    slug: "meja-kerja-eksekutif-takumi",
    price: 6200000,
    category: "Ruang Kerja",
    material: "Kayu Mahoni Solid & Aksen Kuningan Bertekstur Antik",
    description:
      "Meja kerja lapang dengan sistem manajemen kabel tersembunyi dan permukaan kayu bertekstur halus yang menunjang konsentrasi kerja mendalam.",
    dimensions: "150 x 70 x 75 cm",
    rating: 4.9,
    reviewsCount: 41,
    inStock: true,
    featured: true,
    image: "",
  },
  {
    id: "prod-6",
    name: "Kursi Kerja Ergonomis Haru",
    slug: "kursi-kerja-ergonomis-haru",
    price: 2950000,
    category: "Ruang Kerja",
    material: "Rangka Kayu Beech Bersertifikasi FSC & Dudukan Katun Wool Blend",
    description:
      "Kombinasi kelenturan bentuk kurva alami dengan penopang lumbar aktif untuk produktivitas kerja berjam-jam tanpa rasa lelah.",
    dimensions: "60 x 62 x 82 cm",
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    featured: false,
    image: "",
  },
  {
    id: "prod-7",
    name: "Lampu Meja Keramik Wabi Ambient",
    slug: "lampu-meja-keramik-wabi-ambient",
    price: 1250000,
    category: "Dekorasi",
    material: "Keramik Tanah Liat Handmade & Kap Lampu Kertas Washi Jepang",
    description:
      "Pancaran cahaya hangat lembut menembus serat kertas washi alami di atas dasar keramik bertekstur mentah yang puitis dan menenangkan jiwa.",
    dimensions: "30 x 30 x 48 cm",
    rating: 4.9,
    reviewsCount: 63,
    inStock: true,
    featured: true,
    image: "",
  },
  {
    id: "prod-8",
    name: "Vas Keramik Tekstur Kanso",
    slug: "vas-keramik-tekstur-kanso",
    price: 680000,
    category: "Dekorasi",
    material: "Tanah Liat Terracotta Bertekstur Kasar Berglasir Matte",
    description:
      "Vas siluet organik asimetris yang merayakan keindahan ketidaksempurnaan alami untuk rangkaian ranting kering atau seni merangkai ikebana.",
    dimensions: "18 x 18 x 28 cm",
    rating: 4.7,
    reviewsCount: 15,
    inStock: true,
    featured: false,
    image: "",
  },
];
