<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { formatChineseDate } from '$lib/utils/dateFormatters';

	interface ReadingSummary {
		success: boolean;
		data?: {
			books_read: number;
			reviews_written: number;
			reading_period: {
				earliest_date: string;
				latest_date: string;
				total_days: number;
			};
		};
		cached?: boolean;
	}

	interface Props {
		readingSummary: ReadingSummary | null;
		error?: string;
		fetchedAt: string;
	}

	let { readingSummary, error, fetchedAt }: Props = $props();

	let imageError = $state(false);
	let imageLoaded = $state(false);

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}
</script>

<Card class="overflow-hidden p-0">
	<a href="/readings/summary" class="block">
		<div class="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20">
			{#if !imageError}
				<img
					src="/images/reading.webp"
					alt="Reading Summary"
					class="h-full w-full object-cover transition-all duration-700 hover:scale-105 {imageLoaded
						? 'translate-y-0 opacity-100'
						: '-translate-y-4 opacity-0'}"
					onerror={handleImageError}
					onload={handleImageLoad}
				/>
			{:else}
				<div class="flex h-full w-full animate-in items-center justify-center duration-500 fade-in-50">
					<svg class="h-12 w-12 text-slate-300 dark:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
						<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
					</svg>
				</div>
			{/if}
		</div>
		<CardHeader class="px-4 pt-4 pb-1">
			<CardTitle class="flex items-center gap-2 text-lg">
				<svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
					<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
				</svg>
				读书总结
			</CardTitle>
		</CardHeader>
		<CardContent class="space-y-2 px-4 pb-4">
			{#if error}
				<div class="text-center text-red-600 dark:text-red-400">
					<span class="text-2xl">❌</span>
					<p class="mt-1 text-sm">获取失败</p>
				</div>
			{:else if readingSummary?.success && readingSummary?.data}
				<div class="space-y-2">
					<div class="grid grid-cols-2 gap-1 text-center">
						<div>
							<div class="text-base font-bold text-emerald-600 dark:text-emerald-400">
								{readingSummary.data.books_read}
							</div>
							<div class="text-xs text-slate-500 dark:text-slate-500">已读</div>
						</div>
						<div>
							<div class="text-base font-bold text-emerald-600 dark:text-emerald-400">
								{readingSummary.data.reviews_written}
							</div>
							<div class="text-xs text-slate-500 dark:text-slate-500">书评</div>
						</div>
					</div>
					
					<div class="text-center">
						<div class="text-sm font-medium text-slate-700 dark:text-slate-300">
							{Math.floor(readingSummary.data.reading_period.total_days / 365)}年阅读历程
						</div>
						<div class="text-xs text-slate-500 dark:text-slate-500">
							{formatChineseDate(readingSummary.data.reading_period.earliest_date)} 至今
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
	</a>
</Card>