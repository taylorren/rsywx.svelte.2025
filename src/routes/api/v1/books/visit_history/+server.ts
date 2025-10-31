import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ url, fetch }) => {
	// Get query parameters
	const days = url.searchParams.get('days') || '30';
	const refresh = url.searchParams.get('refresh') === 'true';

	// Validate days parameter
	const daysNum = parseInt(days);
	if (isNaN(daysNum) || daysNum < 1 || daysNum > 365) {
		return json(
			{
				success: false,
				message: 'Days must be between 1 and 365'
			},
			{ status: 400 }
		);
	}

	try {
		const headers = {
			'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
		};

		const queryParams = new URLSearchParams();
		queryParams.set('days', days);
		if (refresh) {
			queryParams.set('refresh', 'true');
		}

		const apiUrl = `${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/visit_history?${queryParams}`;
		
		const response = await fetch(apiUrl, { headers });

		if (response.ok) {
			const data = await response.json();
			return json(data);
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('Failed to fetch visit history:', response.status, errorData);
			return json(
				{
					success: false,
					message: errorData.message || `HTTP error! status: ${response.status}`
				},
				{ status: response.status }
			);
		}
	} catch (error) {
		console.error('Failed to fetch visit history:', error);
		return json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Unknown error occurred'
			},
			{ status: 500 }
		);
	}
};