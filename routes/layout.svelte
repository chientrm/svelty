<script>
	import href from '$lib/assets/images/favicon.svg';
	import routes from '$lib/constants/routes';
	import 'modern-normalize/modern-normalize.css';
	import './app.css';
</script>

<svelte:head>
	<title>Svelty</title>
	<link rel="icon" type="image/svg+xml" {href} />
</svelte:head>

<nav>
	<h1>Svelty</h1>
	<a href={routes.HOME}>Home</a>
	<a href={routes.ABOUT}>About</a>
</nav>

<slot />
