<script>
	export let components;
	export let data;
</script>

{#if components.length >= 1}
	{#if components.length > 1}
		<svelte:component this={components[0]} {...data}>
			<svelte:self components={components.slice(1)} {data} />
		</svelte:component>
	{:else}
		<svelte:component this={components[0]} {...data} />
	{/if}
{/if}
