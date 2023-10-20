<script lang="ts">
	import { WINDOWS_NAMES } from '../consts';
	import { currentWindowInfoAtom } from '../stores/currentWindow';
	import { setLogLevel } from '../stores/logLevel';
	import BackgroundWindow from './BackgroundWindow.svelte';
	import DesktopWindow from './DesktopWindow.svelte';
	import InGameWindow from './InGameWindow.svelte';

	// remove this in production to not display debug log
	setLogLevel('debug');
</script>

{#if $currentWindowInfoAtom}
	{#if $currentWindowInfoAtom.name === WINDOWS_NAMES.BACKGROUND}
		<BackgroundWindow />
	{:else if $currentWindowInfoAtom.name === WINDOWS_NAMES.DESKTOP}
		<DesktopWindow />
	{:else if $currentWindowInfoAtom.name === WINDOWS_NAMES.IN_GAME}
		<InGameWindow />
	{:else}
		<div>Not any page</div>
	{/if}
{/if}
