<script lang="ts">

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	// Access data reactively using Svelte 5 runes
	const books = $derived(data.books);
	const pagination = $derived(data.pagination);
	const searchType = $derived(data.searchType);
	const searchValue = $derived(data.searchValue);
	
	// Debug logging - this will run whenever data changes
	$effect(() => {
		console.log('Frontend data updated:', { 
			booksCount: books.length, 
			currentPage: pagination.current_page,
			firstBookId: books[0]?.bookid,
			searchType,
			searchValue 
		});
	});

	function getAuthorUrl(author: string) {
		// Build author search URL: /books/list/author/[author]/1
		return `/books/list/author/${encodeURIComponent(author)}/1`;
	}

	function getPageUrl(newPage: number) {
		// Build URL with current search parameters but new page
		const value = searchValue || '-';
		return `/books/list/${searchType}/${encodeURIComponent(value)}/${newPage}`;
	}

	function getSearchTitle() {
		if (searchType === 'author' && searchValue) {
			return `作者：${searchValue}`;
		} else if (searchType === 'title' && searchValue) {
			return `书名：${searchValue}`;
		} else if (searchType === 'tags' && searchValue) {
			return `标签：${searchValue}`;
		} else if (searchType === 'misc' && searchValue) {
			return `搜索：${searchValue}`;
		}
		return '藏书总目';
	}
</script>

<svelte:head>
	<title>{getSearchTitle()} | 任氏有无轩</title>
	<meta name="description" content="浏览任氏有无轩的藏书列表" />
</svelte:head>

<main class="mx-auto max-w-full flex-1 px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
			{getSearchTitle()}
		</h1>

		<!-- Search Info -->
		<div class="mb-6 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-4 border border-blue-100 shadow-sm dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800/30">
			<div class="flex items-center">
				<div class="shrink-0">
					<div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
						<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
						</svg>
					</div>
				</div>
				<div class="ml-4">
					<span class="text-sm font-medium text-blue-900 dark:text-blue-100">
					{#if searchType === 'author' && searchValue}
						正在按作者搜索：<strong>{searchValue}</strong>
					{:else if searchType === 'title' && searchValue}
						正在按书名搜索：<strong>{searchValue}</strong>
					{:else if searchType === 'tags' && searchValue}
						正在按标签搜索：<strong>{searchValue}</strong>
					{:else if searchType === 'misc' && searchValue}
						正在综合搜索：<strong>{searchValue}</strong>
					{:else}
						正在浏览：<strong>所有书籍</strong>
					{/if}
					</span>
				</div>
			</div>
		</div>

		<!-- Results Info -->
		<div class="mb-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
			<div class="flex items-center space-x-3">
				<div class="flex items-center space-x-2">
					<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
					</svg>
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
						共找到 <span class="font-semibold text-blue-600 dark:text-blue-400">{pagination.total_results.toLocaleString()}</span> 本书籍
					</span>
				</div>
				{#if pagination.total_pages > 1}
					<div class="flex items-center space-x-2">
						<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"/>
						</svg>
						<span class="text-sm text-gray-600 dark:text-gray-400">
							第 <span class="font-semibold">{pagination.current_page}</span> / <span class="font-semibold">{pagination.total_pages}</span> 页
						</span>
					</div>
				{/if}
			</div>
			{#if data.cached}
				<div class="flex items-center space-x-1">
					<svg class="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span class="text-xs font-medium text-amber-600 dark:text-amber-400">缓存数据</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Book Table -->
	{#if books.length > 0}
		<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
			<div class="overflow-x-auto">
				<table class="w-full table-fixed" style="width: 1200px;">
					<colgroup>
						<col style="width: 150px;">
						<col style="width: 500px;">
						<col style="width: 350px;">
						<col style="width: 200px;">
					</colgroup>
					<thead class="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
						<tr>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
								<div class="flex items-center space-x-2">
									<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
									</svg>
									<span>书籍ID</span>
								</div>
							</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
								<div class="flex items-center space-x-2">
									<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
									</svg>
									<span>书名</span>
								</div>
							</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
								<div class="flex items-center space-x-2">
									<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
									</svg>
									<span>作者</span>
								</div>
							</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider dark:text-gray-300">
								<div class="flex items-center space-x-2">
									<svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
									</svg>
									<span>位置</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100 dark:divide-gray-700">
					{#each books as book, index}
						<tr class="group hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 {index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'}">
							<td class="px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-gray-700 truncate">
								<div class="flex items-center space-x-2">
									<div class="h-2 w-2 rounded-full bg-blue-400 opacity-60 group-hover:opacity-100 transition-opacity shrink-0"></div>
									<span class="font-semibold truncate">{book.bookid}</span>
								</div>
							</td>
							<td class="px-4 py-3 border-r border-gray-100 dark:border-gray-700">
								<a
									href="/books/{book.bookid}.html"
									class="block text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400 leading-relaxed transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300 truncate"
									title={book.title}
								>
									{book.title}
								</a>
							</td>
							<td class="px-4 py-3 border-r border-gray-100 dark:border-gray-700">
								<a
									href={getAuthorUrl(book.author)}
									class="block text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 leading-relaxed transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300 truncate"
									title="【{book.region}】{book.author}"
								>
									<span class="text-gray-500 dark:text-gray-400">【{book.region}】</span>{book.author}
								</a>
							</td>
							<td class="px-4 py-3">
								<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-linear-to-r from-emerald-100 to-green-100 text-emerald-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-300 shadow-sm">
									<svg class="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
									</svg>
									<span class="truncate">{book.location}</span>
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
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
	{:else}
		<!-- Empty State -->
		<div class="py-12 text-center">
			<svg
				class="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			<h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">没有找到书籍</h3>
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
				{#if searchValue}
					没有找到符合条件的书籍，请尝试其他搜索条件。
				{:else}
					书库中暂时没有书籍。
				{/if}
			</p>
		</div>
	{/if}
</main>