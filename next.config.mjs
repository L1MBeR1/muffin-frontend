/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						// Здесь можно добавить дополнительные настройки, если нужно
					}
				}
			]
		})

		return config
	}
}

export default nextConfig
