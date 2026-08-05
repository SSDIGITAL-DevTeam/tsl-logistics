// Server Component. Header and Footer are client components, but they now
// prerender to static HTML because the only useSearchParams() call lives
// inside BrandName, which brings its own Suspense boundary.
//
// This file previously wrapped both in <Suspense fallback={null}>, which meant
// the search-params bailout replaced the entire header and footer with nothing
// in the server HTML — no nav links, no footer sitemap links, nothing for a
// crawler to follow.
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function SiteHeader() {
  return <Header />;
}

export function SiteFooter() {
  return <Footer />;
}
