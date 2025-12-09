import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const page = parseInt(params.page || '1');
	
	try {
		// Note: The API uses [count] parameter but it actually represents the page number
		const apiUrl = `/api/v1/readings/reviews/${page}`;
		console.log('[Readings] Fetching:', apiUrl);
		const response = await fetch(apiUrl);
		const data = await response.json();
		
		console.log('[Readings] Response:', JSON.stringify(data, null, 2));
		
		if (data.success) {
			return {
				reviews: data.data || [],
				pagination: data.pagination || { current_page: page, total_pages: 1, total_results: 0 },
				loading: false,
				error: null
			};
		} else {
			console.error('[Readings] API error:', data.message);
			return {
				reviews: [],
				pagination: { current_page: page, total_pages: 1, total_results: 0 },
				loading: false,
				error: data.message || '获取读书笔记失败'
			};
		}
	} catch (error) {
		console.error('[Readings] Error loading reviews:', error);
		return {
			reviews: [],
			pagination: { current_page: page, total_pages: 1, total_results: 0 },
			loading: false,
			error: '网络错误，请稍后重试'
		};
	}
};