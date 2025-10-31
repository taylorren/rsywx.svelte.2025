<script lang="ts">
	import ThemeToggle from '../ThemeToggle.svelte';
	import { onMount } from 'svelte';

	let mobileMenuOpen = $state(false);
	let libraryDropdownOpen = $state(false);
	let mobileLibraryDropdownOpen = $state(false);
	let searchQuery = $state('');

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		mobileLibraryDropdownOpen = false;
	}

	function toggleLibraryDropdown() {
		libraryDropdownOpen = !libraryDropdownOpen;
	}

	function closeLibraryDropdown() {
		libraryDropdownOpen = false;
	}

	function toggleMobileLibraryDropdown() {
		mobileLibraryDropdownOpen = !mobileLibraryDropdownOpen;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.library-dropdown')) {
			libraryDropdownOpen = false;
		}
	}

	function handleSearch(event: Event) {
		event.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/books/list/misc/${encodeURIComponent(searchQuery.trim())}/1`;
		}
	}

	function handleSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch(event);
		}
	}
</script>

<!-- Header/Navbar -->
<header class="sticky top-0 z-50 border-b bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
	<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-3">
			<div class="flex items-center space-x-3">
				<img src="/images/logo.svg" alt="Logo" class="h-16 w-16" />
				<h1 class="text-xl font-bold text-gray-900 dark:text-white">
					任氏有无轩 | 藏书 读书 博客 维客 资源
				</h1>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-3 md:flex">
				<div class="flex items-baseline space-x-2">
					<a
						href="/"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
						>首页</a
					>
					<!-- Library Dropdown -->
					<div class="library-dropdown relative">
						<button
							onclick={toggleLibraryDropdown}
							class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>
							藏书
							<svg
								class="h-4 w-4 transition-transform {libraryDropdownOpen ? 'rotate-180' : ''}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if libraryDropdownOpen}
							<div
								class="ring-opacity-5 absolute top-full left-0 z-50 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black dark:bg-gray-800 dark:ring-gray-700"
							>
								<div class="py-1">
									<a
										href="/books/list"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										📖 藏书总目
									</a>
									<a
										href="/books/random"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										🎲 手气不错
									</a>
									<a
										href="/books/today"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										📅 今日往昔
									</a>
								</div>
							</div>
						{/if}
					</div>
					<a
						href="/readings"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>读书</a
					>
					<a
						href="https://blog.rsywx.net"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>博客
						<svg
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
					<a
						href="http://rsywx.com"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>维客
						<svg
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
					<a
						href="/contact"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>联系站长</a
					>
				</div>
				
				<!-- Search Box -->
				<div class="flex items-center">
					<form onsubmit={handleSearch} class="relative">
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
							<input
								type="text"
								bind:value={searchQuery}
								onkeydown={handleSearchKeydown}
								placeholder="搜索书籍..."
								class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
							/>
						</div>
					</form>
				</div>
				
				<ThemeToggle />
			</div>

			<!-- Mobile menu button and theme toggle -->
			<div class="flex items-center space-x-2 md:hidden">
				<ThemeToggle />
				<button
					onclick={toggleMobileMenu}
					class="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
					aria-label="Toggle mobile menu"
				>
					{#if mobileMenuOpen}
						<!-- X icon -->
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Hamburger icon -->
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileMenuOpen}
			<div
				class="border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900"
			>
				<div class="space-y-1 px-2 pt-2 pb-3">
					<!-- Mobile Search Box -->
					<div class="px-3 py-2">
						<form onsubmit={handleSearch} class="relative">
							<div class="relative">
								<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
									</svg>
								</div>
								<input
									type="text"
									bind:value={searchQuery}
									onkeydown={handleSearchKeydown}
									placeholder="搜索书籍..."
									class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
								/>
							</div>
						</form>
					</div>
					<a
						href="/"
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-gray-300"
						>首页</a
					>
					<!-- 藏书 Section -->
					<div class="py-1">
						<button
							onclick={toggleMobileLibraryDropdown}
							class="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-gray-300"
						>
							<span>藏书</span>
							<svg
								class="h-4 w-4 transition-transform {mobileLibraryDropdownOpen ? 'rotate-180' : ''}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if mobileLibraryDropdownOpen}
							<div class="ml-4 space-y-1 mt-1">
								<a
									href="/books/list"
									onclick={closeMobileMenu}
									class="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>📖 藏书总目</a
								>
								<a
									href="/books/random"
									onclick={closeMobileMenu}
									class="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>🎲 手气不错</a
								>
								<a
									href="/books/today"
									onclick={closeMobileMenu}
									class="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
									>📅 今日往昔</a
								>
							</div>
						{/if}
					</div>
					<a
						href="/readings"
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>读书</a
					>
					<a
						href="https://blog.rsywx.net"
						target="_blank"
						rel="noopener noreferrer"
						onclick={closeMobileMenu}
						class="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>博客
						<svg
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
					<a
						href="http://rsywx.com"
						target="_blank"
						rel="noopener noreferrer"
						onclick={closeMobileMenu}
						class="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>维客
						<svg
							class="h-3 w-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
					<a
						href="/contact"
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>联系站长</a
					>
				</div>
			</div>
		{/if}
	</nav>
</header>