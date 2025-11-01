<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<SEO />

<svelte:head>
	<link rel="icon" href="/images/favicon.ico" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
	<Header />
	{@render children?.()}
	<Footer />
</div>
