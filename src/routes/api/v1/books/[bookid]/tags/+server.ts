import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const POST: RequestHandler = async ({ params, request, fetch }) => {
	const { bookid } = params;
	
	if (!bookid) {
		return json(
			{
				success: false,
				message: 'Book ID is required'
			},
			{ status: 400 }
		);
	}

	try {
		const requestBody = await request.json();
		
		if (!requestBody.tags || !Array.isArray(requestBody.tags)) {
			return json(
				{
					success: false,
					message: 'Tags array is required'
				},
				{ status: 400 }
			);
		}

		const headers = {
			'Content-Type': 'application/json',
			'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
		};

		const apiUrl = `${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/${bookid}/tags`;
		
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			const data = await response.json();
			return json(data);
		} else {
			const errorData = await response.json().catch(() => ({}));
			console.error('Failed to add tags:', response.status, errorData);
			return json(
				{
					success: false,
					message: errorData.message || `HTTP error! status: ${response.status}`
				},
				{ status: response.status }
			);
		}
	} catch (error) {
		console.error('Failed to add tags:', error);
		return json(
			{
				success: false,
				message: error instanceof Error ? error.message : 'Unknown error occurred'
			},
			{ status: 500 }
		);
	}
};