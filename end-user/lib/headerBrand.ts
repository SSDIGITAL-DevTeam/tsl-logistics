export function getHeaderBrandName(pathname: string, department?: string | null): string {
  if (pathname.startsWith("/our-team")) {
    if (department === "movers") return "TSL Movers";
    if (department === "express") return "TSL Express";
    return "TSL Logistics";
  }
  if (pathname.startsWith("/tsl-mover")) return "TSL Movers";
  if (pathname.startsWith("/tsl-express")) return "TSL Express";
  if (pathname.startsWith("/warehousing-services")) return "TSL Movers";
  return "TSL Logistics";
}
