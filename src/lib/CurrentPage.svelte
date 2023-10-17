<script lang="ts">
	import { WINDOWS_NAME } from '../consts';
	import { currentWindowInfoAtom } from '../stores/currentWindow';
	import BackgroundWindow from './BackgroundWindow.svelte';
	import InGameWindow from './InGameWindow.svelte';
</script>

{#if $currentWindowInfoAtom}
	{#if $currentWindowInfoAtom.id === WINDOWS_NAME.BACKGROUND}
		<BackgroundWindow />
	{:else if $currentWindowInfoAtom.id === WINDOWS_NAME.IN_GAME}
		<InGameWindow />
	{/if}
{/if}
