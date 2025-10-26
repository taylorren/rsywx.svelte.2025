import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const refresh = url.searchParams.get('refresh') === 'true';
	
	const headers = {
		'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
	};

	try {
		const apiUrl = `${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/books/random/4${refresh ? '?refresh=true' : ''}`;
		const response = await fetch(apiUrl, { headers });

		if (response.ok) {
			const data = await response.json();
			return json(data);
		} else {
			console.error('Failed to fetch random books:', response.status);
			return json(
				{
					success: false,
					message: `HTTP error! status: ${response.status}`
				},
				{ status: response.status }
			);
		}
	} catch (error) {
		console.error('Failed to fetch random books:', error);
		return json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Unknown error occurred'
			},
			{ status: 500 }
		);
	}
};