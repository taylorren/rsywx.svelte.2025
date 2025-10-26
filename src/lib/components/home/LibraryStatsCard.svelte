<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { formatChineseDate } from '$lib/utils/dateFormatters';

	interface LibraryStats {
		success: boolean;
		data?: {
			total_books: number;
			total_pages: number;
			total_kwords: number;
			total_visits: number;
		};
		cached?: boolean;
	}

	interface Props {
		booksStatus: LibraryStats | null;
		error?: string;
		fetchedAt: string;
	}

	let { booksStatus, error, fetchedAt }: Props = $props();



	// Rolling animation states
	let animatedBooks = $state(0);
	let animatedPages = $state(0);
	let animatedKwords = $state(0);
	let animatedVisits = $state(0);

	// Animation function
	function animateNumber(target: number, setter: (value: number) => void, duration = 2000) {
		const start = 0;
		const startTime = Date.now();
		
		function update() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			const current = Math.floor(start + (target - start) * easeOutQuart);
			
			setter(current);
			
			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}
		
		requestAnimationFrame(update);
	}

	// Trigger animations when data is available
	$effect(() => {
		if (booksStatus?.success && booksStatus?.data) {
			const data = booksStatus.data;
			
			// Animate each number with slight delays for staggered effect
			setTimeout(() => animateNumber(data.total_books || 0, (v) => animatedBooks = v), 100);
			setTimeout(() => animateNumber(Math.round((data.total_pages || 0) / 1000), (v) => animatedPages = v), 200);
			setTimeout(() => animateNumber(Math.round((data.total_kwords || 0) / 1000), (v) => animatedKwords = v), 300);
			setTimeout(() => animateNumber(Math.round((data.total_visits || 0) / 1000), (v) => animatedVisits = v), 400);
		}
	});
</script>

<Card class="overflow-hidden p-0">
	<div class="aspect-video w-full overflow-hidden">
		<img
			src="/images/bookshelf.webp"
			alt="Library Bookshelf"
			class="h-full w-full object-cover transition-transform hover:scale-105"
		/>
	</div>
	<CardHeader class="px-6 pt-6 pb-2">
		<CardTitle class="flex items-center gap-2 text-xl">
			<svg class="h-6 w-6 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
				<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
			</svg>
			藏书统计
		</CardTitle>
		<CardDescription>
			截止{formatChineseDate(fetchedAt)}，任氏有无轩藏书基本信息：
		</CardDescription>
	</CardHeader>
	<CardContent class="space-y-3 px-6 pb-6">
		{#if error}
			<div class="text-center text-red-600 dark:text-red-400">
				<span class="text-2xl">❌</span>
				<p class="text-sm mt-1">获取失败</p>
			</div>
		{:else if booksStatus?.success && booksStatus?.data}
			<div class="grid grid-cols-2 gap-2 text-center">
				<div>
					<div class="text-lg font-bold text-blue-600 dark:text-blue-400 transition-all duration-300">
						{animatedBooks.toLocaleString()}
					</div>
					<div class="text-xs text-slate-500 dark:text-slate-500">藏书</div>
				</div>
				<div>
					<div class="text-lg font-bold text-blue-600 dark:text-blue-400 transition-all duration-300">
						{animatedPages}K
					</div>
					<div class="text-xs text-slate-500 dark:text-slate-500">页数</div>
				</div>
				<div>
					<div class="text-lg font-bold text-blue-600 dark:text-blue-400 transition-all duration-300">
						{animatedKwords}K
					</div>
					<div class="text-xs text-slate-500 dark:text-slate-500">千字</div>
				</div>
				<div>
					<div class="text-lg font-bold text-blue-600 dark:text-blue-400 transition-all duration-300">
						{animatedVisits}K
					</div>
					<div class="text-xs text-slate-500 dark:text-slate-500">访问</div>
				</div>
			</div>
		{:else}
			<div class="text-center text-yellow-600 dark:text-yellow-400">
				<span class="text-2xl">⚠️</span>
				<p class="text-sm mt-1">暂无数据</p>
			</div>
		{/if}
	</CardContent>
</Card>