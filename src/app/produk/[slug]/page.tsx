import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan — KaryaRuang",
      description: "Halaman detail produk tidak ditemukan di KaryaRuang.",
    };
  }

  return {
    title: `${product.name} — KaryaRuang Japandi Living`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Cari produk seirama (kategori sama atau produk lain)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  );

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={fallbackRelated}
    />
  );
}
