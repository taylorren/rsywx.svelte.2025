<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { formatChineseDate } from '$lib/utils/dateFormatters';

	interface LatestReading {
		success: boolean;
		data?: Array<{
			title: string;
			datein: string;
			uri: string;
			feature: string;
			bookid: string;
			book_title: string;
			cover_uri: string;
		}>;
		cached?: boolean;
	}

	interface Props {
		latestReading: LatestReading | null;
		error?: string;
		fetchedAt: string;
	}

	let { latestReading, error, fetchedAt }: Props = $props();

	let imageError = $state(false);
	let imageLoaded = $state(false);

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}

	const reading = $derived(latestReading?.data?.[0]);
</script>

<Card class="overflow-hidden p-0">
	<div
		class="aspect-4/3 w-full overflow-hidden bg-linear-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20"
	>
		<a href={reading?.uri || '/readings/latest'} class="block h-full">
			{#if reading?.feature && !imageError}
				<img
					src={reading.feature}
					alt="Latest Reading"
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
						class="h-12 w-12 text-emerald-300 dark:text-emerald-600"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
						/>
					</svg>
				</div>
			{/if}
		</a>
	</div>
	<CardHeader class="px-4 pt-4 pb-1">
		<CardTitle class="flex items-center gap-2 text-lg">
			<svg
				class="h-5 w-5 text-emerald-600 dark:text-emerald-400"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
				/>
			</svg>
			最新书评
		</CardTitle>
	</CardHeader>
	<CardContent class="space-y-2 px-4 pb-4">
		{#if error}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="mt-1 text-sm">获取失败</p>
			</div>
		{:else if reading}
			<div class="space-y-2">
				<div class="text-center">
					<a
						href={reading.uri}
						class="block transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
					>
						<h3 class="line-clamp-2 font-semibold text-slate-800 dark:text-slate-200">
							{reading.title}
						</h3>
					</a>
					{#if reading.book_title && reading.bookid}
						<a
							href="/books/{reading.bookid}"
							class="block text-sm text-slate-600 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
						>
							<p class="mt-3 mb-3">评论的书籍</p>
							<div class="line-clamp-1">《{reading.book_title}》</div>
						</a>
					{/if}
				</div>

				<div class="text-center">
					<div class="text-xs text-slate-500 dark:text-slate-500">
						书评时间：
						{formatChineseDate(reading.datein)}
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">📚</span>
				<p class="mt-1 text-sm">暂无阅读记录</p>
			</div>
		{/if}
	</CardContent>
</Card>
