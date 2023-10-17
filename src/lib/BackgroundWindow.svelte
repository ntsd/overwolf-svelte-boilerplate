<script lang="ts">
	import { GAME_ID, REQUIRED_FEATURES, WINDOWS_NAME } from '../consts';
	import { setRequiredFeatures } from '../stores/gameEvent';
	import { getWindow } from '../stores/getWindow';
	import { runningGameAtom } from '../stores/runningGame';

	runningGameAtom.subscribe((currentGame) => {
		const gameRunning =
			currentGame?.id === GAME_ID.LOL_GAME &&
			(currentGame?.gameRunning || currentGame?.gameChanged);

		if (gameRunning) {
			setRequiredFeatures(REQUIRED_FEATURES);
			getWindow(WINDOWS_NAME.IN_GAME).then((window) => {
				window.restore();
			});
		}
	});
</script>

Test Background
