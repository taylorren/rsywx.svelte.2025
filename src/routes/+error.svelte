<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>页面未找到 - 404</title>
	<meta name="description" content="抱歉，您访问的页面不存在。" />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-900 dark:to-slate-800">
	<div class="w-full max-w-md text-center">
		<!-- 404 SVG Image -->
		<div class="mb-8 flex justify-center">
			<img 
				src="/images/404.svg" 
				alt="404 - 页面未找到" 
				class="h-64 w-64 object-contain"
			/>
		</div>

		<!-- Error Message -->
		<div class="mb-8 space-y-4">
			<h1 class="text-4xl font-bold text-slate-800 dark:text-slate-200">
				404
			</h1>
			<h2 class="text-xl font-semibold text-slate-700 dark:text-slate-300">
				页面未找到
			</h2>
			<p class="text-slate-600 dark:text-slate-400">
				抱歉，您访问的页面不存在或已被移动。
			</p>
			{#if $page.status}
				<p class="text-sm text-slate-500 dark:text-slate-500">
					错误代码: {$page.status}
				</p>
			{/if}
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
			<Button 
				onclick={() => window.history.back()}
				variant="outline"
				class="w-full sm:w-auto"
			>
				← 返回上页
			</Button>
			<a href="/" class="w-full sm:w-auto">
				<Button class="w-full">
					🏠 回到首页
				</Button>
			</a>
		</div>

		<!-- Additional Help -->
		<div class="mt-8 text-sm text-slate-500 dark:text-slate-500">
			<p>如果您认为这是一个错误，请</p>
			<a 
				href="/contact" 
				class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
			>
				联系我们
			</a>
		</div>
	</div>
</div>