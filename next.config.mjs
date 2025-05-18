/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['antd', '@ant-design', 'rc-util','rc-input', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip', 'rc-tree', 'rc-table', 'd3-org-chart'],
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
