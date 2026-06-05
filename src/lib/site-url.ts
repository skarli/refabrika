// Tek kaynak: canonical / Open Graph / sitemap / schema URL'leri buradan gelir.
//
// Vercel önizleme ve production deploy'larında otomatik `*.vercel.app` host'u
// canonical'a sızmasın diye burada koruma var: NEXT_PUBLIC_SITE_URL set değilse
// VEYA yanlışlıkla bir vercel.app değeri verilmişse, her zaman canonical
// production domain'e (refabrika.com) düşülür.

const CANONICAL_FALLBACK = "https://refabrika.com";

function normalize(url: string): string {
  // Sondaki slash'i temizle (canonical tutarlılığı için).
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!envUrl) return CANONICAL_FALLBACK;

  // vercel.app host'larını canonical olarak ASLA kullanma.
  if (/\.vercel\.app$/i.test(envUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, ""))) {
    return CANONICAL_FALLBACK;
  }

  // Şema eksikse https varsay.
  const withScheme = /^https?:\/\//i.test(envUrl) ? envUrl : `https://${envUrl}`;

  return normalize(withScheme);
}

// Sık kullanım için sabit (modül yükleme anında değerlenir).
export const SITE_URL = getSiteUrl();
