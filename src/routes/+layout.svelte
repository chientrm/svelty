<script lang="ts">
	import { page } from '$app/stores';
	import Anchor from '$lib/components/Anchor.svelte';
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import image from '$lib/images/image.png';
	import 'modern-normalize/modern-normalize.css';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';
	const gsiteVerification = 'gG8WXVPtqVVAJlnJb5v0LlC0-HBSCVSWsVqa7KHwTPA';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>{strings.TITLE}</title>
	<meta name="description" content={strings.DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={strings.TITLE} />
	<meta property="og:description" content={strings.DESCRIPTION} />
	<meta property="og:image" content={`${$page.url.origin}${image}`} />
	<meta property="og:image:width" content="120" />
	<meta property="og:image:height" content="120" />
	<meta property="og:url" content={$page.url.origin} />
	<meta property="og:site_name" content={strings.SVELTY} />
	<meta property="keywords" content={strings.KEYWORDS.join(', ')} />
	<meta name="google-site-verification" content={gsiteVerification} />
</svelte:head>

<header>
	<h2><Anchor href={routes.HOME}>{strings.SVELTY}</Anchor></h2>
	<nav>
		{#if data.user}
			{#if data.user.github}
				<a href={data.user.github.html_url} target="_blank">
					{data.user.github.login}
					(<GithubCircle />)
				</a>
			{/if}
			<a href={routes.LOGOUT}>{strings.LOGOUT}</a>
		{:else}
			<Anchor href={routes.LOGIN}>{strings.LOGIN}</Anchor>
		{/if}
	</nav>
</header>

<main>
	<div>
		<slot />
	</div>
</main>

<style>
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 2em;
	}
	main {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	div {
		width: 52em;
		border: 1px dashed #676778;
		padding: 1em;
	}
</style>
