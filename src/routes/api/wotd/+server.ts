import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ fetch }) => {
	const headers = {
		'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
	};

	try {
		const response = await fetch(`${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/misc/wotd`, { 
			headers 
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Failed to fetch WOTD:', error);
		return json(
			{ 
				success: false, 
				error: error instanceof Error ? error.message : 'Unknown error occurred' 
			},
			{ status: 500 }
		);
	}
};