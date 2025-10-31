import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const page = params.count || '1'; // count parameter is actually the page number
	const refresh = url.searchParams.get('refresh') === 'true';

	try {
		const headers = {
			'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
		};

		// Build query parameters
		const queryParams = new URLSearchParams();
		if (refresh) queryParams.set('refresh', 'true');
		
		const queryString = queryParams.toString();
		const apiUrl = `${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/readings/reviews/${page}${queryString ? '?' + queryString : ''}`;
		
		const response = await fetch(apiUrl, { headers });

		if (response.ok) {
			const data = await response.json();
			return json(data);
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('Failed to fetch reviews:', response.status, errorData);
			return json(
				{
					success: false,
					message: errorData.message || `HTTP error! status: ${response.status}`
				},
				{ status: response.status }
			);
		}
	} catch (error) {
		console.error('Failed to fetch reviews:', error);
		return json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Unknown error occurred'
			},
			{ status: 500 }
		);
	}
};