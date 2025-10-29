<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { QuoteOfTheDayResponse, BaseCardProps } from '$lib/types/api';

	interface Props extends BaseCardProps {
		qotd: QuoteOfTheDayResponse | null;
		onRefresh?: () => void;
		isRefreshing?: boolean;
	}

	let { qotd, error, fetchedAt, onRefresh, isRefreshing = false }: Props = $props();

	const quoteData = $derived(qotd?.data);

	function handleRefresh() {
		if (onRefresh && !isRefreshing) {
			onRefresh();
		}
	}
</script>

<Card class="overflow-hidden p-0">
	<!-- Image Area -->
	<div
		class="aspect-4/3 w-full overflow-hidden bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
	>
		<img
			src="/images/qotd.webp"
			alt="Quote of the Day"
			class="h-full w-full object-cover transition-all duration-1800 hover:scale-105"
		/>
	</div>

	<!-- Title Header -->
	<CardHeader class="px-4 pt-4 pb-1">
		<CardTitle class="flex items-center justify-between text-lg">
			<div class="flex items-center gap-2">
				<svg
					class="h-5 w-5 text-blue-600 dark:text-blue-400"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3" />
				</svg>
				每日名言
			</div>
			<Button
				variant="ghost"
				size="sm"
				onclick={handleRefresh}
				disabled={isRefreshing}
				class="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
			>
				<svg
					class="h-4 w-4 text-blue-600 dark:text-blue-400 {isRefreshing ? 'animate-spin' : ''}"
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
			</Button>
		</CardTitle>
	</CardHeader>

	<CardContent class="space-y-2 px-4 pb-4">
		{#if error}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="mt-1 text-sm">获取失败</p>
			</div>
		{:else if quoteData}
			<div class="space-y-3">
				<!-- Quote -->
				<div class="text-center">
					<div
						class="rounded-lg bg-blue-50 p-3 text-base leading-relaxed text-gray-700 italic dark:bg-blue-900/20 dark:text-gray-300"
					>
						"{quoteData.quote}"
					</div>
				</div>

				<!-- Source -->
				<div class="border-t border-gray-200 pt-2 text-center dark:border-gray-700">
					<div class="text-sm font-medium text-blue-600 dark:text-blue-400">
						— {quoteData.source}
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">💭</span>
				<p class="mt-1 text-sm">点击刷新获取名言</p>
			</div>
		{/if}
	</CardContent>
</Card>
