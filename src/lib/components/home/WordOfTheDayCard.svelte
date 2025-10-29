<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { WordOfTheDayResponse, BaseCardProps } from '$lib/types/api';

	interface Props extends BaseCardProps {
		wotd: WordOfTheDayResponse | null;
		onRefresh?: () => void;
		isRefreshing?: boolean;
	}

	let { wotd, error, fetchedAt, onRefresh, isRefreshing = false }: Props = $props();

	const wordData = $derived(wotd?.data);

	function handleRefresh() {
		if (onRefresh && !isRefreshing) {
			onRefresh();
		}
	}
</script>

<Card class="overflow-hidden p-0">
	<!-- Image Area -->
	<div
		class="aspect-4/3 w-full overflow-hidden bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
	>
		<img
			src="/images/wotd.webp"
			alt="Word of the Day"
			class="h-full w-full object-cover transition-all duration-1800 hover:scale-105"
		/>
	</div>

	<!-- Title Header -->
	<CardHeader class="px-4 pt-4 pb-1">
		<CardTitle class="flex items-center justify-between text-lg">
			<div class="flex items-center gap-2">
				<svg
					class="h-5 w-5 text-purple-600 dark:text-purple-400"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
					/>
				</svg>
				每日单词
			</div>
			<Button
				variant="ghost"
				size="sm"
				onclick={handleRefresh}
				disabled={isRefreshing}
				class="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/30"
			>
				<svg
					class="h-4 w-4 text-purple-600 dark:text-purple-400 {isRefreshing ? 'animate-spin' : ''}"
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
		{:else if wordData}
			<div class="space-y-2">
				<!-- Word and Type -->
				<div class="text-center">
					<h3 class="text-xl font-bold text-purple-600 dark:text-purple-400">
						{wordData.word}
					</h3>
					<p class="text-xs tracking-wide text-purple-500 uppercase dark:text-purple-300">
						{wordData.type}
					</p>
				</div>

				<!-- Definition -->
				<div class="text-center">
					<div class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
						{wordData.meaning}
					</div>
				</div>

				<!-- Example Sentence -->
				<div class="border-t border-gray-200 pt-2 dark:border-gray-700">
					<div class="mb-1 text-xs text-gray-500 dark:text-gray-400">例句：</div>
					<div class="text-sm leading-relaxed text-gray-600 italic dark:text-gray-400">
						"{wordData.sentence}"
					</div>
				</div>
			</div>
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">📚</span>
				<p class="mt-1 text-sm">点击刷新获取单词</p>
			</div>
		{/if}
	</CardContent>
</Card>
