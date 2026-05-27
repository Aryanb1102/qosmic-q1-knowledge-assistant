// Keep GitHub Pages base-path handling in this one place.
// For local preview and generic static hosting, leave BASE_PATH as an empty string.
// Before deploying to a GitHub Pages project URL, change this to '/REPO_NAME'
// so both routes and emitted asset URLs resolve correctly.
const BASE_PATH = '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH || undefined,
};

export default nextConfig;
