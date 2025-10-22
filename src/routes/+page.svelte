<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import HeroCarousel from '$lib/components/HeroCarousel.svelte';
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
		<!-- Card with Image -->
		<Card class="overflow-hidden">
			<div class="aspect-video w-full overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=center"
					alt="Fast Development"
					class="h-full w-full object-cover transition-transform hover:scale-105"
				/>
			</div>
			<CardHeader>
				<CardTitle>⚡ Fast Development</CardTitle>
				<CardDescription>
					Hot module replacement and instant updates for lightning-fast development experience
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-600">
					SvelteKit provides an exceptional developer experience with instant feedback and minimal
					configuration.
				</p>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>🎯 Type Safety</CardTitle>
				<CardDescription>
					Full TypeScript support with excellent type inference and compile-time error checking
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-gray-600">
					Catch errors early and build more reliable applications with comprehensive TypeScript
					integration.
				</p>
			</CardContent>
		</Card>

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
