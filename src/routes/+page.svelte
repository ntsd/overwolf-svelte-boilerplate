<script>
	// load mock if env === 'development'
	import '../overwolf.dev.mock';
	// import global style and tailwindcss
	import '../app.css';
	
	import CurrentPage from '$lib/CurrentPage.svelte';
</script>

<CurrentPage />
