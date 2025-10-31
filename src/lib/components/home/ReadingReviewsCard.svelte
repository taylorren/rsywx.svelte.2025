<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { formatChineseDate } from '$lib/utils/dateFormatters';
	import type { ReadingReviewsResponse, BaseCardProps } from '$lib/types/api';

	interface Props extends BaseCardProps {
		readingReviews: ReadingReviewsResponse | null;
	}

	let { readingReviews, error, fetchedAt }: Props = $props();

	const reviews = $derived(readingReviews?.data?.slice(1, 3) || []); // Skip first (latest) review, show next 2
</script>

<Card class="overflow-hidden p-0">
	<a href="/readings" class="block">
		<div
			class="aspect-4/3 w-full overflow-hidden bg-linear-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20"
		>
			{#if reviews.length > 0 && reviews[0].feature}
				<img
					src={reviews[0].feature}
					alt="Recent Reviews"
					class="h-full w-full object-cover transition-all duration-700 hover:scale-105"
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
							d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
						/>
					</svg>
				</div>
			{/if}
		</div>
	</a>
	<CardHeader class="px-4 pt-4 pb-1">
		<CardTitle class="flex items-center gap-2 text-lg">
			<svg
				class="h-5 w-5 text-purple-600 dark:text-purple-400"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
				/>
			</svg>
			其他近期书评
		</CardTitle>
	</CardHeader>
	<CardContent class="space-y-2 px-4 pb-4">
		{#if error}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="mt-1 text-sm">获取失败</p>
			</div>
		{:else if reviews.length > 0}
			<div class="space-y-2">
				{#each reviews as review}
					<div class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
						<a href={review.uri} class="h-12 w-12 shrink-0 overflow-hidden rounded bg-emerald-50 dark:bg-emerald-900/20">
							{#if review.feature}
								<img src={review.feature} alt={review.title} class="h-full w-full object-cover" />
							{:else}
								<div class="flex h-full w-full items-center justify-center">
									<svg
										class="h-4 w-4 text-emerald-300 dark:text-emerald-600"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
										/>
									</svg>
								</div>
							{/if}
						</a>
						<div class="min-w-0 flex-1">
							<a 
								href={review.uri} 
								class="block hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
							>
								<h4 class="line-clamp-1 text-sm font-medium text-slate-800 dark:text-slate-200">
									{review.title}
								</h4>
							</a>
							{#if review.book_title && review.bookid}
								<a 
									href="/books/{review.bookid}" 
									class="block text-xs text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
								>
									<div class="line-clamp-1">《{review.book_title}》</div>
								</a>
							{/if}
							<p class="text-xs text-slate-400 dark:text-slate-600">
								{formatChineseDate(review.datein)}
							</p>
						</div>
					</div>
				{/each}
			</div>

			{#if readingReviews?.pagination && readingReviews.pagination.total_results > 2}
				<div class="pt-2 text-center">
					<a
						href="/readings"
						class="inline-flex h-7 items-center rounded-md border border-emerald-200 px-3 text-xs text-emerald-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-300"
					>
						查看全部 {readingReviews.pagination.total_results} 篇书评 →
					</a>
				</div>
			{/if}
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">📝</span>
				<p class="mt-1 text-sm">暂无书评</p>
			</div>
		{/if}
	</CardContent>
</Card>
