<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';

	interface Props {
		title?: string;
		description?: string;
		keywords?: string;
		author?: string;
		image?: string;
		imageAlt?: string;
		type?: 'website' | 'article' | 'book' | 'profile';
		publishedTime?: string;
		modifiedTime?: string;
		section?: string;
		tags?: string[];
		isbn?: string;
		bookAuthor?: string;
		bookTitle?: string;
		noindex?: boolean;
		canonical?: string;
	}

	let {
		title = '',
		description = siteConfig.description,
		keywords = siteConfig.keywords,
		author = siteConfig.author,
		image = '/images/og-default.jpg',
		imageAlt = siteConfig.name,
		type = 'website',
		publishedTime,
		modifiedTime,
		section,
		tags = [],
		isbn,
		bookAuthor,
		bookTitle,
		noindex = false,
		canonical
	}: Props = $props();

	// Site defaults
	const siteName = siteConfig.name;
	const siteUrl = siteConfig.url;
	
	// Construct full title
	const fullTitle = title ? `${title} | ${siteName}` : siteName;
	
	// Construct full URL for current page
	const currentUrl = canonical || `${siteUrl}${$page.url.pathname}`;
	
	// Construct full image URL
	const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
	
	// Combine keywords
	const allKeywords = [...new Set([...keywords.split(','), ...tags])].join(',');
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={allKeywords} />
	<meta name="author" content={author} />
	<meta name="language" content="zh-CN" />
	
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}
	
	<!-- Canonical URL -->
	<link rel="canonical" href={currentUrl} />
	
	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="zh_CN" />
	
	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}
	
	{#if modifiedTime}
		<meta property="article:modified_time" content={modifiedTime} />
	{/if}
	
	{#if section}
		<meta property="article:section" content={section} />
	{/if}
	
	{#each tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
	
	{#if bookAuthor}
		<meta property="book:author" content={bookAuthor} />
	{/if}
	
	{#if isbn}
		<meta property="book:isbn" content={isbn} />
	{/if}
	
	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImageUrl} />
	<meta name="twitter:image:alt" content={imageAlt} />
	
	<!-- Additional Meta Tags -->
	<meta name="theme-color" content="#f59e0b" />
	<meta name="msapplication-TileColor" content="#f59e0b" />
	
	<!-- Schema.org Structured Data -->
	{#if type === 'book' && bookTitle && bookAuthor}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Book",
				"name": bookTitle,
				"author": {
					"@type": "Person",
					"name": bookAuthor
				},
				"description": description,
				"url": currentUrl,
				...(isbn && { "isbn": isbn }),
				...(image && { "image": fullImageUrl })
			})}
		</script>
	{:else if type === 'article'}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Article",
				"headline": title,
				"description": description,
				"author": {
					"@type": "Person",
					"name": author
				},
				"publisher": {
					"@type": "Organization",
					"name": siteName
				},
				"url": currentUrl,
				...(publishedTime && { "datePublished": publishedTime }),
				...(modifiedTime && { "dateModified": modifiedTime }),
				...(image && { "image": fullImageUrl })
			})}
		</script>
	{:else}
		<script type="application/ld+json">
			{JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				"name": siteName,
				"description": description,
				"url": siteUrl,
				"author": {
					"@type": "Person",
					"name": author
				}
			})}
		</script>
	{/if}
</svelte:head>