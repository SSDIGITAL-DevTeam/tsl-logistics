import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-3xl font-bold text-[#252525] mb-3">Article Not Found</h1>
      <p className="text-[#555] mb-8 max-w-md">
        The article you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 bg-[#C8A84B] hover:bg-[#9A7D2D] text-[#1E1E1E] font-bold py-3 px-8 rounded-full uppercase text-sm tracking-widest transition-all"
      >
        Back to Blog
      </Link>
    </div>
  );
}
