import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const page = parseInt(params.page || '1');
	
	try {
		const apiUrl = `/api/v1/readings/reviews/${page}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		
		if (data.success) {
			return {
				reviews: data.data,
				pagination: data.pagination,
				loading: false,
				error: null
			};
		} else {
			return {
				reviews: [],
				pagination: { current_page: page, total_pages: 1, total_results: 0 },
				loading: false,
				error: data.message || '获取读书笔记失败'
			};
		}
	} catch (error) {
		console.error('Error loading reviews:', error);
		return {
			reviews: [],
			pagination: { current_page: page, total_pages: 1, total_results: 0 },
			loading: false,
			error: '网络错误，请稍后重试'
		};
	}
};