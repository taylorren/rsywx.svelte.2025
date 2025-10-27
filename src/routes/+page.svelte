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

			<!-- Card with Image -->
			<Card class="overflow-hidden">
				<div class="aspect-video w-full overflow-hidden">
					<img
						src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center"
						alt="Performance Analytics"
						class="h-full w-full object-cover transition-transform hover:scale-105"
					/>
				</div>
				<CardHeader>
					<CardTitle>🚀 Performance</CardTitle>
					<CardDescription>
						Optimized builds with automatic code splitting and minimal runtime overhead
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-gray-600">
						Ship fast, lightweight applications that provide excellent user experiences across all
						devices.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>🎨 Modern UI</CardTitle>
					<CardDescription>
						Beautiful components with Tailwind CSS and shadcn-svelte integration
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-gray-600">
						Build stunning interfaces with pre-built components and utility-first CSS framework.
					</p>
				</CardContent>
			</Card>

			<!-- Card with Image -->
			<Card class="overflow-hidden">
				<div class="aspect-video w-full overflow-hidden">
					<img
						src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&crop=center"
						alt="Flexible Deployment"
						class="h-full w-full object-cover transition-transform hover:scale-105"
					/>
				</div>
				<CardHeader>
					<CardTitle>🔧 Flexible</CardTitle>
					<CardDescription>
						Deploy anywhere with multiple adapter options for different hosting platforms
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-sm text-gray-600">
						From static sites to serverless functions, deploy your app to any platform with ease.
					</p>
				</CardContent>
			</Card>
		</div>
	</div>
</main>
