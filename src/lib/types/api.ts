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
	// 详细信息字段
	intro?: string;
	pubdate?: string;
	printdate?: string;
	isbn?: string;
	page?: number;
	kword?: number;
	deco?: string;
	ver?: number;
	instock?: boolean;
	category?: string;
	// 书评相关
	reviews?: BookReview[];
}

export interface BookReview {
	id: number;
	title: string;
	content?: string;
	rating?: number;
	author?: string;
	date: string;
	datein: string;
	source?: string;
	uri: string;
	feature: string;
	bookid: string;
	book_title: string;
	cover_uri: string;
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

// Word of the Day Types
export interface WordOfTheDay {
	id: number;
	word: string;
	meaning: string;
	sentence: string;
	type: string;
}

// Quote of the Day Types
export interface QuoteOfTheDay {
	id: number;
	quote: string;
	source: string;
}

// Component Props Types
export interface BaseCardProps {
	error?: string;
	fetchedAt: string;
}

// Additional API Response Types
export type WordOfTheDayResponse = ApiResponse<WordOfTheDay>;
export type QuoteOfTheDayResponse = ApiResponse<QuoteOfTheDay>;