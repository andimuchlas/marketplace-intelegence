/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/radar-harga',
        destination: '/',
        permanent: true,
      },
      {
        source: '/marketplace-calculator',
        destination: '/seller/kalkulator',
        permanent: true,
      },
      {
        source: '/shopee-profit-calculator',
        destination: '/seller/kalkulator/shopee',
        permanent: true,
      },
      {
        source: '/tokopedia-profit-calculator',
        destination: '/seller/kalkulator/tokopedia',
        permanent: true,
      },
      {
        source: '/tiktok-shop-profit-calculator',
        destination: '/seller/kalkulator/tiktok-shop',
        permanent: true,
      },
      {
        source: '/lazada-profit-calculator',
        destination: '/seller/kalkulator/lazada',
        permanent: true,
      },
      {
        source: '/shopee-fee',
        destination: '/seller/biaya-admin/shopee',
        permanent: true,
      },
      {
        source: '/tokopedia-fee',
        destination: '/seller/biaya-admin/tokopedia',
        permanent: true,
      },
      {
        source: '/tiktok-shop-fee',
        destination: '/seller/biaya-admin/tiktok-shop',
        permanent: true,
      },
      {
        source: '/lazada-fee',
        destination: '/seller/biaya-admin/lazada',
        permanent: true,
      },
      {
        source: '/compare',
        destination: '/seller/komparasi-fee',
        permanent: true,
      },
      {
        source: '/compare/shopee-vs-tokopedia',
        destination: '/seller/komparasi-fee/shopee-vs-tokopedia',
        permanent: true,
      },
      {
        source: '/compare/shopee-vs-tiktok-shop',
        destination: '/seller/komparasi-fee/shopee-vs-tiktok-shop',
        permanent: true,
      },
      {
        source: '/compare/tokopedia-vs-tiktok-shop',
        destination: '/seller/komparasi-fee/tokopedia-vs-tiktok-shop',
        permanent: true,
      },
      {
        source: '/robot.txt',
        destination: '/robots.txt',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
