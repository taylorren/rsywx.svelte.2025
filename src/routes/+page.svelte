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
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<!-- Main Content -->
<main class="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Carousel -->
	<HeroCarousel />

	<div class="text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">任氏有无轩欢迎您！</h1>
		<p class="mb-8 text-lg text-gray-600 dark:text-gray-300">
			藏书 | 读书 | 博客 | 维客 | 资源
		</p>
		
	</div>

	<!-- Feature Cards -->
	<div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

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

		<!-- Random Books Card - Full Width -->
		<RandomBooksCard 
			initialRandomBooks={(data as any).randomBooks} 
			error={(data as any).randomError || data.error} 
		/>

		<!-- Card with Image -->
		<Card class="overflow-hidden">
			<div class="aspect-video w-full overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=center"
					alt="Zero Configuration"
					class="h-full w-full object-cover transition-transform hover:scale-105"
				/>
			</div>
			<CardHeader>
				<CardTitle>📦 Zero Config</CardTitle>
				<CardDescription>
					Start building immediately with sensible defaults and minimal setup required
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-600">
					Focus on your application logic instead of configuration. Everything works out of the box.
				</p>
			</CardContent>
		</Card>

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
</main>
