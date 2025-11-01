import { siteConfig } from '$lib/config/site';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const staticPages = [
		'',
		'/contact',
		'/readings',
		'/books/popular',
		'/books/random',
		'/books/today',
		'/books/unpopular',
		'/books/forgotten',
		'/books/last_visited',
		'/books/visits'
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${staticPages
		.map(
			(page) => `
	<url>
		<loc>${siteConfig.url}${page}</loc>
		<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
		<changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
		<priority>${page === '' ? '1.0' : '0.8'}</priority>
	</url>`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};