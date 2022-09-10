<script>
	import inputs from '$lib/constants/inputs';
	import { enhance } from '$app/forms';
	import strings from '$lib/constants/strings';
</script>

<form method="POST" use:enhance>
	<label>
		<span>{strings.LABEL_TITLE}</span>
		<input
			type="text"
			name="name"
			required
			pattern={inputs.NAME.PATTERN}
			title={inputs.NAME.TITLE}
			placeholder={strings.TITLE_PLACEHOLDER}
			minlength="5"
			maxlength="64"
		/>
	</label>
	<input type="submit" value={strings.NEW} />
</form>
