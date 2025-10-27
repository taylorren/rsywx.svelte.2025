<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { formatChineseDate, formatRelativeTime } from '$lib/utils/dateFormatters';

	interface LastVisitedBook {
		success: boolean;
		data?: Array<{
			id: number;
			bookid: string;
			title: string;
			author: string;
			translated: boolean;
			copyrighter?: string;
			region: string;
			location: string;
			cover_uri: string;
			last_visited: string;
			visit_country?: string;
			total_visits: number;
		}>;
		cached?: boolean;
	}

	interface Props {
		lastVisitedBook: LastVisitedBook | null;
		error?: string;
		fetchedAt: string;
	}

	let { lastVisitedBook, error, fetchedAt }: Props = $props();

	const book = $derived(lastVisitedBook?.data?.[0]);

	let imageError = $state(false);
	let imageLoaded = $state(false);

	// Reset image states when book changes
	$effect(() => {
		if (book) {
			imageError = false;
			imageLoaded = false;
		}
	});

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}


</script>

<Card class="overflow-hidden p-0">
	<div
		class="aspect-4/3 w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20"
	>
		{#if book?.bookid && !imageError}
			<img
				src="/covers/{book.bookid}.webp"
				alt={book.title}
				class="h-full w-full object-cover transition-all duration-700 hover:scale-105 {imageLoaded
					? 'translate-y-0 opacity-100'
					: '-translate-y-4 opacity-0'}"
				onerror={handleImageError}
				onload={handleImageLoad}
			/>
		{:else}
			<div
				class="flex h-full w-full animate-in items-center justify-center duration-500 fade-in-50"
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
	<CardHeader class="px-4 pt-4 pb-1">
		<CardTitle class="flex items-center gap-2 text-lg">
			<svg
				class="h-5 w-5 text-purple-600 dark:text-purple-400"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
				/>
			</svg>
			最近访问
		</CardTitle>
	</CardHeader>
	<CardContent class="space-y-2 px-4 pb-4">
		{#if error}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="mt-1 text-sm">获取失败</p>
			</div>
		{:else if book}
			<div class="space-y-2">
				<div class="text-center">
					<h3 class="truncate text-base font-bold">
						<a
							href="/books/{book.bookid}.html"
							class="text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
						>
							{book.title}
						</a>
					</h3>
					<p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
						【{book.region}】{book.author}
						{#if book.translated && book.copyrighter}
							<br />
							<span class="text-xs">译者：{book.copyrighter}</span>
						{/if}
					</p>
					{#if book.location}
						<div class="mt-1 flex justify-center">
							<span
								class="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
							>
								📍 {book.location}
							</span>
						</div>
					{/if}
				</div>

				<div class="grid grid-cols-2 gap-1 text-center text-sm">
					<div>
						<div class="text-sm font-medium text-slate-700 dark:text-slate-300">
							{formatRelativeTime(book.last_visited)}
						</div>
						<div class="text-xs text-slate-500 dark:text-slate-500">访问时间</div>
					</div>
					<div>
						<div class="text-sm font-medium text-slate-700 dark:text-slate-300">
							{book.total_visits}次
						</div>
						<div class="text-xs text-slate-500 dark:text-slate-500">总访问</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">⚠️</span>
				<p class="mt-1 text-sm">暂无数据</p>
			</div>
		{/if}
	</CardContent>
</Card>
