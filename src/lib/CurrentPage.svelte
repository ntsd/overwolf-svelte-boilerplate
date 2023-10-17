<script lang="ts">
	import { WINDOWS_NAME } from '../consts';
	import { currentWindowInfoAtom } from '../stores/currentWindow';
	import BackgroundWindow from './BackgroundWindow.svelte';
	import DesktopWindow from './DesktopWindow.svelte';
</script>

{#if $currentWindowInfoAtom}
	{#if $currentWindowInfoAtom.name === WINDOWS_NAME.BACKGROUND}
		<BackgroundWindow />
	{:else if $currentWindowInfoAtom.name === WINDOWS_NAME.DESKTOP}
		<DesktopWindow />
	{:else}
		<div>Not running</div>
	{/if}
{/if}
