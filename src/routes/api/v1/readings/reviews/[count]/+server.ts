import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const page = params.count || '1'; // count parameter is actually the page number
	const refresh = url.searchParams.get('refresh') === 'true';

	// Debug environment variables
	console.log('[API] Environment check:', {
		RSYWX_API_BASE_URL: process.env.RSYWX_API_BASE_URL,
		RSYWX_API_KEY: process.env.RSYWX_API_KEY ? 'SET' : 'NOT SET',
		NODE_ENV: process.env.NODE_ENV
	});

	try {
		const headers = {
			'X-API-Key': process.env.RSYWX_API_KEY || 'your_api_key_here'
		};

		// Build query parameters
		const queryParams = new URLSearchParams();
		if (refresh) queryParams.set('refresh', 'true');
		
		const queryString = queryParams.toString();
		const baseUrl = process.env.RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1';
		const apiUrl = `${baseUrl}/readings/reviews/${page}${queryString ? '?' + queryString : ''}`;
		
		console.log('[API] Final API URL:', apiUrl);
		console.log('[API] Headers:', headers);
		
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