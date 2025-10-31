<script lang="ts">
	import BookListComponent from '$lib/components/BookListComponent.svelte';

	import type { Book } from '$lib/types/api';

	export let data: { books?: Book[]; error?: string | null } = {};

	const config = {
		apiEndpoint: '/api/v1/books/unpopular/20',
		badgeColor: 'gray' as const,
		emptyMessage: '暂无冷门书籍',
		title: '冷门书籍',
		description: '访问次数较少的冷门书籍',
		icon: '❄️'
	};
</script>

<svelte:head>
	<title>冷门书籍 | 任氏有无轩</title>
	<meta name="description" content="访问次数较少的冷门书籍" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">❄️ 冷门书籍</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300">访问次数较少的冷门书籍</p>
	</div>

	<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
	<BookListComponent {config} initialItems={data?.books ?? []} />
	</div>
</div>