import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const { count } = params;
	
	if (!count || isNaN(Number(count))) {
		return json(
			{
				success: false,
				message: 'Valid count parameter is required'
			},
			{ status: 400 }
		);
	}

	const bookCount = Number(count);
	if (bookCount < 1 || bookCount > 50) {
		return json(
			{
				success: false,
				message: 'Count must be between 1 and 50'
			},
			{ status: 400 }
		);
	}

	// 检查是否需要刷新缓存
	const refresh = url.searchParams.get('refresh') === 'true';

	try {
		const headers = {
			'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
		};

		const apiUrl = `${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/random/${bookCount}${refresh ? '?refresh=true' : ''}`;
		
		const response = await fetch(apiUrl, { headers });

		if (response.ok) {
			const data = await response.json();
			return json(data);
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('Failed to fetch random books:', response.status, errorData);
			return json(
				{
					success: false,
					message: errorData.message || `HTTP error! status: ${response.status}`
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