import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/admin/', '/_next/', '/test-results/'],
			},
			{
				userAgent: 'Googlebot',
				allow: '/',
				disallow: ['/api/'],
			},
			{
				userAgent: 'Bingbot',
				allow: '/',
				disallow: ['/api/'],
			},
		],
		sitemap: 'https://calc1.ru/sitemap.xml',
	}
}

