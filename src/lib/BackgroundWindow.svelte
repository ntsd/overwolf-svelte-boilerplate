<script lang="ts">
	import { GAME_ID, REQUIRED_FEATURES, WINDOWS_NAME } from '../consts';
	import { setRequiredFeatures } from '../stores/gameEvent';
	import { getWindow } from '../stores/getWindow';
	import { runningGameAtom } from '../stores/runningGame';

	runningGameAtom.subscribe((currentGame) => {
		console.log('currentGame', currentGame);
		const gameRunning =
			currentGame?.id === GAME_ID.LOL_LAUNCHER &&
			(currentGame?.gameRunning || currentGame?.gameChanged);

		console.log('gameRunning', gameRunning);
		
		if (gameRunning) {
			setRequiredFeatures(REQUIRED_FEATURES);
			getWindow(WINDOWS_NAME.IN_GAME).then((window) => {
				window.restore();
			});
		}
	});
</script>
