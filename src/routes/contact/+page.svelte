<script lang="ts">
</script>

<svelte:head>
	<title>联系站长 - 任氏有无轩</title>
	<meta name="description" content="通过社交媒体或微信与我们联系" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<h1 class="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
		联系站长
	</h1>
	
	<!-- Social Media Links -->
	<div class="mb-12">
		<h2 class="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
			社交媒体
		</h2>
		
		<!-- First Row: GitHub Profile and Commit History -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
			<!-- GitHub -->
			<a 
				href="https://github.com/taylorren" 
				target="_blank" 
				rel="noopener noreferrer"
				class="flex items-center justify-center p-6 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
			>
				<svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				<span class="font-semibold">&nbsp;&nbsp;GitHub</span>
			</a>
			
			<!-- GitHub Commit History -->
			<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
				<!-- GitHub Contribution Chart (Larger) -->
				<div class="flex justify-center">
					<img 
						src="https://ghchart.rshah.org/taylorren" 
						alt="GitHub 提交活动图"
						class="max-w-full h-auto rounded-lg shadow-sm"
						loading="lazy"
						style="max-width: 100%; height: auto; min-height: 120px;"
					/>
				</div>
			</div>
		</div>
		
		<!-- Second Row: X, Facebook, and Instagram -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- X (formerly Twitter) -->
			<a 
				href="https://x.com/taylorren" 
				target="_blank" 
				rel="noopener noreferrer"
				class="flex items-center justify-center p-6 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
			>
				<svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
				</svg>
				<span class="font-semibold">&nbsp;&nbsp;X</span>
			</a>
			
			<!-- Facebook -->
			<a 
				href="https://facebook.com/taylor.ren" 
				target="_blank" 
				rel="noopener noreferrer"
				class="flex items-center justify-center p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
			>
				<svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
					<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
				</svg>
				<span class="font-semibold">&nbsp;&nbsp;Facebook</span>
			</a>
			
			<!-- Instagram -->
			<a 
				href="https://instagram.com/shenshang" 
				target="_blank" 
				rel="noopener noreferrer"
				class="flex items-center justify-center p-6 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
			>
				<svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
				</svg>
				<span class="font-semibold">&nbsp;&nbsp;Instagram</span>
			</a>
		</div>
	</div>

	<!-- WeChat Section -->
	<div class="mb-12">
		<h2 class="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
			微信
		</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- WeChat Personal Account -->
			<div class="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
				<h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
					个人微信
				</h3>
				<div class="flex justify-center mb-4">
					<img 
						src="/images/wechat_account.jpg" 
						alt="个人微信二维码"
						class="w-48 h-48 object-contain rounded-lg shadow-md"
						loading="lazy"
					/>
				</div>
				<p class="text-gray-600 dark:text-gray-300">
					扫码添加个人微信
				</p>
			</div>

			<!-- WeChat Subscription Account -->
			<div class="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
				<h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
					微信公众号
				</h3>
				<div class="flex justify-center mb-4">
					<img 
						src="/images/wechat_talk.jpg" 
						alt="微信公众号二维码"
						class="w-48 h-48 object-contain rounded-lg shadow-md"
						loading="lazy"
					/>
				</div>
				<p class="text-gray-600 dark:text-gray-300">
					关注我们的公众号
				</p>
			</div>
		</div>
	</div>


	<!-- Email Contact -->
	<div class="text-center bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
		<h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
			邮件联系
		</h3>
		<div class="flex items-center justify-center mb-4">
			<svg class="w-6 h-6 mr-3 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
			<a 
				href="mailto:taylor.ren@gmail.com"
				class="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
			>
				taylor.ren@gmail.com
			</a>
		</div>
		<p class="text-gray-600 dark:text-gray-300">
			欢迎通过邮件与我联系交流
		</p>
	</div>
</div>

<style>
	.container {
		animation: fadeIn 0.6s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	a:hover {
		transform: translateY(-2px);
	}
</style>