import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | TSL Logistics",
  description:
    "Read everything about house and office moving services, logistics tips, and industry insights by looking through our blog today.",
};

const posts = [
  {
    img: "/images/TSL Moving Furniture.jpeg",
    category: "Moving Tips",
    date: "March 15, 2024",
    title: "10 Tips for a Stress-Free Office Relocation",
    excerpt:
      "Planning an office move can be overwhelming. From coordinating with IT teams to ensuring minimal downtime, here are our top tips to make your next office relocation smooth and hassle-free.",
  },
  {
    img: "/images/TSL Logistics Trucker Container-1280w.png",
    category: "Logistics",
    date: "February 28, 2024",
    title: "Understanding Container Haulier Services in Singapore",
    excerpt:
      "Whether you need Full Container Load (FCL) or Less Than Container Load (LCL) services, understanding your options is key to efficient supply chain management. Here's what you need to know.",
  },
  {
    img: "/images/TSL Logistics Warehouse-1920w.jpeg",
    category: "Warehousing",
    date: "February 10, 2024",
    title: "How Smart Warehousing Drives Business Growth",
    excerpt:
      "Modern warehousing is more than just storage. Advanced inventory management systems, flexible space solutions, and real-time visibility can transform your supply chain operations.",
  },
  {
    img: "/images/TSL Logistics DG TRUCK-1280w.png",
    category: "DG Trucking",
    date: "January 22, 2024",
    title: "Dangerous Goods Transportation: Safety First",
    excerpt:
      "Transporting hazardous materials requires strict compliance with local and international regulations. Learn how TSL Logistics ensures your DG cargo is transported safely and responsibly.",
  },
  {
    img: "/images/TSL Rental Vehicle-1280w.png",
    category: "Vehicle Rental",
    date: "January 8, 2024",
    title: "Choosing the Right Vehicle for Your Cargo Needs",
    excerpt:
      "From compact cargo vans to heavy-duty tanker trucks, selecting the right vehicle for your shipment is crucial for efficiency and cost management. Here's a practical guide.",
  },
  {
    img: "/images/containers2-1280w.jpeg",
    category: "Industry Insights",
    date: "December 15, 2023",
    title: "The Future of Logistics in Singapore: Trends to Watch",
    excerpt:
      "Singapore continues to be one of Asia's most important logistics hubs. Discover the key trends shaping the future of logistics, from digital transformation to sustainable practices.",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Page Title */}
      <div className="bg-[#1E1E1E] py-12 border-b border-[#C8A84B]/30">
        <div className="hero-in max-w-[1200px] mx-auto px-4 text-center">
          <p className="eyebrow mb-2">News &amp; Insights</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Blog</h1>
          <p className="text-gray-300 mt-2 text-sm">Industry insights, tips, and news from TSL Logistics</p>
          <div className="gold-divider" />
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-grid">
            {posts.map((post, i) => (
              <article key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#C8A84B] text-[#1E1E1E] text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 border-t-2 border-[#C8A84B]">
                  <span className="text-[#555] text-xs mb-2">{post.date}</span>
                  <h2 className="font-bold text-[#252525] text-base leading-snug mb-3">{post.title}</h2>
                  <p className="text-[#555] text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-[#C8A84B] font-semibold text-sm hover:text-[#F05921] hover:gap-2 transition-all"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-[#1E1E1E] text-white text-center">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Logistics Solutions?</h2>
          <p className="mb-6 text-white/90">
            Get in touch with our team for personalised logistics, moving, and transportation solutions tailored to
            your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F05921] hover:bg-[#d44d1a] text-white font-semibold py-3 px-8 rounded uppercase text-sm tracking-wide transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}

