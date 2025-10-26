<script lang="ts">
	import ThemeToggle from '../ThemeToggle.svelte';
	import { onMount } from 'svelte';

	let mobileMenuOpen = $state(false);
	let libraryDropdownOpen = $state(false);

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
	}

	function toggleLibraryDropdown() {
		libraryDropdownOpen = !libraryDropdownOpen;
	}

	function closeLibraryDropdown() {
		libraryDropdownOpen = false;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.library-dropdown')) {
			libraryDropdownOpen = false;
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
										href="/books/fiction"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										📚 小说文学
									</a>
									<a
										href="/books/history"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										📜 历史传记
									</a>
									<a
										href="/books/philosophy"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										🤔 哲学思想
									</a>
									<a
										href="/books/science"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										🔬 科学技术
									</a>
									<a
										href="/books/economics"
										onclick={closeLibraryDropdown}
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
									>
										💰 经济管理
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
					<a
						href="/"
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-gray-300"
						>首页</a
					>
					<a
						href="/about"
						onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
						>藏书</a
					>
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