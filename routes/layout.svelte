<script>
	import href from '$lib/assets/images/favicon.svg';
	import routes from '$lib/constants/routes';
	import string from '$lib/constants/string';
	import 'modern-normalize/modern-normalize.css';
	import './app.css';
</script>

<svelte:head>
	<title>{string.title}</title>
	<link rel="icon" type="image/svg+xml" {href} />
</svelte:head>

<nav>
	<h1>{string.title}</h1>
	<a href={routes.HOME}>{string.routes.home}</a>
	<a href={routes.ABOUT}>{string.routes.about}</a>
</nav>

<slot />
