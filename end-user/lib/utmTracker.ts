export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  // Google Ads sends these instead of gclid on iOS 14.5+, where a gclid
  // cannot be set: gbraid for app→web, wbraid for web→web. Without them a
  // sizeable share of paid clicks looks like direct traffic.
  gbraid?: string;
  wbraid?: string;
}

const UTM_COOKIE_NAME = "tsl_utm";
const UTM_STORAGE_KEY = "tsl_utm_params";

const PARAM_MAP: Record<keyof UtmParams, string> = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  gclid: "gclid",
  gbraid: "gbraid",
  wbraid: "wbraid",
};

export function captureUtmFromUrl(): UtmParams | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const incoming: UtmParams = {};
  for (const [key, param] of Object.entries(PARAM_MAP) as [keyof UtmParams, string][]) {
    const value = params.get(param);
    if (value) incoming[key] = value;
  }

  // Google Ads auto-tagging often appends `gad_source` (e.g. `gad_source=1`).
  // If present without explicit UTMs or gclid, mark as Google Paid Search (cpc).
  const gadSource = params.get("gad_source");
  if (gadSource && !incoming.gclid && !incoming.utmSource) {
    incoming.utmSource = "google";
    incoming.utmMedium = "cpc";
  }

  if (Object.keys(incoming).length === 0) return null;

  // Merge rather than replace. Auto-tagging and manual tagging can arrive on
  // different landings — overwriting the whole object would let a `?gclid=`
  // link wipe the utm_* captured earlier (and vice versa), losing the campaign
  // name on exactly the leads we most want to attribute.
  const data: UtmParams = { ...getStoredUtm(), ...incoming };

  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
    // Store in cookie for 30 days
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${UTM_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${30 * 86400}; SameSite=Lax${secure}`;
  } catch {}

  return data;
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
