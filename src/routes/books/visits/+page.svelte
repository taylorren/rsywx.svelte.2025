<script lang="ts">
	import { onMount } from 'svelte';

	// Navigation items for visit records
	const navItems = [
		{ id: 'recent-visits', label: '最近访问记录', icon: '🕒' },
		{ id: 'popular-books', label: '热门书籍', icon: '�' }, 
		{ id: 'unpopular-books', label: '冷门书籍', icon: '❄️' },
		{ id: 'last-visited', label: '最近访问的书籍', icon: '👁️' },
		{ id: 'forgotten-books', label: '被遗忘的书籍', icon: '💤' }
	];

	interface VisitHistoryData {
		date: string;
		visit_count: number;
		day_of_week: string;
	}

	interface PeriodInfo {
		start_date: string;
		end_date: string;
		total_days: number;
		total_visits: number;
	}

	let activeTab = $state('recent-visits');
	let visitHistory: VisitHistoryData[] = $state([]);
	let periodInfo: PeriodInfo | null = $state(null);
	let loading = $state(false);
	let error = $state('');
	let selectedDays = $state(30);

	function setActiveTab(tabId: string) {
		activeTab = tabId;
		if (tabId === 'recent-visits' && visitHistory.length === 0) {
			fetchVisitHistory();
		}
	}

	async function fetchVisitHistory() {
		loading = true;
		error = '';
		
		try {
			const response = await fetch(`/api/v1/books/visit_history?days=${selectedDays}`);
			const result = await response.json();
			
			if (result.success) {
				visitHistory = result.data || [];
				periodInfo = result.period_info || null;
			} else {
				error = '获取访问记录失败';
			}
		} catch (err) {
			error = '网络错误，请稍后重试';
			console.error('Error fetching visit history:', err);
		} finally {
			loading = false;
		}
	}

	function handleDaysChange(days: number) {
		selectedDays = days;
		fetchVisitHistory();
	}

	// Chart calculations
	function getChartData() {
		const chartWidth = 800;
		const chartHeight = 300;
		const padding = 40;
		
		if (visitHistory.length === 0) {
			return { points: '', maxVisits: 0, minVisits: 0, chartWidth, chartHeight, padding };
		}
		
		const maxVisits = Math.max(...visitHistory.map(d => d.visit_count));
		const minVisits = Math.min(...visitHistory.map(d => d.visit_count));
		
		const points = visitHistory.map((data, index) => {
			const x = padding + (index / (visitHistory.length - 1)) * (chartWidth - 2 * padding);
			const y = chartHeight - padding - ((data.visit_count - minVisits) / (maxVisits - minVisits || 1)) * (chartHeight - 2 * padding);
			return `${x},${y}`;
		}).join(' ');
		
		return { points, maxVisits, minVisits, chartWidth, chartHeight, padding };
	}

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
	}

	function formatNumber(num: number) {
		return num.toLocaleString('zh-CN');
	}

	onMount(() => {
		if (activeTab === 'recent-visits') {
			fetchVisitHistory();
		}
	});
</script>

<svelte:head>
	<title>访问记录 | 任氏有无轩</title>
	<meta name="description" content="书籍访问记录和统计信息" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">📊 访问记录</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300">书籍访问记录和统计信息</p>
	</div>

	<div class="flex gap-6">
		<!-- Left Navigation Panel -->
		<div class="w-64 shrink-0">
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
				<div class="p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">统计类型</h2>
				</div>
				<nav class="p-2">
					{#each navItems as item}
						<button
							onclick={() => setActiveTab(item.id)}
							class="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors {activeTab === item.id 
								? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
								: 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}"
						>
							<span class="text-lg">{item.icon}</span>
							<span class="text-sm font-medium">{item.label}</span>
						</button>
					{/each}
				</nav>
			</div>
		</div>

		<!-- Right Content Panel -->
		<div class="flex-1 min-w-0">
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
				<div class="p-6 border-b border-gray-200 dark:border-gray-700">
					{#if activeTab === 'recent-visits'}
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							🕒 最近访问记录
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">显示最近的书籍访问记录</p>
					{:else if activeTab === 'popular-books'}
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							🔥 热门书籍
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">按访问次数排序的热门书籍</p>
					{:else if activeTab === 'unpopular-books'}
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							❄️ 冷门书籍
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">访问次数较少的冷门书籍</p>
					{:else if activeTab === 'last-visited'}
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							👁️ 最近访问的书籍
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">按最近访问时间排序的书籍</p>
					{:else if activeTab === 'forgotten-books'}
						<h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							💤 被遗忘的书籍
						</h2>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">很久没有访问的书籍</p>
					{/if}
				</div>
				
				<div class="p-6">
					{#if activeTab === 'recent-visits'}
						<!-- Visit History Chart -->
						<div class="mb-6">
							<div class="mb-4">
								<div class="flex items-center gap-4">
									<label for="days-select" class="text-sm font-medium text-gray-700 dark:text-gray-300">时间范围：</label>
									<select 
										id="days-select"
										bind:value={selectedDays} 
										onchange={() => handleDaysChange(selectedDays)}
										class="rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									>
										<option value={7}>最近7天</option>
										<option value={30}>最近30天</option>
										<option value={90}>最近90天</option>
										<option value={180}>最近180天</option>
										<option value={365}>最近一年</option>
									</select>
								</div>
							</div>

							{#if loading}
								<div class="flex items-center justify-center h-80 bg-gray-50 dark:bg-gray-700 rounded-lg">
									<div class="text-center">
										<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
										<p class="text-sm text-gray-500 dark:text-gray-400">加载中...</p>
									</div>
								</div>
							{:else if error}
								<div class="flex items-center justify-center h-80 bg-red-50 dark:bg-red-900/20 rounded-lg">
									<div class="text-center">
										<p class="text-red-600 dark:text-red-400 mb-2">{error}</p>
										<button 
											onclick={fetchVisitHistory}
											class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline"
										>
											重试
										</button>
									</div>
								</div>
							{:else if visitHistory.length > 0}
								{@const chartData = getChartData()}
								<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
									<svg width="100%" height="320" viewBox="0 0 {chartData.chartWidth} {chartData.chartHeight}" class="overflow-visible">
										<!-- Grid lines -->
										{#each Array(5) as _, i}
											{@const y = chartData.padding + (i / 4) * (chartData.chartHeight - 2 * chartData.padding)}
											<line 
												x1={chartData.padding} 
												y1={y} 
												x2={chartData.chartWidth - chartData.padding} 
												y2={y} 
												stroke="#e5e7eb" 
												stroke-width="1"
												class="dark:stroke-gray-600"
											/>
											<text 
												x={chartData.padding - 10} 
												y={y + 4} 
												text-anchor="end" 
												class="text-xs fill-gray-500 dark:fill-gray-400"
											>
												{Math.round(chartData.maxVisits - (i / 4) * (chartData.maxVisits - chartData.minVisits))}
											</text>
										{/each}

										<!-- Chart line -->
										<polyline 
											points={chartData.points} 
											fill="none" 
											stroke="#3b82f6" 
											stroke-width="2"
											class="drop-shadow-sm"
										/>

										<!-- Data points -->
										{#each visitHistory as data, index}
											{@const x = chartData.padding + (index / (visitHistory.length - 1)) * (chartData.chartWidth - 2 * chartData.padding)}
											{@const y = chartData.chartHeight - chartData.padding - ((data.visit_count - chartData.minVisits) / (chartData.maxVisits - chartData.minVisits || 1)) * (chartData.chartHeight - 2 * chartData.padding)}
											<circle 
												cx={x} 
												cy={y} 
												r="4" 
												fill="#3b82f6"
												class="hover:r-6 transition-all cursor-pointer"
											>
												<title>{formatDate(data.date)}: {data.visit_count} 次访问</title>
											</circle>
										{/each}

										<!-- X-axis labels -->
										{#each visitHistory.filter((_, i) => i % Math.ceil(visitHistory.length / 8) === 0) as data, index}
											{@const originalIndex = visitHistory.findIndex(d => d.date === data.date)}
											{@const x = chartData.padding + (originalIndex / (visitHistory.length - 1)) * (chartData.chartWidth - 2 * chartData.padding)}
											<text 
												x={x} 
												y={chartData.chartHeight - 10} 
												text-anchor="middle" 
												class="text-xs fill-gray-500 dark:fill-gray-400"
											>
												{formatDate(data.date)}
											</text>
										{/each}
									</svg>
								</div>

								<!-- Summary stats -->
								{#if periodInfo}
									<div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
										<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(periodInfo.total_visits)}</div>
											<div class="text-sm text-blue-600 dark:text-blue-400">总访问量</div>
										</div>
										<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(Math.round(periodInfo.total_visits / periodInfo.total_days))}</div>
											<div class="text-sm text-blue-600 dark:text-blue-400">日均访问</div>
										</div>
										<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(chartData.maxVisits)}</div>
											<div class="text-sm text-blue-600 dark:text-blue-400">最高单日</div>
										</div>
										<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
											<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(periodInfo.total_days)}</div>
											<div class="text-sm text-blue-600 dark:text-blue-400">统计天数</div>
										</div>
									</div>
								{/if}
							{:else}
								<div class="text-center py-12">
									<div class="mb-4">
										<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
										</svg>
									</div>
									<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">暂无访问记录</h3>
									<p class="text-gray-500 dark:text-gray-400">选择的时间范围内没有访问记录</p>
								</div>
							{/if}
						</div>
					{:else}
						<!-- Other tabs placeholder -->
						<div class="text-center py-12">
							<div class="mb-4">
								<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
							</div>
							<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">内容开发中</h3>
							<p class="text-gray-500 dark:text-gray-400">此功能的具体内容正在开发中</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>