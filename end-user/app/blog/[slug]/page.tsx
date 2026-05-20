import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost, getBlogSlugs } from "@/lib/api";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsllogistics.sg";
const API_URL = process.env.TSL_API_URL ?? "";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage =
    post.ogImage ||
    (post.coverImage ? `${API_URL}${post.coverImage}` : `${SITE_URL}/images/BANNER new-1920w.png`);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
      url,
      type: "article",
      images: [{ url: ogImage }],
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || "",
      images: [ogImage],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage =
    post.ogImage ||
    (post.coverImage ? `${API_URL}${post.coverImage}` : `${SITE_URL}/images/BANNER new-1920w.png`);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: ogImage,
    url,
    publisher: {
      "@type": "Organization",
      name: "TSL Logistics",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      {/* Page Header */}
      <div className="bg-[#1E1E1E] py-12 border-b border-[#C8A84B]/30">
        <div className="hero-in max-w-[1200px] mx-auto px-4 text-center">
          <p className="eyebrow mb-2">Blog</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug px-4">{post.title}</h1>
          <div className="gold-divider" />
        </div>
      </div>

      {/* Article */}
      <article className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-4">
          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8">
            {post.categoryName && (
              <span className="bg-[#C8A84B] text-white px-3 py-1 rounded-full text-xs font-bold">
                {post.categoryName}
              </span>
            )}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>

          {/* Cover image */}
          {post.coverImage && (
            <div className="aspect-video relative overflow-hidden rounded-xl mb-8 shadow-md">
              <Image
                src={`${API_URL}${post.coverImage}`}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Rich text content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#C8A84B] font-semibold text-sm hover:text-[#F05921] transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-14 bg-[#1E1E1E] text-white text-center">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Need Logistics Solutions?</h2>
          <p className="mb-6 text-white/90 text-sm">
            Get in touch with our team for personalised logistics, moving, and transportation solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C8A84B] hover:bg-[#9A7D2D] text-[#1E1E1E] font-bold py-3 px-8 rounded-full uppercase text-sm tracking-widest transition-all hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
