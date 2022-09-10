// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: Svelty.User;
	}
	// interface PageData {}
	// interface PageError {}
	// interface Platform {}
}

declare namespace Svelty {
	interface User {
		github?: GithubUser;
	}
	interface GithubUser {
		login: string;
		email: string;
		html_url: string;
		id: number;
		name: string;
	}
}
