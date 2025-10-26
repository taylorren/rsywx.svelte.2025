<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { formatChineseDate } from '$lib/utils/dateFormatters';

	interface LatestBook {
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
			publisher_name: string;
			place_name: string;
			purchdate: string;
			price: number;
			cover_uri: string;
		}>;
		cached?: boolean;
	}

	interface Props {
		latestBook: LatestBook | null;
		error?: string;
		fetchedAt: string;
	}

	let { latestBook, error, fetchedAt }: Props = $props();

	const book = $derived(latestBook?.data?.[0]);

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
		class="aspect-video w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20"
	>
		{#if book?.bookid && !imageError}
			<img
				src="/covers/{book.bookid}.webp"
				alt={book.title}
				class="h-full w-full object-cover transition-all duration-1800 hover:scale-105 {imageLoaded 
					? 'opacity-100 translate-y-0' 
					: 'opacity-0 -translate-y-4'}"
				onerror={handleImageError}
				onload={handleImageLoad}
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center animate-in fade-in-50 duration-500">
				<svg
					class="h-16 w-16 text-slate-300 dark:text-slate-600"
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
	<CardHeader class="px-6 pt-6 pb-2">
		<CardTitle class="flex items-center gap-2 text-xl">
			<svg
				class="h-6 w-6 text-emerald-600 dark:text-emerald-400"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
				/>
			</svg>
			最新收藏
		</CardTitle>
		
	</CardHeader>
	<CardContent class="space-y-3 px-6 pb-6">
		{#if error}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="mt-1 text-sm">获取失败</p>
			</div>
		{:else if book}
			<div class="space-y-3">
				<div class="text-center">
					<h3 class="truncate text-lg font-bold">
						<a
							href="/books/{book.bookid}.html"
							class="text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
						>
							{book.title}
						</a>
					</h3>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
						【{book.region}】{book.author}
						{#if book.translated && book.copyrighter}
							<br />
							<span class="text-xs">译者：{book.copyrighter}</span>
						{/if}
					</p>
					{#if book.location}
						<div class="mt-2 flex justify-center">
							<span
								class="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
							>
								📍 {book.location}
							</span>
						</div>
					{/if}
				</div>

				<div class="text-center">
					<div class="font-medium text-slate-700 dark:text-slate-300">
						{formatChineseDate(book.purchdate)}
					</div>
					<div class="text-xs text-slate-500 dark:text-slate-500">购买日期</div>
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
