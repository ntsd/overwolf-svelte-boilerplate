<script lang="ts">
	import { GAME_ID, REQUIRED_FEATURES, WINDOWS_NAME } from '../consts';
	import { getWindow } from '../utils/getWindow';
	import { runningGameAtom } from '../stores/runningGame';
	import { setGameEventRequiredFeatures } from '../stores/gameEvent';

	runningGameAtom.subscribe((runningGame) => {
		const isGameRunning = runningGame && runningGame.classId === GAME_ID.LOL_GAME;

		if (isGameRunning) {
			// set require event features
			setGameEventRequiredFeatures(REQUIRED_FEATURES);

			getWindow(WINDOWS_NAME.IN_GAME).then((window) => {
				window.restore();
			});
		} else {
			getWindow(WINDOWS_NAME.DESKTOP).then((window) => {
				window.restore();
			});
		}
	});
</script>
