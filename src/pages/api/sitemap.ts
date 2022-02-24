import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * API route to get the sitemap of the website
 */

const sitemapEndpoint: NextApiHandler = (_: NextApiRequest, response: NextApiResponse) => {
  const date: string = new Date().toLocaleString("de", { year: "numeric", month: "2-digit", day: "2-digit" }).split(".").reverse().join("-");
  const sitemap: string = `<?xml version="1.0" encoding="UTF-8"?>

  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
    <url>
      <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
      <lastmod>${date}</lastmod>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_HOSTNAME}/search</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
      <lastmod>${date}</lastmod>
    </url>
  </urlset>`;

  response.setHeader("Content-Type", "text/xml");
  response.write(sitemap);
  response.end();
};

export default sitemapEndpoint;
