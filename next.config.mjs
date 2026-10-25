/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pricing is no longer published on the site; send old /pricing links
  // to the contact page instead of a 404.
  async redirects() {
    return [{ source: "/pricing", destination: "/contact", permanent: false }];
  },
};

export default nextConfig;
