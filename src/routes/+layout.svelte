<script lang="ts">
	import strings from '$lib/constants/strings';
	import image from '$lib/images/image.png';
	import { page } from '$app/stores';
	const gsiteVerification = 'gG8WXVPtqVVAJlnJb5v0LlC0-HBSCVSWsVqa7KHwTPA';
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

<slot />
