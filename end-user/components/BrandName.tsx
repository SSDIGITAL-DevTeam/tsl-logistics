"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getHeaderBrandName } from "@/lib/headerBrand";

/**
 * Renders the header/footer brand wordmark.
 *
 * `useSearchParams()` opts its whole subtree out of static rendering, so when
 * Header and Footer called it directly, neither appeared in the server HTML at
 * all — every nav and footer link was invisible to crawlers that don't run JS.
 * Isolating that call here keeps the bailout scoped to this one <span>: the
 * nav shell prerenders, and the Suspense fallback already carries the correct
 * name for every route except the `?department=` variants of /our-team, which
 * resolve on hydration.
 */
function BrandNameWithDepartment() {
  const pathname = usePathname();
  const department = useSearchParams().get("department");
  return <>{getHeaderBrandName(pathname, department)}</>;
}

export default function BrandName() {
  const pathname = usePathname();
  return (
    <Suspense fallback={<>{getHeaderBrandName(pathname)}</>}>
      <BrandNameWithDepartment />
    </Suspense>
  );
}
