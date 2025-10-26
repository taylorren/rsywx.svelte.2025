<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { formatChineseDate, formatRelativeTime } from '$lib/utils/dateFormatters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { book } = data;

	let imageError = $state(false);
	let imageLoaded = $state(false);

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}
</script>

<svelte:head>
	<title>{book.title} - {book.author} | 任氏有无轩</title>
	<meta name="description" content={book.intro || `${book.title} by ${book.author}`} />
</svelte:head>

<main class="mx-auto max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm text-gray-600 dark:text-gray-400">
		<a href="/" class="hover:text-blue-600 dark:hover:text-blue-400">首页</a>
		<span class="mx-2">›</span>
		<span>书籍详情</span>
	</nav>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Book Cover and Basic Info -->
		<div class="lg:col-span-1">
			<Card class="overflow-hidden">
				<!-- Book Cover -->
				<div
					class="aspect-3/4 w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20"
				>
					{#if !imageError}
						<img
							src="/covers/{book.bookid}.webp"
							alt={book.title}
							class="h-full w-full object-cover transition-all duration-500 {imageLoaded
								? 'translate-y-0 opacity-100'
								: '-translate-y-2 opacity-0'}"
							onerror={handleImageError}
							onload={handleImageLoad}
						/>
					{:else}
						<div
							class="flex h-full w-full animate-in items-center justify-center duration-300 fade-in-50"
						>
							<svg
								class="h-24 w-24 text-slate-300 dark:text-slate-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"
								/>
							</svg>
						</div>
					{/if}
				</div>

				<CardContent class="p-6">
					<!-- Basic Info -->
					<div class="space-y-4">
						<div>
							<h1 class="text-2xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
							<p class="mt-1 text-lg text-gray-600 dark:text-gray-400">
								【{book.region}】{book.author}
								{#if book.translated && book.copyrighter}
									<br />
									<span class="text-sm">译者：{book.copyrighter}</span>
								{/if}
							</p>
						</div>

						<!-- Tags -->
						{#if book.tags && book.tags.length > 0}
							<div>
								<h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">标签</h3>
								<div class="flex flex-wrap gap-2">
									{#each book.tags as tag}
										<span
											class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
										>
											{tag}
										</span>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Location -->
						{#if book.location}
							<div>
								<h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">位置</h3>
								<span
									class="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
								>
									📍 {book.location}
								</span>
							</div>
						{/if}

						<!-- Visit Stats -->
						<div class="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
							<div class="text-center">
								<div class="text-lg font-bold text-blue-600 dark:text-blue-400">
									{book.total_visits.toLocaleString()}
								</div>
								<div class="text-xs text-gray-500 dark:text-gray-500">总访问</div>
							</div>
							<div class="text-center">
								<div class="text-lg font-bold text-blue-600 dark:text-blue-400">
									{formatRelativeTime(book.last_visited)}
								</div>
								<div class="text-xs text-gray-500 dark:text-gray-500">最近访问</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Detailed Information -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Book Introduction -->
			{#if book.intro}
				<Card>
					<CardHeader>
						<CardTitle>内容简介</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-700 dark:text-gray-300 leading-relaxed">{book.intro}</p>
					</CardContent>
				</Card>
			{/if}

			<!-- Publication Details -->
			<Card>
				<CardHeader>
					<CardTitle>出版信息</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">出版社</h4>
							<p class="mt-1 text-gray-900 dark:text-white">{book.publisher_name}</p>
						</div>
						<div>
							<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">出版日期</h4>
							<p class="mt-1 text-gray-900 dark:text-white">
								{formatChineseDate(book.pubdate)}
							</p>
						</div>
						{#if book.printdate}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">印刷日期</h4>
								<p class="mt-1 text-gray-900 dark:text-white">
									{formatChineseDate(book.printdate)}
								</p>
							</div>
						{/if}
						{#if book.isbn}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">ISBN</h4>
								<p class="mt-1 text-gray-900 dark:text-white font-mono">{book.isbn}</p>
							</div>
						{/if}
						{#if book.page}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">页数</h4>
								<p class="mt-1 text-gray-900 dark:text-white">
									{book.page.toLocaleString()} 页
								</p>
							</div>
						{/if}
						{#if book.kword}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">千字数</h4>
								<p class="mt-1 text-gray-900 dark:text-white">
									{book.kword.toLocaleString()} 千字
								</p>
							</div>
						{/if}
						{#if book.deco}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">装帧</h4>
								<p class="mt-1 text-gray-900 dark:text-white">{book.deco}</p>
							</div>
						{/if}
						{#if book.ver}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">版次</h4>
								<p class="mt-1 text-gray-900 dark:text-white">第 {book.ver} 版</p>
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>

			<!-- Purchase Information -->
			<Card>
				<CardHeader>
					<CardTitle>收藏信息</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">购买日期</h4>
							<p class="mt-1 text-gray-900 dark:text-white">
								{formatChineseDate(book.purchdate)}
							</p>
						</div>
						<div>
							<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">购买价格</h4>
							<p class="mt-1 text-gray-900 dark:text-white">¥{book.price}</p>
						</div>
						<div>
							<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">购买地点</h4>
							<p class="mt-1 text-gray-900 dark:text-white">{book.place_name}</p>
						</div>
						<div>
							<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">库存状态</h4>
							<p class="mt-1">
								<span
									class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium {book.instock
										? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
										: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}"
								>
									{book.instock ? '在库' : '不在库'}
								</span>
							</p>
						</div>
						{#if book.category}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">分类</h4>
								<p class="mt-1 text-gray-900 dark:text-white">{book.category}</p>
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>

			<!-- Reviews Section (placeholder for future) -->
			{#if book.reviews && book.reviews.length > 0}
				<Card>
					<CardHeader>
						<CardTitle>书评</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-gray-500 dark:text-gray-400">暂无书评</p>
					</CardContent>
				</Card>
			{/if}
		</div>
	</div>
</main>