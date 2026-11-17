/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pricing is no longer published on the site; send old /pricing links
  // to the contact page instead of a 404.
  async redirects() {
    return [{ source: "/pricing", destination: "/contact", permanent: true }];
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
