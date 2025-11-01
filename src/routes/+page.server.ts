import type { ServerLoad } from '@sveltejs/kit';
import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';

export const load: ServerLoad = async ({ fetch }) => {
	const fetchedAt = new Date().toISOString();
	const headers = {
		'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
	};

	try {
		// Fetch books status, latest book, last visited book, random books, reading summary, latest reading, reading reviews, WOTD, QOTD, and WordPress posts in parallel
		const [statusResponse, latestResponse, lastVisitedResponse, randomResponse, readingSummaryResponse, latestReadingResponse, readingReviewsResponse, wotdResponse, qotdResponse, wpPostsResponse] = await Promise.all([
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/status`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/latest/1`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/last_visited/1`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/random/4`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/readings/summary`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/readings/latest/1`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/readings/reviews/1`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/misc/wotd`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/misc/qotd`, { headers }),
			fetch(`${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/wp/posts/today`, { headers })
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

		// Handle reading summary response
		if (readingSummaryResponse.ok) {
			results.readingSummary = await readingSummaryResponse.json();
		} else {
			console.error('Failed to fetch reading summary:', readingSummaryResponse.status);
			results.readingSummary = null;
			results.readingSummaryError = `HTTP error! status: ${readingSummaryResponse.status}`;
		}

		// Handle latest reading response
		if (latestReadingResponse.ok) {
			results.latestReading = await latestReadingResponse.json();
		} else {
			console.error('Failed to fetch latest reading:', latestReadingResponse.status);
			results.latestReading = null;
			results.latestReadingError = `HTTP error! status: ${latestReadingResponse.status}`;
		}

		// Handle reading reviews response
		if (readingReviewsResponse.ok) {
			results.readingReviews = await readingReviewsResponse.json();
		} else {
			console.error('Failed to fetch reading reviews:', readingReviewsResponse.status);
			results.readingReviews = null;
			results.readingReviewsError = `HTTP error! status: ${readingReviewsResponse.status}`;
		}

		// Handle WOTD response
		if (wotdResponse.ok) {
			results.wotd = await wotdResponse.json();
		} else {
			console.error('Failed to fetch WOTD:', wotdResponse.status);
			results.wotd = null;
			results.wotdError = `HTTP error! status: ${wotdResponse.status}`;
		}

		// Handle QOTD response
		if (qotdResponse.ok) {
			results.qotd = await qotdResponse.json();
		} else {
			console.error('Failed to fetch QOTD:', qotdResponse.status);
			results.qotd = null;
			results.qotdError = `HTTP error! status: ${qotdResponse.status}`;
		}

		// Handle WordPress posts response
		if (wpPostsResponse.ok) {
			results.wpPosts = await wpPostsResponse.json();
		} else {
			console.error('Failed to fetch WordPress posts:', wpPostsResponse.status);
			results.wpPosts = null;
			results.wpPostsError = `HTTP error! status: ${wpPostsResponse.status}`;
		}

		return results;
	} catch (error) {
		console.error('Failed to fetch API data:', error);
		return {
			booksStatus: null,
			latestBook: null,
			lastVisitedBook: null,
			randomBooks: null,
			readingSummary: null,
			latestReading: null,
			readingReviews: null,
			wotd: null,
			qotd: null,
			wpPosts: null,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
			fetchedAt
		};
	}
};