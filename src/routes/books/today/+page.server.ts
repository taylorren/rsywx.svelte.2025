import type { Book } from '$lib/types/api';

export const load = async (event: any) => {
    const { fetch } = event;
    try {
        const res = await fetch('/api/v1/books/today');
        if (!res.ok) {
            return { books: [], dateInfo: null, error: `API error ${res.status}` };
        }
        const payload = await res.json();
        const books: Book[] = payload?.data ?? [];
        const dateInfo = payload?.date_info ?? null;
        return { books, dateInfo, error: payload?.success ? null : (payload?.message ?? null) };
    } catch (e) {
        return { books: [], dateInfo: null, error: 'Network error' };
    }
};
