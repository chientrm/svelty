<script>
	import routes from '$lib/constants/routes';
	import strings from '$lib/constants/strings';
	import { PUBLIC_GITHUB_CLIENT_ID } from '$env/static/public';
	import GithubCircle from 'svelte-material-icons/GithubCircle.svelte';
	const scope = ['user:email', 'read:user'].join(' ');
</script>

<section>
	<p>
		<a
			href={routes.GITHUB.AUTHORIZE({
				client_id: PUBLIC_GITHUB_CLIENT_ID,
				scope
			})}
		>
			{strings.CONTINUE_WITH_GITHUB}
			<GithubCircle />
		</a>
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
