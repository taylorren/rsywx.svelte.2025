import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { bookid } = params;
	
	// Validate bookid format (should be 5 digits)
	if (!/^\d{5}$/.test(bookid)) {
		throw error(400, 'Invalid book ID format. Expected 5 digits.');
	}

	const headers = {
		'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
	};

	try {
		const response = await fetch(
			`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/${bookid}`,
			{ headers }
		);

		if (response.ok) {
			const bookData = await response.json();
			
			if (bookData.success && bookData.data) {
				return {
					book: bookData.data,
					cached: bookData.cached || false
				};
			} else {
				throw error(404, 'Book not found');
			}
		} else if (response.status === 404) {
			throw error(404, 'Book not found');
		} else {
			console.error('Failed to fetch book details:', response.status);
			throw error(500, 'Failed to load book details');
		}
	} catch (err) {
		console.error('Error fetching book details:', err);
		if (err instanceof Error && err.message.includes('404')) {
			throw error(404, 'Book not found');
		}
		throw error(500, 'Failed to load book details');
	}
};