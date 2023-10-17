<script lang="ts">
	import { GITHUB_LINK, WINDOWS_NAME } from '../consts';
	import { getWindow } from '../utils/getWindow';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header class="header" on:mousedown={() => {}} on:mousemove={() => {}}>
	<h3 class="header-title">LoL Auto Accept</h3>
	<div class="window-controls-group">
		<button
			class="icon window-control"
			on:click={() => (window.location.href = 'overwolf://settings')}
		>
			<svg viewBox="0 0 30 30">
				<path
					d="M22,16.3V13.7H19.81a4.94,4.94,0,0,0-.49-1.18L20.87,11,19,9.13l-1.55,1.55a5,5,0,0,0-1.18-.49V8H13.7v2.19a5,5,0,0,0-1.18.49L11,9.13,9.13,11l1.55,1.55a5,5,0,0,0-.49,1.18H8v2.6h2.19a5,5,0,0,0,.49,1.18L9.13,19,11,20.87l1.55-1.55a4.94,4.94,0,0,0,1.18.49V22h2.6V19.81a4.94,4.94,0,0,0,1.18-.49L19,20.87,20.87,19l-1.55-1.55a4.94,4.94,0,0,0,.49-1.18Zm-7,1.45A2.75,2.75,0,1,1,17.75,15,2.75,2.75,0,0,1,15,17.75Z"
					fill="currentcolor"
				/>
			</svg>
		</button>
		<button
			class="icon window-control"
			on:click={() => overwolf.utils.openUrlInDefaultBrowser(GITHUB_LINK)}
		>
			<svg viewBox="0 0 30 30">
				<rect x="13.5" y={19} width={2} height={2} fill="currentcolor" />
				<path
					d="M16.5,9H12v1h4.5A1.5,1.5,0,0,1,18,11.5v1A1.5,1.5,0,0,1,16.5,14H14v3h1V15h1.5A2.5,2.5,0,0,0,19,12.5v-1A2.5,2.5,0,0,0,16.5,9Z"
					fill="currentcolor"
				/>
			</svg>
		</button>
		<button
			class="icon window-control"
			on:click={() => {
				getWindow(WINDOWS_NAME.DESKTOP).then((w) => {
					w.minimize();
				});
			}}
		>
			<svg viewBox="0 0 30 30">
				<line x1={10} y1="19.5" x2={20} y2="19.5" fill="none" stroke="currentcolor" />
			</svg>
		</button>
		<button
			class="icon window-control window-control-close"
			on:click={() => {
				getWindow(WINDOWS_NAME.BACKGROUND).then((w) => {
					w.close();
				});
			}}
		>
			<svg viewBox="0 0 30 30">
				<line x1="19.5" y1="10.5" x2="10.5" y2="19.5" fill="none" stroke="currentcolor" />
				<line x1="10.5" y1="10.5" x2="19.5" y2="19.5" fill="none" stroke="currentcolor" />
			</svg>
		</button>
	</div>
</header>
<div class="container">test</div>

<style>
	button {
		padding: 0;
		border: none;
	}
	button:focus {
		outline: none;
	}
	.icon {
		position: relative;
		width: 30px;
		height: 30px;
		transition: 0.15s;
	}
	.icon svg {
		width: 100%;
		height: 100%;
	}
	.header {
		display: flex;
		height: 5vh;
		background-color: #131313;
	}
	.header-title {
		color: #ffffff;
		margin-left: 5px;
		margin-top: 3px;
	}

	.window-controls-group {
		margin-left: auto;
		display: flex;
		--color: #a8a8a8;
		--color-hover: #dedede;
		--bg-color-hover: #272727;
	}

	.window-control {
		color: var(--color);
		background-color: transparent;
	}
	.window-control:hover,
	.window-control:active {
		color: var(--color-hover);
		background-color: var(--bg-color-hover);
	}
	.window-control-close {
		--color-hover: #dedede;
		--bg-color-hover: #c21913;
	}
</style>
