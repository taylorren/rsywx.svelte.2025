<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { formatChineseDate, formatRelativeTime } from '$lib/utils/dateFormatters';
	import { invalidateAll } from '$app/navigation';
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { book } = data;

	let imageError = $state(false);
	let imageLoaded = $state(false);
	let showTagModal = $state(false);
	let newTagsInput = $state('');
	let isAddingTags = $state(false);
	let currentTags = $state(book.tags || []);
	let successMessage = $state('');
	let showSuccessBanner = $state(false);

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}

	function openTagModal() {
		showTagModal = true;
		newTagsInput = '';
	}

	function closeTagModal() {
		showTagModal = false;
		newTagsInput = '';
	}

	function showSuccessMessage(message: string) {
		successMessage = message;
		showSuccessBanner = true;
		// 3秒后自动隐藏
		setTimeout(() => {
			showSuccessBanner = false;
		}, 3000);
	}

	async function addTags() {
		if (!newTagsInput.trim()) return;

		const tags = newTagsInput.trim().split(/\s+/).filter(tag => tag.length > 0);
		if (tags.length === 0) return;

		isAddingTags = true;

		try {
			const response = await fetch(`/api/v1/books/${book.bookid}/tags`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tags })
			});

			const result = await response.json();

			if (result.success) {
				// 刷新服务器缓存和重新获取完整标签列表
				try {
					// 1. 刷新API缓存
					const refreshResponse = await fetch(`/api/v1/books/${book.bookid}?refresh=true`, {
						method: 'GET',
						headers: {
							'Cache-Control': 'no-cache'
						}
					});
					
					// 2. 获取更新后的完整书籍信息
					if (refreshResponse.ok) {
						const refreshedData = await refreshResponse.json();
						if (refreshedData.success && refreshedData.data && refreshedData.data.tags) {
							// 使用服务器返回的标签顺序
							currentTags = refreshedData.data.tags;
						} else {
							// 如果获取失败，回退到追加方式
							if (result.added_tags && result.added_tags.length > 0) {
								currentTags = [...currentTags, ...result.added_tags];
							}
						}
					} else {
						// 如果刷新失败，回退到追加方式
						if (result.added_tags && result.added_tags.length > 0) {
							currentTags = [...currentTags, ...result.added_tags];
						}
					}
					
					// 3. 强制重新加载页面数据（这会在后台更新服务器端数据）
					invalidateAll();
				} catch (cacheError) {
					console.warn('Failed to refresh cache:', cacheError);
					// 如果出错，回退到追加方式
					if (result.added_tags && result.added_tags.length > 0) {
						currentTags = [...currentTags, ...result.added_tags];
					}
				}
				
				// 显示成功信息
				if (result.added_tags && result.added_tags.length > 0) {
					const addedCount = result.added_tags.length;
					const duplicateCount = result.duplicate_tags ? result.duplicate_tags.length : 0;
					let message = `成功添加 ${addedCount} 个标签`;
					if (duplicateCount > 0) {
						message += `，${duplicateCount} 个标签已存在`;
					}
					showSuccessMessage(message);
				}
				
				closeTagModal();
			} else {
				alert('添加标签失败：' + (result.message || '未知错误'));
			}
		} catch (error) {
			console.error('添加标签时出错:', error);
			alert('添加标签时出错，请稍后重试。错误详情：' + (error instanceof Error ? error.message : '未知错误'));
		} finally {
			isAddingTags = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addTags();
		} else if (event.key === 'Escape') {
			closeTagModal();
		}
	}
</script>

<SEO 
	title={`${book.title} - ${book.author}`}
	description={book.intro || `${book.title} 作者：${book.author}，出版社：${book.publisher_name}。任氏有无轩藏书详情页面。`}
	keywords={`${book.title},${book.author},${book.publisher_name},${currentTags.join(',')},图书,藏书`}
	type="book"
	bookTitle={book.title}
	bookAuthor={book.author}
	isbn={book.isbn}
	tags={currentTags}
	image={`/covers/${book.bookid}.jpg`}
	imageAlt={`${book.title} - ${book.author}`}
/>

<style>
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

<main class="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<nav class="mb-6 text-sm text-gray-600 dark:text-gray-400">
		<a href="/" class="hover:text-blue-600 dark:hover:text-blue-400">首页</a>
		<span class="mx-2">›</span>
		<span>书籍详情</span>
		<span class="mx-2">›</span>
		<span>{book.title}</span>
	</nav>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Left Column: Book Cover and Reviews -->
		<div class="space-y-6">
			<!-- Book Cover -->
			<Card class="overflow-hidden">
				<div
					class="w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20 lg:min-w-[600px]"
					style="aspect-ratio: 3/4;"
				>
					{#if !imageError}
						<img
							src="/covers/{book.bookid}.jpg"
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
			</Card>

			<!-- Reviews Section -->
			<Card>
				<CardHeader>
					<CardTitle>相关书评</CardTitle>
				</CardHeader>
				<CardContent>
					{#if book.reviews && book.reviews.length > 0}
						<div class="space-y-6">
							{#each book.reviews as review}
								<article class="border-b border-gray-200 pb-6 last:border-b-0 dark:border-gray-700">
									<a 
										href={review.uri} 
										target="_blank" 
										rel="noopener noreferrer"
										class="block group hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-4 -m-4 transition-colors"
									>
										<!-- Feature Image -->
										<div class="mb-4 overflow-hidden rounded-lg">
											<img
												src={review.feature || `/covers/${book.bookid}.jpg`}
												alt={review.title}
												class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
												loading="lazy"
											/>
										</div>

										<!-- Review Header -->
										<div class="mb-3">
											<h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
												{review.title}
											</h4>
											<div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
												<span>{formatChineseDate(review.datein)}</span>
											</div>
										</div>

										<!-- Review Content Preview -->
										{#if review.content}
											<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
												{review.content}
											</p>
										{/if}
									</a>
								</article>
							{/each}
						</div>
					{:else}
						<div class="text-center py-12">
							<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
							</svg>
							<p class="mt-4 text-gray-500 dark:text-gray-400">暂无书评</p>
							<p class="mt-1 text-sm text-gray-400 dark:text-gray-500">还没有人为这本书写过评论</p>
						</div>
					{/if}
				</CardContent>
			</Card>
		</div>

		<!-- Right Column: Book Information -->
		<div class="space-y-6">
			<!-- Basic Book Information -->
			<Card>
				<CardHeader>
					<CardTitle>基本信息</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div>
						<div class="flex items-start justify-between mb-2">
							<h1 class="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
							{#if book.location}
								<span
									class="ml-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
								>
									📍 {book.location}
								</span>
							{/if}
						</div>
						<p class="text-xl text-gray-600 dark:text-gray-400">
							【{book.region}】<a 
								href="/books/list/author/{encodeURIComponent(book.author)}/1"
								class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-2 hover:underline"
							>{book.author}</a>
							{#if book.translated && book.copyrighter}
								<br />
								<span class="text-base">译者：{book.copyrighter}</span>
							{/if}
						</p>
					</div>

					<!-- Tags -->
					<div>
						<h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">标签</h3>
						
						<!-- Success Banner -->
						{#if showSuccessBanner}
							<div class="mb-3 rounded-md bg-green-50 p-3 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
								<div class="flex items-center">
									<svg class="h-4 w-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
									</svg>
									<p class="text-sm text-green-700 dark:text-green-300">{successMessage}</p>
									<button 
										onclick={() => showSuccessBanner = false}
										class="ml-auto text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
										aria-label="关闭成功消息"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
										</svg>
									</button>
								</div>
							</div>
						{/if}
						
						<div class="flex flex-wrap gap-2">
							{#each currentTags as tag}
								<a
									href="/books/list/tags/{encodeURIComponent(tag)}/1"
									class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
								>
									{tag}
								</a>
							{/each}
							<button
								onclick={openTagModal}
								class="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-400 dark:hover:bg-orange-500 transition-colors"
							>
								<svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
								</svg>
								添加标签
							</button>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- Book Introduction -->
			{#if book.intro}
				<Card>
					<CardHeader>
						<CardTitle>内容简介</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
							{book.intro}
						</div>
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
						{#if book.pubdate}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">出版日期</h4>
								<p class="mt-1 text-gray-900 dark:text-white">
									{formatChineseDate(book.pubdate)}
								</p>
							</div>
						{/if}
						{#if book.printdate}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">印刷日期</h4>
								<p class="mt-1 text-gray-900 dark:text-white">
									{formatChineseDate(book.printdate)}
								</p>
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

			<!-- Cataloging Information -->
			<Card>
				<CardHeader>
					<CardTitle>编目信息</CardTitle>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						{#if book.isbn}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">ISBN</h4>
								<p class="mt-1 text-gray-900 dark:text-white font-mono text-sm">{book.isbn}</p>
							</div>
						{/if}
						{#if book.category}
							<div>
								<h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">分类号</h4>
								<p class="mt-1 text-gray-900 dark:text-white">{book.category}</p>
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>

			<!-- Collection Information -->
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
					</div>
				</CardContent>
			</Card>

			<!-- Visit Statistics -->
			{#if book.total_visits || book.last_visited}
				<Card>
					<CardHeader>
						<CardTitle>访问统计</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-2 gap-4">
							{#if book.total_visits}
								<div class="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
									<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
										{book.total_visits.toLocaleString()}
									</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">总访问次数</div>
								</div>
							{/if}
							{#if book.last_visited}
								<div class="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
									<div class="text-lg font-bold text-green-600 dark:text-green-400">
										{formatRelativeTime(book.last_visited)}
									</div>
									<div class="text-sm text-gray-600 dark:text-gray-400">最近访问</div>
								</div>
							{/if}
						</div>
					</CardContent>
				</Card>
			{/if}
		</div>
	</div>
</main>

<!-- Add Tags Modal -->
{#if showTagModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<!-- Background overlay -->
		<div 
			class="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
			onclick={closeTagModal}
			onkeydown={(e) => e.key === 'Escape' && closeTagModal()}
			role="button"
			tabindex="-1"
		></div>

		<!-- Modal panel -->
		<div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
			<div class="text-center">
				<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
					<svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
					</svg>
				</div>
				<h3 class="mt-3 text-lg font-medium text-gray-900 dark:text-white">
					添加标签
				</h3>
				<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
					请输入要添加的标签，多个标签用空格分隔
				</p>
			</div>

			<div class="mt-4">
				<input
					bind:value={newTagsInput}
					onkeydown={handleKeydown}
					placeholder="例如：文学 经典 推荐"
					class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					disabled={isAddingTags}
				/>
			</div>

			<div class="mt-6 flex gap-3">
				<button
					onclick={closeTagModal}
					disabled={isAddingTags}
					class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				>
					取消
				</button>
				<button
					onclick={addTags}
					disabled={isAddingTags || !newTagsInput.trim()}
					class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					{#if isAddingTags}
						<svg class="mr-2 inline h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						添加中...
					{:else}
						添加标签
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}