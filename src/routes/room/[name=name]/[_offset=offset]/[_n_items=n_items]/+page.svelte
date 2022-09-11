<script lang="ts">
	import { enhance } from '$app/forms';
	import strings from '$lib/constants/strings';
	import { afterUpdate } from 'svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let textInput: HTMLInputElement;
	afterUpdate(() => (textInput.value = ''));
</script>

<ul>
	{#each data.messages.items as message}
		<li>{message.user.github?.login}: {message.text}</li>
	{/each}
</ul>

<form method="POST" use:enhance>
	<label>
		<span>{strings.MESSAGE}</span>
		<input type="text" name="text" bind:this={textInput} required />
	</label>
	<input type="submit" value={strings.SEND} />
</form>
