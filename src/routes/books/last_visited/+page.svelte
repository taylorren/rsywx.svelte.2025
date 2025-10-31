<script lang="ts">
	import BookListComponent from '$lib/components/BookListComponent.svelte';

	const config = {
		apiEndpoint: '/api/v1/books/last_visited/20',
		badgeColor: 'green' as const,
		emptyMessage: '暂无访问记录',
		title: '最近访问的书籍',
		description: '按最近访问时间排序的书籍',
		icon: '👁️'
	};
</script>

<svelte:head>
	<title>最近访问的书籍 | 任氏有无轩</title>
	<meta name="description" content="按最近访问时间排序的书籍" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">👁️ 最近访问的书籍</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300">按最近访问时间排序的书籍</p>
	</div>

	<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
		<BookListComponent {config} autoLoad={true} />
	</div>
</div>