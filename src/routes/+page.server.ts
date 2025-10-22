import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('http://api.rsywx/api/v1/books/status', {
			headers: {
				'X-API-Key': '4046c526d0a9bd30d045b69105ac74d6723b1f13de04f1565957b8f9c9caa15e'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const booksStatus = await response.json();

		return {
			booksStatus,
			fetchedAt: new Date().toISOString()
		};
	} catch (error) {
		console.error('Failed to fetch books status:', error);
		return {
			booksStatus: null,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
			fetchedAt: new Date().toISOString()
		};
	}
};