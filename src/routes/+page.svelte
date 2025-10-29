<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import HeroCarousel from '$lib/components/home/HeroCarousel.svelte';
	import LibraryStatsCard from '$lib/components/home/LibraryStatsCard.svelte';
	import LatestBookCard from '$lib/components/home/LatestBookCard.svelte';
	import LastVisitedCard from '$lib/components/home/LastVisitedCard.svelte';
	import RandomBooksCard from '$lib/components/home/RandomBooksCard.svelte';
	import ReadingSummaryCard from '$lib/components/home/ReadingSummaryCard.svelte';
	import LatestReadingCard from '$lib/components/home/LatestReadingCard.svelte';
	import ReadingReviewsCard from '$lib/components/home/ReadingReviewsCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<!-- Main Content -->
<main class="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Carousel -->
	<HeroCarousel />

	<div class="text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">任氏有无轩欢迎您！</h1>
		<p class="mb-8 text-lg text-gray-600 dark:text-gray-300">藏书 | 读书 | 博客 | 维客 | 资源</p>
	</div>

	<!-- 藏书 Section -->
	<div class="mt-16">
		<div class="mb-8 flex items-center justify-center">
			<div class="flex flex-1 items-center justify-end">
				<div class="h-1 w-16 rounded-full bg-linear-to-r from-amber-400 to-amber-600"></div>
				<div class="ml-2 h-0.5 flex-1 bg-linear-to-r from-amber-600 to-transparent"></div>
			</div>
			<div class="mx-8 flex flex-col items-center">
				<h2 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white">藏书</h2>
				<div
					class="h-1 w-20 rounded-full bg-linear-to-r from-amber-400 via-amber-600 to-amber-400"
				></div>
			</div>
			<div class="flex flex-1 items-center justify-start">
				<div class="mr-2 h-0.5 flex-1 bg-linear-to-l from-amber-600 to-transparent"></div>
				<div class="h-1 w-16 rounded-full bg-linear-to-l from-amber-400 to-amber-600"></div>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<LibraryStatsCard
				booksStatus={data.booksStatus}
				error={(data as any).statusError || data.error}
				fetchedAt={data.fetchedAt}
			/>

			<LatestBookCard
				latestBook={(data as any).latestBook}
				error={(data as any).latestError || data.error}
				fetchedAt={data.fetchedAt}
			/>

			<LastVisitedCard
				lastVisitedBook={(data as any).lastVisitedBook}
				error={(data as any).lastVisitedError || data.error}
				fetchedAt={data.fetchedAt}
			/>
		</div>
	</div>

	<!-- Random Books Section -->
	<div class="mt-12">
		<RandomBooksCard
			initialRandomBooks={(data as any).randomBooks}
			error={(data as any).randomError || data.error}
		/>
	</div>

	<!-- 读书 Section -->
	<div class="mt-16">
		<div class="mb-8 flex items-center justify-center">
			<div class="flex flex-1 items-center justify-end">
				<div class="h-1 w-16 rounded-full bg-linear-to-r from-emerald-400 to-emerald-600"></div>
				<div class="ml-2 h-0.5 flex-1 bg-linear-to-r from-emerald-600 to-transparent"></div>
			</div>
			<div class="mx-8 flex flex-col items-center">
				<h2 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white">读书</h2>
				<div
					class="h-1 w-20 rounded-full bg-linear-to-r from-emerald-400 via-emerald-600 to-emerald-400"
				></div>
			</div>
			<div class="flex flex-1 items-center justify-start">
				<div class="mr-2 h-0.5 flex-1 bg-linear-to-l from-emerald-600 to-transparent"></div>
				<div class="h-1 w-16 rounded-full bg-linear-to-l from-emerald-400 to-emerald-600"></div>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			<ReadingSummaryCard
				readingSummary={(data as any).readingSummary}
				error={(data as any).readingSummaryError || data.error}
				fetchedAt={data.fetchedAt}
			/>

			<LatestReadingCard
				latestReading={(data as any).latestReading}
				error={(data as any).latestReadingError || data.error}
				fetchedAt={data.fetchedAt}
			/>

			<ReadingReviewsCard
				readingReviews={(data as any).readingReviews}
				error={(data as any).readingReviewsError || data.error}
				fetchedAt={data.fetchedAt}
			/>
		</div>
	</div>

	<!-- 杂项 Section -->
	<div class="mt-16">
		<div class="mb-8 flex items-center justify-center">
			<div class="flex flex-1 items-center justify-end">
				<div class="h-1 w-16 rounded-full bg-linear-to-r from-blue-400 to-blue-600"></div>
				<div class="ml-2 h-0.5 flex-1 bg-linear-to-r from-blue-600 to-transparent"></div>
			</div>
			<div class="mx-8 flex flex-col items-center">
				<h2 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white">杂项</h2>
				<div
					class="h-1 w-20 rounded-full bg-linear-to-r from-blue-400 via-blue-600 to-blue-400"
				></div>
			</div>
			<div class="flex flex-1 items-center justify-start">
				<div class="mr-2 h-0.5 flex-1 bg-linear-to-l from-blue-600 to-transparent"></div>
				<div class="h-1 w-16 rounded-full bg-linear-to-l from-blue-400 to-blue-600"></div>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
			<!-- Word of the Day Card -->
			<Card class="overflow-hidden p-0">
				<div class="aspect-4/3 w-full overflow-hidden bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
					<div class="flex h-full w-full animate-in items-center justify-center duration-500 fade-in-50">
						<svg class="h-12 w-12 text-blue-300 dark:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
						</svg>
					</div>
				</div>
				<CardHeader class="px-4 pt-4 pb-1">
					<CardTitle class="flex items-center gap-2 text-lg">
						<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
						</svg>
						每日单词
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-2 px-4 pb-4">
					<div class="text-center text-yellow-600 dark:text-yellow-400">
						<span class="text-2xl">📚</span>
						<p class="mt-1 text-sm">敬请期待</p>
					</div>
				</CardContent>
			</Card>

			<!-- Quote of the Day Card -->
			<Card class="overflow-hidden p-0">
				<div class="aspect-4/3 w-full overflow-hidden bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
					<div class="flex h-full w-full animate-in items-center justify-center duration-500 fade-in-50">
						<svg class="h-12 w-12 text-blue-300 dark:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
							<path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3"/>
						</svg>
					</div>
				</div>
				<CardHeader class="px-4 pt-4 pb-1">
					<CardTitle class="flex items-center gap-2 text-lg">
						<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3"/>
						</svg>
						每日名言
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-2 px-4 pb-4">
					<div class="text-center text-yellow-600 dark:text-yellow-400">
						<span class="text-2xl">💭</span>
						<p class="mt-1 text-sm">敬请期待</p>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</main>
