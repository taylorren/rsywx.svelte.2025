import { RSYWX_API_KEY, RSYWX_API_BASE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
    // Extract parameters with defaults (keep exact values, apply defaults only when missing)
    const searchType = params.type || 'title';
    const searchValue = params.value || '-';  // Keep '-' as is, don't convert to empty string
    const page = parseInt(params.page || '1') || 1;
    const refresh = url.searchParams.get('refresh') === 'true';

    try {
        const headers = {
            'X-API-Key': RSYWX_API_KEY || 'your_api_key_here'
        };

        // Build API URL: /books/list/type/value/page
        // Pass exact parameters to API (including '-' for empty search)
        let apiUrl = `${RSYWX_API_BASE_URL || 'https://api.rsywx.com/api/v1'}/books/list/${searchType}/${encodeURIComponent(searchValue)}/${page}`;

        // Add query parameters
        if (refresh) {
            apiUrl += '?refresh=true';
        }

        const response = await fetch(apiUrl, { headers });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                const result = {
                    books: data.data || [],
                    pagination: data.pagination || {
                        current_page: page,
                        total_pages: 1,
                        total_results: 0,
                        per_page: 20
                    },
                    searchType,
                    searchValue: searchValue === '-' ? '' : searchValue,  // Convert '-' to empty string only for display
                    cached: data.cached || false
                };
                return result;
            }
        }

        throw error(response.status, 'Failed to load books');
    } catch (err) {
        throw error(500, `Internal server error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
};