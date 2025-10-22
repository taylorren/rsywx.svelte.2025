<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<!-- Main Content -->
<main class="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
	<div class="text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Welcome to SvelteKit</h1>
		<p class="mb-8 text-lg text-gray-600 dark:text-gray-300">
			Build fast, modern web applications with the power of Svelte and SvelteKit
		</p>
		<div class="space-y-4">
			<p class="text-gray-700 dark:text-gray-300">
				Visit <a
					href="https://svelte.dev/docs/kit"
					class="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">svelte.dev/docs/kit</a
				> to read the documentation
			</p>
			<div class="flex justify-center space-x-4">
				<button
					class="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					Get Started
				</button>
				<button
					class="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
				>
					Learn More
				</button>
			</div>
		</div>
	</div>

	<!-- SSR Demo Section -->
	<div class="mt-12">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">🚀 Server-Side Rendering Demo</h2>
		<div class="mx-auto max-w-2xl">
			<Card class="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						📚 Books API Status
						<span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
							SSR
						</span>
					</CardTitle>
					<CardDescription>
						Data fetched server-side at build time using SvelteKit's load function
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					{#if data.error}
						<div class="rounded-md bg-red-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<span class="text-red-400">❌</span>
								</div>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-red-800">Error fetching data</h3>
									<p class="mt-1 text-sm text-red-700">{data.error}</p>
								</div>
							</div>
						</div>
					{:else if data.booksStatus}
						<div class="rounded-md bg-green-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<span class="text-green-400">✅</span>
								</div>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-green-800">API Response Received</h3>
									<div class="mt-2">
										<pre
											class="overflow-x-auto rounded border bg-white p-2 text-xs text-green-700">{JSON.stringify(
												data.booksStatus,
												null,
												2
											)}</pre>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<div class="rounded-md bg-yellow-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<span class="text-yellow-400">⚠️</span>
								</div>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-yellow-800">No data available</h3>
									<p class="mt-1 text-sm text-yellow-700">The API returned no data</p>
								</div>
							</div>
						</div>
					{/if}

					<div class="border-t pt-4">
						<p class="text-xs text-gray-500">
							<strong>Fetched at:</strong>
							{new Date(data.fetchedAt).toLocaleString()}
						</p>
						<p class="mt-1 text-xs text-gray-500">
							<strong>SSR Benefits:</strong> Data is pre-rendered on the server, improving SEO and initial
							page load performance
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
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
