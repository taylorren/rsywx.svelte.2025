<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { convertEnglishDateToChinese } from '$lib/utils/dateFormatters';

	interface WordPressPost {
		ID: number;
		post_title: string;
		post_name: string;
		post_excerpt: string;
		post_date: string;
		years_ago: number;
		permalink: string;
	}

	interface WordPressResponse {
		success: boolean;
		data: WordPressPost[];
		date_info?: {
			month: number;
			day: number;
			date_string: string;
			is_today: boolean;
		};
		count: number;
		message?: string;
	}

	let { 
		initialPosts = null,
		error = null
	}: {
		initialPosts?: WordPressResponse | null;
		error?: string | null;
	} = $props();

	let posts = $state<WordPressPost[]>(initialPosts?.data || []);
	let dateInfo = $state(initialPosts?.date_info || null);
	let currentError = $state(error);
</script>

<Card class="h-full">
	<CardHeader class="pb-3 border-b border-gray-100 dark:border-gray-800">
		<CardTitle class="text-lg font-semibold">
			{#if dateInfo}
				{convertEnglishDateToChinese(dateInfo.date_string)}博客回顾
			{:else}
				今日博客回顾
			{/if}
		</CardTitle>
	</CardHeader>
	<CardContent>
		{#if currentError}
			<div class="flex flex-col items-center justify-center py-8 text-center">
				<svg class="mb-2 h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
				</svg>
				<p class="text-sm text-gray-500 dark:text-gray-400">{currentError}</p>
			</div>
		{:else if posts.length === 0}
			<div class="flex flex-col items-center justify-center py-8 text-center">
				<svg class="mb-2 h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
				</svg>
				<p class="text-sm text-gray-500 dark:text-gray-400">今天没有历史博客文章</p>
			</div>
		{:else}
			<!-- Posts List -->
			<div class="divide-y divide-gray-100 dark:divide-gray-800">
				{#each posts as post}
					<a 
						href={post.permalink}
						target="_blank"
						rel="noopener noreferrer"
						class="block py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group first:pt-0 last:pb-0"
					>
						<div class="flex items-start justify-between gap-3">
							<div class="flex-1 min-w-0">
								<h3 class="text-sm font-medium text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
									{post.post_title}
								</h3>
								{#if post.post_excerpt}
									<p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
										{post.post_excerpt}
									</p>
								{/if}
							</div>
							<span class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 shrink-0">
								{post.years_ago}年前
							</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}


	</CardContent>
</Card>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>