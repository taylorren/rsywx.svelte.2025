<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	// Access data reactively using Svelte 5 runes
	const reviews = $derived(data.reviews);
	const pagination = $derived(data.pagination);
	const loading = $derived(data.loading || false);
	const error = $derived(data.error || null);

	function getPageUrl(newPage: number) {
		return newPage === 1 ? `/readings` : `/readings/${newPage}`;
	}

	function formatDate(dateString: string) {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function truncateContent(content: string, maxLength = 200) {
		if (!content) return '';
		if (content.length <= maxLength) return content;
		return content.substring(0, maxLength) + '...';
	}
</script>

<SEO 
	title={`读书笔记${pagination.current_page > 1 ? ` - 第${pagination.current_page}页` : ''}`}
	description={`任氏有无轩读书笔记分享，阅读心得与书评。共收录 ${pagination.total_results || 0} 篇读书笔记，分享阅读感悟和思考。`}
	keywords="读书笔记,书评,阅读心得,读后感,文学评论,阅读分享"
	type="website"
/>

{#if pagination.current_page > 1}
	<SEO canonical={`/readings/${pagination.current_page}`} />
{/if}

<div class="container mx-auto px-4 py-8 max-w-6xl">
	<div class="text-center mb-8">
		<h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
			读书笔记
		</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300">
			阅读心得与书评分享
		</p>
	</div>

	{#if loading}
		<div class="flex justify-center items-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			<span class="ml-3 text-gray-600 dark:text-gray-300">加载中...</span>
		</div>
	{:else if error}
		<div class="text-center py-12">
			<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
				<p class="text-red-600 dark:text-red-400">{error}</p>
			</div>
		</div>
	{:else if reviews.length === 0}
		<div class="text-center py-12">
			<div class="text-gray-500 dark:text-gray-400">
				<svg class="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg>
				<p class="text-xl">暂无读书笔记</p>
			</div>
		</div>
	{:else}
		<!-- Page Info -->
		{#if pagination.total_pages > 1}
			<div class="mb-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
				<div class="flex items-center space-x-3">
					<div class="flex items-center space-x-2">
						<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
						</svg>
						<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
							共 <span class="font-semibold text-blue-600 dark:text-blue-400">{pagination.total_results}</span> 篇读书笔记
						</span>
					</div>
					<div class="flex items-center space-x-2">
						<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"/>
						</svg>
						<span class="text-sm text-gray-600 dark:text-gray-400">
							第 <span class="font-semibold">{pagination.current_page}</span> / <span class="font-semibold">{pagination.total_pages}</span> 页
						</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- Reviews Grid -->
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each reviews as review}
				<article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
					<div class="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
						<img 
							src={review.feature || `/covers/${review.bookid}.jpg`} 
							alt={review.title || review.book_title || '封面图片'}
							class="w-full h-48 object-cover"
							loading="lazy"
						/>
					</div>
					
					<div class="p-6">
						{#if review.title && review.uri}
							<a 
								href={review.uri}
								target="_blank"
								rel="noopener noreferrer"
								class="block mb-2"
							>
								<h3 class="text-lg font-semibold text-gray-800 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400 transition-colors">
									{review.title}
								</h3>
							</a>
						{/if}

						{#if review.book_title && review.bookid}
							<div class="mb-3">
								<a 
									href="/books/{review.bookid}.html"
									class="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
								>
									📖 {review.book_title}
								</a>
							</div>
						{/if}

						<div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
							{#if review.datein}
								<span>{formatDate(review.datein)}</span>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- Simple Pagination -->
		{#if pagination.total_pages > 1}
			<div class="mt-8 flex items-center justify-center space-x-4">
				<!-- First Page -->
				{#if pagination.current_page <= 1}
					<span class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
						首页
					</span>
				{:else}
					<a
						href={getPageUrl(1)}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						首页
					</a>
				{/if}

				<!-- Previous Page -->
				{#if pagination.current_page <= 1}
					<span class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
						上一页
					</span>
				{:else}
					<a
						href={getPageUrl(pagination.current_page - 1)}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						上一页
					</a>
				{/if}

				<!-- Current Page Info -->
				<span class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
					第 {pagination.current_page} / {pagination.total_pages} 页
				</span>

				<!-- Next Page -->
				{#if pagination.current_page >= pagination.total_pages}
					<span class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
						下一页
					</span>
				{:else}
					<a
						href={getPageUrl(pagination.current_page + 1)}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						下一页
					</a>
				{/if}

				<!-- Last Page -->
				{#if pagination.current_page >= pagination.total_pages}
					<span class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
						末页
					</span>
				{:else}
					<a
						href={getPageUrl(pagination.total_pages)}
						class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						末页
					</a>
				{/if}
			</div>
		{/if}
	{/if}
</div>

<style>
	.container {
		animation: fadeIn 0.6s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	article {
		transition: transform 0.2s ease-in-out;
	}

	article:hover {
		transform: translateY(-2px);
	}
</style>