import type { PageServerLoad } from './$types';
import type { Book } from '$lib/types/api';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const res = await fetch('/api/v1/books/random/9');
        if (!res.ok) {
            return { books: [], error: `API error ${res.status}` };
        }
        const payload = await res.json();
        const books: Book[] = payload?.data ?? [];
        return { books, error: payload?.success ? null : (payload?.message ?? null) };
    } catch (e) {
        return { books: [], error: 'Network error' };
    }
};
