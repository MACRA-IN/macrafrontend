import { Helmet } from "react-helmet-async";

const SITE_URL = "https://macra.in";
const DEFAULT_IMAGE = "https://macra.in/og-image.jpg";
const DEFAULT_DESC =
  "Subscribe to macro-tracked protein bowls delivered fresh to your door in Hyderabad. Pick a tier, plan your week, get lunch and dinner daily. Starting at ₹149/bowl.";

export default function SEO({
  title = "Macra — High Protein Bowls Delivered Daily in Hyderabad",
  description = DEFAULT_DESC,
  keywords = "",
  canonicalPath = "",
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noIndex = false,
  structuredData = null,
}) {
  const canonical = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Macra" />
      <meta name="theme-color" content="#2CD377" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Macra" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Macra — Protein bowls delivered daily in Hyderabad" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
