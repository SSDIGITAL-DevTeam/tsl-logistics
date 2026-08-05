import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/api";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read everything about logistics, moving services, warehousing tips, and industry insights from TSL Logistics Singapore.",
  alternates: { canonical: "/blog" },
};

const API_URL = process.env.TSL_API_URL ?? "";

export default async function BlogPage() {
  const { rows: posts } = await getBlogPosts({ limit: 9 });

  return (
    <>
      <PageHero title="Blog" image="/images/hero-bg-new.jpg" />

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-sm">No articles published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-grid">
              {posts.map((post) => {
                const coverSrc = post.coverImage
                  ? `${API_URL}${post.coverImage}`
                  : "/images/BANNER new-1920w.png";
                const date = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-SG", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : null;

                return (
                  <article
                    key={post.id}
                    className="bg-white overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          src={coverSrc}
                          // Decorative: the card's <h2> link below repeats the
                          // title, so this image adds no new information.
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.categoryName && (
                          <span className="absolute top-3 left-3 bg-[#C8A84B] text-[#1E1E1E] text-xs font-bold px-3 py-1">
                            {post.categoryName}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-1 border-t-2 border-[#C8A84B]">
                      {date && <span className="text-[#555] text-xs mb-2">{date}</span>}
                      <h2 className="font-bold text-[#252525] text-base leading-snug mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-[#C8A84B] transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt && (
                        <p className="text-[#555] text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-[#C8A84B] font-semibold text-sm hover:text-[#9A7D2D] hover:gap-2 transition-all"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-[#1E1E1E] text-white text-center">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Logistics Solutions?</h2>
          <p className="mb-6 text-white/90">
            Get in touch with our team for personalised logistics, moving, and transportation solutions tailored to your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C8A84B] hover:bg-[#9A7D2D] text-[#1a1a1a] font-semibold py-3 px-8 uppercase text-sm tracking-wide transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
