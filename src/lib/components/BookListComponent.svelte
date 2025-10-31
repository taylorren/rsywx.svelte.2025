<script lang="ts">
	import { onMount } from 'svelte';

	interface BookListItem {
		id: number;
		bookid: string;
		title: string;
		author: string;
		region?: string;
		total_visits: number;
		last_visited: string;
		location?: string;
		visit_country?: string | null;
		days_since_visit?: number; // For forgotten books
	}

	interface BookListConfig {
		apiEndpoint: string;
		badgeColor: 'blue' | 'gray' | 'green' | 'red';
		emptyMessage: string;
		title: string;
		description: string;
		icon: string;
	}

	// Props
	let { 
		config,
		autoLoad = false,
		initialItems = []
	}: { 
		config: BookListConfig;
		autoLoad?: boolean;
		// allow either server Book[] or local BookListItem[] shapes
		initialItems?: any[];
	} = $props();

	// State (initialize from server-provided initialItems when present)
	let books: BookListItem[] = $state(initialItems ?? []);
	let loading = $state(false);
	let error = $state('');

	// Public methods (exposed via bind:this)
	export async function loadBooks() {
		loading = true;
		error = '';
		
		try {
			const response = await fetch(config.apiEndpoint);
			const result = await response.json();
			
			if (result.success) {
				books = result.data || [];
			} else {
				error = `获取${config.title}失败`;
			}
		} catch (err) {
			error = '网络错误，请稍后重试';
			console.error(`Error fetching books from ${config.apiEndpoint}:`, err);
		} finally {
			loading = false;
		}
	}

	function getBadgeColorClasses(color: BookListConfig['badgeColor']) {
		const colorMap = {
			blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
			gray: 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300',
			green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
			red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
		};
		return colorMap[color];
	}

	function formatDateTime(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleString('zh-CN', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatNumber(num: number) {
		return num.toLocaleString('zh-CN');
	}

	onMount(() => {
		// If consumer asked for autoLoad, only perform it when there are no initialItems
		// This allows pages to SSR the list by passing `initialItems` while keeping
		// the component usable in client-only contexts (autoLoad = true).
		if (autoLoad && (!initialItems || initialItems.length === 0)) {
			loadBooks();
		}
	});
</script>

<div>
	<div class="p-6 border-b border-gray-200 dark:border-gray-700">
		<h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
			{config.icon} {config.title}
		</h2>
		<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{config.description}</p>
	</div>
	
	<div class="p-6">
		{#if loading}
			<div class="space-y-4">
				{#each Array(10) as _}
					<div class="animate-pulse bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
						<div class="flex items-center justify-between">
							<div class="flex-1 space-y-2">
								<div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
								<div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
							</div>
							<div class="w-16 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if error}
			<div class="text-center py-12">
				<p class="text-red-600 dark:text-red-400 mb-2">{error}</p>
				<button 
					onclick={loadBooks}
					class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline"
				>
					重试
				</button>
			</div>
		{:else if books.length > 0}
			<div class="space-y-3">
				{#each books as book, index}
					<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4 flex-1 min-w-0">
								<div class="shrink-0 w-8 h-8 {getBadgeColorClasses(config.badgeColor)} rounded-full flex items-center justify-center">
									<span class="text-sm font-bold">#{index + 1}</span>
								</div>
								<div class="flex-1 min-w-0">
									<h3 class="font-medium text-gray-900 dark:text-white mb-1">
										<a 
											href="/books/{book.bookid}.html" 
											class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
										>
											{book.title}
										</a>
									</h3>
									<div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
										{#if book.region}
											<span>【{book.region}】{book.author}</span>
										{:else}
											<span>{book.author}</span>
										{/if}
										<span>访问 {formatNumber(book.total_visits)} 次</span>
										<span>最近访问：{formatDateTime(book.last_visited)}</span>
										{#if book.location}
											<span class="inline-flex items-center gap-1">
												<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
												</svg>
												{book.location}
											</span>
										{/if}
										{#if book.visit_country}
											<span class="inline-flex items-center gap-1">
												<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
												</svg>
												{book.visit_country}
											</span>
										{/if}
										{#if book.days_since_visit !== undefined}
											<span class="inline-flex items-center gap-1">
												<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
												</svg>
												{book.days_since_visit} 天前
											</span>
										{/if}
									</div>
								</div>
							</div>
							<div class="shrink-0">
								<div class="w-12 h-16 overflow-hidden rounded shadow-sm">
									<img
										src="/covers/{book.bookid}.webp"
										alt={book.title}
										class="w-full h-full object-contain"
										loading="lazy"
									/>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center py-12">
				<div class="mb-4">
					<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{config.emptyMessage}</h3>
				<p class="text-gray-500 dark:text-gray-400">没有找到相关书籍</p>
			</div>
		{/if}
	</div>
</div>