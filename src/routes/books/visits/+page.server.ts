import type { Book } from '$lib/types/api';

export const load = async (event: any) => {
    const { fetch } = event;

    // default days used by the UI
    const defaultDays = 30;

    try {
        // Fetch visit history (chart & stats)
        const visitRes = await fetch(`/api/v1/books/visit_history?days=${defaultDays}`);
        const visitPayload = visitRes.ok ? await visitRes.json().catch(() => ({})) : {};
        const visitHistory = visitPayload.success ? (visitPayload.data || []) : [];
        const periodInfo = visitPayload.period_info || null;

        // Fetch all tab lists in parallel
        const [popularRes, unpopularRes, lastVisitedRes, forgottenRes] = await Promise.all([
            fetch('/api/v1/books/popular/20'),
            fetch('/api/v1/books/unpopular/20'),
            fetch('/api/v1/books/last_visited/20'),
            fetch('/api/v1/books/forgotten/20')
        ]);

        const [popularPayload, unpopularPayload, lastVisitedPayload, forgottenPayload] = await Promise.all([
            popularRes.ok ? popularRes.json().catch(() => ({})) : {},
            unpopularRes.ok ? unpopularRes.json().catch(() => ({})) : {},
            lastVisitedRes.ok ? lastVisitedRes.json().catch(() => ({})) : {},
            forgottenRes.ok ? forgottenRes.json().catch(() => ({})) : {}
        ]);

        const popularBooks: Book[] = popularPayload.success ? (popularPayload.data || []) : [];
        const unpopularBooks: Book[] = unpopularPayload.success ? (unpopularPayload.data || []) : [];
        const lastVisitedBooks: Book[] = lastVisitedPayload.success ? (lastVisitedPayload.data || []) : [];
        const forgottenBooks: Book[] = forgottenPayload.success ? (forgottenPayload.data || []) : [];

        return {
            visitHistory,
            periodInfo,
            popularBooks,
            unpopularBooks,
            lastVisitedBooks,
            forgottenBooks,
            error: null
        };
    } catch (err) {
        console.error('Error in visits page server load:', err);
        return {
            visitHistory: [],
            periodInfo: null,
            popularBooks: [],
            unpopularBooks: [],
            lastVisitedBooks: [],
            forgottenBooks: [],
            error: 'Failed to load data'
        };
    }
};
