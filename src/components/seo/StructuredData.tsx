export default function StructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://moh-dev.vercel.app");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Mohamed Hadou",
    alternateName: ["Moh Dev", "MohDev", "محمد حدو"],
    jobTitle: "Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer building modern websites, eCommerce platforms, and custom web applications with a focus on clean architecture and high conversion.",
    url: siteUrl,
    image: `${siteUrl}/moha.webp`,
    email: "mailto:mohamedhadou820@email.com",
    telephone: "+213794298501",
    sameAs: [
      "https://github.com/moh-dev10",
      "https://linkedin.com/in/moh-dev10",
      "https://instagram.com/mohdev10",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Algeria",
    },
    knowsAbout: [
      "Web Development",
      "Full-Stack Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "WordPress",
      "WooCommerce",
      "PostgreSQL",
      "Tailwind CSS",
      "E-Commerce Solutions",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Moh Dev | Full-Stack Web Developer",
    alternateName: ["Moh Dev Portfolio", "Moh.Dev"],
    description:
      "Official portfolio of Moh Dev — Full-Stack Web Developer building modern websites, eCommerce platforms, and custom web solutions.",
    inLanguage: ["en", "ar"],
    author: {
      "@id": `${siteUrl}/#person`,
    },
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
