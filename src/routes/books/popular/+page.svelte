<script lang="ts">
	import BookListComponent from '$lib/components/BookListComponent.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import type { Book } from '$lib/types/api';

	export let data: { books?: Book[]; error?: string | null } = {};

	const config = {
		apiEndpoint: '/api/v1/books/popular/20',
		badgeColor: 'blue' as const,
		emptyMessage: '暂无热门书籍',
		title: '热门书籍',
		description: '按访问次数排序的热门书籍',
		icon: '🔥'
	};
</script>

<SEO 
	title="热门书籍"
	description="任氏有无轩热门书籍列表，按访问次数排序展示最受欢迎的藏书。发现读者最喜爱的经典好书。"
	keywords="热门书籍,受欢迎图书,经典好书,藏书推荐,图书排行榜"
	type="website"
/>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">🔥 热门书籍</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300">按访问次数排序的热门书籍</p>
	</div>

	<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
	<BookListComponent {config} initialItems={data?.books ?? []} />
	</div>
</div>