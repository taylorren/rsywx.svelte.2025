<script lang="ts">
	import {
		Card,
		CardContent,
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
	import WordOfTheDayCard from '$lib/components/home/WordOfTheDayCard.svelte';
	import QuoteOfTheDayCard from '$lib/components/home/QuoteOfTheDayCard.svelte';
	import WordPressBlogCard from '$lib/components/home/WordPressBlogCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';
	import type { WordOfTheDayResponse, QuoteOfTheDayResponse } from '$lib/types/api';

	let { data }: { data: PageData } = $props();

	// WOTD state management
	let wotdData = $state<WordOfTheDayResponse | null>((data as any).wotd);
	let isRefreshingWotd = $state(false);

	async function refreshWotd() {
		if (isRefreshingWotd) return;
		
		isRefreshingWotd = true;
		try {
			const response = await fetch('/api/wotd');
			if (response.ok) {
				wotdData = await response.json();
			} else {
				console.error('Failed to refresh WOTD');
			}
		} catch (error) {
			console.error('Error refreshing WOTD:', error);
		} finally {
			isRefreshingWotd = false;
		}
	}

	// QOTD state management
	let qotdData = $state<QuoteOfTheDayResponse | null>((data as any).qotd);
	let isRefreshingQotd = $state(false);

	async function refreshQotd() {
		if (isRefreshingQotd) return;
		
		isRefreshingQotd = true;
		try {
			const response = await fetch('/api/qotd');
			if (response.ok) {
				qotdData = await response.json();
			} else {
				console.error('Failed to refresh QOTD');
			}
		} catch (error) {
			console.error('Error refreshing QOTD:', error);
		} finally {
			isRefreshingQotd = false;
		}
	}
</script>

<SEO 
	title="首页"
	description="任氏有无轩 - 个人数字图书馆，收录丰富的藏书资源、读书笔记、博客文章和学习资料。探索知识的海洋，分享阅读的乐趣。"
	keywords="任氏有无轩,个人图书馆,数字图书馆,藏书,读书笔记,博客,学习资料,知识分享,阅读"
	type="website"
/>

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

	<!-- 博客 Section -->
	<div class="mt-16">
		<div class="mb-8 flex items-center justify-center">
			<div class="flex flex-1 items-center justify-end">
				<div class="h-1 w-16 rounded-full bg-linear-to-r from-purple-400 to-purple-600"></div>
				<div class="ml-2 h-0.5 flex-1 bg-linear-to-r from-purple-600 to-transparent"></div>
			</div>
			<div class="mx-8 flex flex-col items-center">
				<h2 class="mb-2 text-4xl font-bold text-gray-900 dark:text-white">博客</h2>
				<div
					class="h-1 w-20 rounded-full bg-linear-to-r from-purple-400 via-purple-600 to-purple-400"
				></div>
			</div>
			<div class="flex flex-1 items-center justify-start">
				<div class="mr-2 h-0.5 flex-1 bg-linear-to-l from-purple-600 to-transparent"></div>
				<div class="h-1 w-16 rounded-full bg-linear-to-l from-purple-400 to-purple-600"></div>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
			<WordPressBlogCard
				initialPosts={(data as any).wpPosts}
				error={(data as any).wpPostsError || data.error}
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
			<WordOfTheDayCard
				wotd={wotdData}
				error={(data as any).wotdError || data.error}
				fetchedAt={data.fetchedAt}
				onRefresh={refreshWotd}
				isRefreshing={isRefreshingWotd}
			/>

			<!-- Quote of the Day Card -->
			<QuoteOfTheDayCard
				qotd={qotdData}
				error={(data as any).qotdError || data.error}
				fetchedAt={data.fetchedAt}
				onRefresh={refreshQotd}
				isRefreshing={isRefreshingQotd}
			/>
		</div>
	</div>
</main>
