<script>
	import strings from '$lib/constants/strings';
	import routes from '$lib/constants/routes';
	import Anchor from '$lib/components/Anchor.svelte';
</script>

<nav>
	<h3><Anchor href={routes.ROOM.LIST}>{strings.ROOMS}</Anchor></h3>
	<Anchor href={routes.ROOM.NEW}>{strings.NEW_ROOM}</Anchor>
</nav>

<slot />
