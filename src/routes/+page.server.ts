import type { ServerLoad } from '@sveltejs/kit';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const load: ServerLoad = async ({ fetch }) => {
	const fetchedAt = new Date().toISOString();
	const headers = {
		'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
	};

	try {
		// Fetch books status, latest book, last visited book, and random books in parallel
		const [statusResponse, latestResponse, lastVisitedResponse, randomResponse] = await Promise.all([
			fetch(`${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/books/status`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/books/latest/1`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/books/last_visited/1`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'http://api.rsywx/api/v1'}/books/random/4`, { headers })
		]);

		const results: any = { fetchedAt };

		// Handle books status response
		if (statusResponse.ok) {
			results.booksStatus = await statusResponse.json();
		} else {
			console.error('Failed to fetch books status:', statusResponse.status);
			results.booksStatus = null;
			results.statusError = `HTTP error! status: ${statusResponse.status}`;
		}

		// Handle latest book response
		if (latestResponse.ok) {
			results.latestBook = await latestResponse.json();
		} else {
			console.error('Failed to fetch latest book:', latestResponse.status);
			results.latestBook = null;
			results.latestError = `HTTP error! status: ${latestResponse.status}`;
		}

		// Handle last visited book response
		if (lastVisitedResponse.ok) {
			results.lastVisitedBook = await lastVisitedResponse.json();
		} else {
			console.error('Failed to fetch last visited book:', lastVisitedResponse.status);
			results.lastVisitedBook = null;
			results.lastVisitedError = `HTTP error! status: ${lastVisitedResponse.status}`;
		}

		// Handle random books response
		if (randomResponse.ok) {
			results.randomBooks = await randomResponse.json();
		} else {
			console.error('Failed to fetch random books:', randomResponse.status);
			results.randomBooks = null;
			results.randomError = `HTTP error! status: ${randomResponse.status}`;
		}

		return results;
	} catch (error) {
		console.error('Failed to fetch API data:', error);
		return {
			booksStatus: null,
			latestBook: null,
			lastVisitedBook: null,
			randomBooks: null,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
			fetchedAt
		};
	}
};