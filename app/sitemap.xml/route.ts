import { siteUrl } from "@/lib/seo";

const routes = [
  "/",
  "/services",
  "/window-tint",
  "/ceramic-coating",
  "/membership",
  "/gallery",
  "/reviews",
  "/contact",
  "/quote",
  "/gift-cards"
];

export async function GET() {
  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${siteUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
}
