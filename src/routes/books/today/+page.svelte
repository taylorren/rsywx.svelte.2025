<script lang="ts">
	import { onMount } from 'svelte';
	import type { Book } from '$lib/types/api';

	interface TodayBook extends Book {
		years_ago: number;
	}

	interface DateInfo {
		requested_date: string;
		month_day: string;
		is_today: boolean;
	}

	let books: TodayBook[] = $state([]);
	let dateInfo: DateInfo | null = $state(null);
	let loading = $state(true);
	let error = $state('');

	async function fetchTodayBooks() {
		loading = true;
		error = '';
		
		try {
			const response = await fetch('/api/v1/books/today');
			const result = await response.json();
			
			if (result.success) {
				books = result.data || [];
				dateInfo = result.date_info || null;
			} else {
				error = '获取今日往昔书籍失败';
			}
		} catch (err) {
			error = '网络错误，请稍后重试';
			console.error('Error fetching today books:', err);
		} finally {
			loading = false;
		}
	}

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	onMount(() => {
		fetchTodayBooks();
	});
</script>

<svelte:head>
	<title>今日往昔 | 任氏有无轩</title>
	<meta name="description" content="回顾在今天这个日期购买的书籍" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">📅 今日往昔</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300 mb-2">历史上的今天（{new Date().getMonth() + 1}月{new Date().getDate()}日），购买了{books?.length}本书</p>
		
	</div>

	{#if error}
		<div class="mb-8 rounded-lg bg-red-50 border border-red-200 p-4 text-center dark:bg-red-900/20 dark:border-red-800">
			<p class="text-red-600 dark:text-red-400">{error}</p>
		</div>
	{/if}

	{#if loading}
		<div class="space-y-4">
			{#each Array(6) as _}
				<div class="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
					<div class="flex items-center space-x-4">
						<div class="flex-1 space-y-2">
							<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
							<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
							<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
						</div>
						<div class="w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else if books.length > 0}
		<div class="space-y-4">
			{#each books as book}
				<a 
					href="/books/{book.bookid}.html"
					class="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
				>
					<div class="flex items-center p-4">
						<div class="flex-1 min-w-0 pr-4">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
								{book.title}
							</h3>
							<div class="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
								<span class="font-medium">【{book.region}】{book.author}</span>
								{#if book.translated && book.copyrighter}
									<span class="ml-2 text-xs">译者：{book.copyrighter}</span>
								{/if}
							</div>
							<p class="text-sm text-gray-500 dark:text-gray-500 mb-2">
								{book.publisher_name}
							</p>
							
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-4 text-sm">
									<div class="flex items-center text-amber-600 dark:text-amber-400">
										<svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										{book.years_ago} 年前
									</div>
									<div class="text-gray-500 dark:text-gray-500">
										¥{book.price}
									</div>
									<div class="text-gray-500 dark:text-gray-500">
										{book.place_name}
									</div>
								</div>
							</div>
						</div>
						
						<div class="shrink-0">
							<div class="w-16 h-20 overflow-hidden rounded shadow-sm">
								<img
									src="/covers/{book.bookid}.webp"
									alt={book.title}
									class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<div class="mb-4">
				<svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">今日无往昔</h3>
			<p class="text-gray-500 dark:text-gray-400">在今天这个日期，往年没有购买过书籍</p>
		</div>
	{/if}
</div>

<style>
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>