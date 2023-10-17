<script lang="ts">
	import { WINDOWS_NAME } from '../consts';
	import { currentWindowInfoAtom } from '../stores/currentWindow';
	import BackgroundWindow from './BackgroundWindow.svelte';
	import InGameWindow from './InGameWindow.svelte';
</script>

{#if $currentWindowInfoAtom}
	{#if $currentWindowInfoAtom.name === WINDOWS_NAME.BACKGROUND}
		<BackgroundWindow />
	{:else if $currentWindowInfoAtom.name === WINDOWS_NAME.IN_GAME}
		<InGameWindow />
	{:else}
		<div>Not running</div>
	{/if}
{/if}
