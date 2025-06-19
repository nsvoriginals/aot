// next.config.js
module.exports = {
  output: 'export', // This enables static export
  trailingSlash: true, // Optional: creates /about/ instead of /about
  images: {
    unoptimized: true // Required for static exports
  }
}