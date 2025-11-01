import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
	try {
		const refresh = url.searchParams.get('refresh') === 'true';
		const today = new Date();
		const month = today.getMonth() + 1; // JavaScript months are 0-based
		const day = today.getDate();

		// Call the backend API
		const baseUrl = process.env.RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1';
		const apiKey = process.env.RSYWX_API_KEY || 'your_api_key_here';
		const apiUrl = `${baseUrl}/wp/posts/today/${month}/${day}${refresh ? '?refresh=true' : ''}`;
		
		const response = await fetch(apiUrl, {
			headers: {
				'X-API-Key': apiKey
			}
		});
		
		if (!response.ok) {
			throw new Error(`API request failed: ${response.status}`);
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error fetching WordPress posts:', error);
		return json({
			success: false,
			message: 'Failed to fetch WordPress posts',
			data: [],
			count: 0
		}, { status: 500 });
	}
};