<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { formatRelativeTime } from '$lib/utils/dateFormatters';

	interface RandomBook {
		id: number;
		bookid: string;
		title: string;
		author: string;
		translated: boolean;
		copyrighter?: string;
		region: string;
		location: string;
		publisher_name: string;
		place_name: string;
		cover_uri: string;
		total_visits: number;
		last_visited: string;
	}

	interface RandomBooksResponse {
		success: boolean;
		data?: RandomBook[];
		cached?: boolean;
	}

	interface Props {
		initialRandomBooks?: RandomBooksResponse | null;
		error?: string;
	}

	let { initialRandomBooks, error }: Props = $props();

	let randomBooks = $state<RandomBooksResponse | null>(initialRandomBooks || null);
	let loading = $state(false);
	let currentError = $state(error || '');

	// Image loading states for each book
	let imageStates = $state<Record<string, { error: boolean; loaded: boolean }>>({});

	// Initialize image states when books change
	$effect(() => {
		if (randomBooks?.data) {
			const newStates: Record<string, { error: boolean; loaded: boolean }> = {};
			randomBooks.data.forEach((book) => {
				newStates[book.bookid] = { error: false, loaded: false };
			});
			imageStates = newStates;
		}
	});

	function handleImageError(bookid: string) {
		imageStates[bookid] = { ...imageStates[bookid], error: true };
	}

	function handleImageLoad(bookid: string) {
		imageStates[bookid] = { ...imageStates[bookid], loaded: true };
	}



	async function refreshRandomBooks() {
		loading = true;
		currentError = '';

		try {
			const response = await fetch('/api/random-books?refresh=true');
			if (response.ok) {
				randomBooks = await response.json();
			} else {
				currentError = `HTTP error! status: ${response.status}`;
				console.error('Failed to fetch random books:', response.status);
			}
		} catch (err) {
			currentError = err instanceof Error ? err.message : 'Unknown error occurred';
			console.error('Failed to fetch random books:', err);
		} finally {
			loading = false;
		}
	}
</script>

<Card class="col-span-full overflow-hidden p-0">
	<CardHeader class="px-6 pt-6 pb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<svg
					class="h-6 w-6 text-orange-600 dark:text-orange-400"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
					/>
					<path
						d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"
					/>
				</svg>
				<CardTitle class="text-xl">手气不错</CardTitle>
			</div>
			<Button
				variant="outline"
				size="sm"
				onclick={refreshRandomBooks}
				disabled={loading}
				class="flex items-center gap-2"
			>
				<svg
					class="h-4 w-4 {loading ? 'animate-spin' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				{loading ? '刷新中...' : '换一批'}
			</Button>
		</div>
	</CardHeader>
	<CardContent class="px-6 pb-6">
		{#if currentError}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="mt-1 text-sm">获取失败: {currentError}</p>
			</div>
		{:else if randomBooks?.success && randomBooks?.data}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each randomBooks.data as book (book.bookid)}
					<div
						class="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
					>
						<!-- Book Cover -->
						<div
							class="aspect-video w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20"
						>
							{#if !imageStates[book.bookid]?.error}
								<img
									src="/covers/{book.bookid}.jpg"
									alt={book.title}
									class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 {imageStates[
										book.bookid
									]?.loaded
										? 'translate-y-0 opacity-100'
										: '-translate-y-2 opacity-0'}"
									onerror={() => handleImageError(book.bookid)}
									onload={() => handleImageLoad(book.bookid)}
								/>
							{:else}
								<div
									class="flex h-full w-full animate-in items-center justify-center duration-300 fade-in-50"
								>
									<svg
										class="h-12 w-12 text-slate-300 dark:text-slate-600"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
										/>
									</svg>
								</div>
							{/if}
						</div>

						<!-- Book Info -->
						<div class="space-y-2 p-3">
							<h3 class="line-clamp-2 text-sm leading-tight font-semibold">
								<a
									href="/books/{book.bookid}.html"
									class="text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
								>
									{book.title}
								</a>
							</h3>
							<p class="line-clamp-1 text-xs text-gray-600 dark:text-gray-400">
								【{book.region}】{book.author}{#if book.translated && book.copyrighter}
									/ 译者：{book.copyrighter}{/if}
							</p>
							{#if book.location}
								<div class="mt-2">
									<span
										class="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
									>
										📍 {book.location}
									</span>
								</div>
							{/if}
							<div class="flex justify-between text-xs text-slate-500 dark:text-slate-500">
								<span>{book.total_visits.toLocaleString()}次访问</span>
								<span>{formatRelativeTime(book.last_visited)}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">⚠️</span>
				<p class="mt-1 text-sm">暂无数据</p>
			</div>
		{/if}
	</CardContent>
</Card>

<style>
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
