<script lang="ts">
	import type { Book } from '$lib/types/api';

	// Server-provided data (SSR)
	const { data } = $props<{ data: { books: Book[]; error: string | null } }>();

	// Use the project's $state helper for consistency with the codebase
	let books: Book[] = $state(data?.books ?? []);
	let loading = $state(false);
	let error = $state(data?.error ?? '');

	async function fetchRandomBooks(refresh = false) {
		loading = true;
		error = '';

		try {
			const url = `/api/v1/books/random/9${refresh ? '?refresh=true' : ''}`;
			const response = await fetch(url);
			const result = await response.json();

			if (result.success) {
				books = result.data;
			} else {
				error = '获取随机书籍失败';
			}
		} catch (err) {
			error = '网络错误，请稍后重试';
			console.error('Error fetching random books:', err);
		} finally {
			loading = false;
		}
	}

	function handleRefresh() {
		fetchRandomBooks(true);
	}
</script>

<svelte:head>
	<title>手气不错 | 任氏有无轩</title>
	<meta name="description" content="随机浏览任氏有无轩的藏书" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">🎲 手气不错</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300 mb-6">随机发现藏书中的精彩内容</p>
		
		<button
			onclick={handleRefresh}
			disabled={loading}
			class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
		>
			<svg 
				class="h-5 w-5 {loading ? 'animate-spin' : ''}" 
				fill="none" 
				viewBox="0 0 24 24" 
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
			{loading ? '刷新中...' : '换一批'}
		</button>
	</div>

	{#if error}
		<div class="mb-8 rounded-lg bg-red-50 border border-red-200 p-4 text-center dark:bg-red-900/20 dark:border-red-800">
			<p class="text-red-600 dark:text-red-400">{error}</p>
			<button
				onclick={handleRefresh}
				class="mt-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline"
			>
				重试
			</button>
		</div>
	{/if}

	{#if loading}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each Array(9) as _}
				<div class="animate-pulse">
					<div class="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-4/3 mb-4"></div>
					<div class="space-y-2">
						<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
						<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else if books.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each books as book}
				<a 
					href="/books/{book.bookid}.html"
					class="group block transform transition-all duration-200 hover:scale-105"
				>
					<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
						<div class="aspect-4/3 overflow-hidden">
							<img
								src="/covers/{book.bookid}.webp"
								alt={book.title}
								class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
								loading="lazy"
							/>
						</div>
						<div class="p-4">
							<h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
								{book.title}
							</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
								{book.author}
							</p>
							<p class="text-xs text-gray-500 dark:text-gray-500">
								{book.publisher_name}
							</p>
							{#if book.total_visits && book.total_visits > 0}
								<div class="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-500">
									<svg class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
									{book.total_visits} 次访问
								</div>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-gray-500 dark:text-gray-400">暂无随机书籍</p>
		</div>
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>