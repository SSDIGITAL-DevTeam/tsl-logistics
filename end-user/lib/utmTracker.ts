export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
}

const UTM_COOKIE_NAME = "tsl_utm";
const UTM_STORAGE_KEY = "tsl_utm_params";

export function captureUtmFromUrl(): UtmParams | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || undefined;
  const utmMedium = params.get("utm_medium") || undefined;
  const utmCampaign = params.get("utm_campaign") || undefined;
  const gclid = params.get("gclid") || undefined;

  if (utmSource || utmMedium || utmCampaign || gclid) {
    const data: UtmParams = { utmSource, utmMedium, utmCampaign, gclid };
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
      // Store in cookie for 30 days
      document.cookie = `${UTM_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${30 * 86400}; SameSite=Lax`;
    } catch {}
    return data;
  }
  return null;
}

export function getStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    // 1. Try sessionStorage first
    const sessionData = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    // 2. Fallback to cookie
    const cookies = document.cookie.split("; ");
    const utmCookie = cookies.find((c) => c.startsWith(`${UTM_COOKIE_NAME}=`));
    if (utmCookie) {
      const val = decodeURIComponent(utmCookie.split("=")[1]);
      return JSON.parse(val);
    }
  } catch {}

  return {};
}
