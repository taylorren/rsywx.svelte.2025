<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	
	let mobileMenuOpen = $state(false);
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Header/Navbar -->
<header class="border-b bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700">
	<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<h1 class="text-xl font-bold text-gray-900 dark:text-white">Your App</h1>
			</div>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-4">
				<div class="flex items-baseline space-x-4">
					<a
						href="/"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
						>Home</a
					>
					<a
						href="/about"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>About</a
					>
					<a
						href="/contact"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>Contact</a
					>
				</div>
				<ThemeToggle />
			</div>

			<!-- Mobile menu button and theme toggle -->
			<div class="flex items-center space-x-2 md:hidden">
				<ThemeToggle />
				<button
					on:click={toggleMobileMenu}
					class="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
					aria-label="Toggle mobile menu"
				>
					{#if mobileMenuOpen}
						<!-- X icon -->
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Hamburger icon -->
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
				<div class="px-2 pt-2 pb-3 space-y-1">
					<a
						href="/"
						on:click={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-gray-300"
						>Home</a
					>
					<a
						href="/about"
						on:click={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>About</a
					>
					<a
						href="/contact"
						on:click={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>Contact</a
					>
				</div>
			</div>
		{/if}
	</nav>
</header>