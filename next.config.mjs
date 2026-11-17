/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pricing is no longer published on the site; send old /pricing links
  // to the contact page instead of a 404.
  async redirects() {
    return [
      { source: "/pricing", destination: "/growing-businesses", permanent: true },
      // Executive Rooms were retired in the 2026 revamp; each maps to the
      // service or audience page that now covers its topic.
      { source: "/rooms/cfo", destination: "/fractional-cfo-services", permanent: true },
      { source: "/rooms/board", destination: "/fractional-cfo-services", permanent: true },
      { source: "/rooms/coo", destination: "/financial-systems", permanent: true },
      { source: "/rooms/cro", destination: "/financial-systems", permanent: true },
      { source: "/rooms/ceo", destination: "/growing-businesses", permanent: true },
      { source: "/rooms/cmo", destination: "/growing-businesses", permanent: true },
      { source: "/rooms/experts", destination: "/about", permanent: true },
      { source: "/rooms", destination: "/growing-businesses", permanent: true },
      { source: "/ai-automations", destination: "/financial-systems", permanent: true },
      // Journal moved to Insights. Retired posts go to the index.
      { source: "/blog/44-percent-women-led", destination: "/insights", permanent: true },
      { source: "/blog/three-pathways-to-impact", destination: "/insights", permanent: true },
      { source: "/blog/what-56-founders-taught-us", destination: "/insights", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
      // The diagnostic runs on the Management Capital Lab platform.
      {
        source: "/diagnostic",
        destination: "https://www.managementcapitallab.com/platform/login",
        permanent: false,
      },
    ];
  },
  // The internal OS and client portal must never appear in search results.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/os", headers: noindex },
      { source: "/os/:path*", headers: noindex },
      { source: "/portal", headers: noindex },
      { source: "/portal/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
