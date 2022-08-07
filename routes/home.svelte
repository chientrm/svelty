<script lang="ts">
	import string from '$lib/constants/string';
	export let name: string;
</script>

<p>{string.summary}</p>
<p>{name}</p>

<style>
	p {
		color: green;
	}
</style>
