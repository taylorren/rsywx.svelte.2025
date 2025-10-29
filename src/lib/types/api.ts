// Base API Response Structure
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	cached?: boolean;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
	pagination?: {
		current_page: number;
		total_pages: number;
		total_results: number;
		per_page: number;
	};
}

// Book Types
export interface Book {
	id: number;
	bookid: string;
	title: string;
	author: string;
	translated: boolean;
	copyrighter?: string | null;
	region: string;
	location: string;
	publisher_name: string;
	place_name: string;
	purchdate: string;
	price: number;
	cover_uri: string;
	total_visits?: number;
	last_visited?: string;
	visit_country?: string | null;
	tags?: string[];
}

// Library Statistics
export interface LibraryStats {
	total_books: number;
	total_pages: number;
	total_kwords: number;
	total_visits: number;
}

// Reading/Review Types
export interface Reading {
	title: string;
	datein: string;
	uri: string;
	feature: string;
	bookid: string;
	book_title: string;
	cover_uri: string;
}

export interface ReadingSummary {
	books_read: number;
	reviews_written: number;
	reading_period: {
		earliest_date: string;
		latest_date: string;
		total_days: number;
	};
}

// API Response Types
export type LibraryStatsResponse = ApiResponse<LibraryStats>;
export type BooksResponse = ApiResponse<Book[]>;
export type ReadingsResponse = ApiResponse<Reading[]>;
export type ReadingReviewsResponse = PaginatedApiResponse<Reading>;
export type ReadingSummaryResponse = ApiResponse<ReadingSummary>;

// Component Props Types
export interface BaseCardProps {
	error?: string;
	fetchedAt: string;
}