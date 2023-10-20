<script lang="ts">
	import { GAME_ID, WINDOWS_NAMES } from '../consts';
	import { getWindow } from '../utils/getWindow';
	import { runningGameAtom } from 'overwolf-nanostores';

	runningGameAtom.subscribe((runningGame) => {
		const isGameRunning = runningGame && runningGame.classId === GAME_ID.LOL_GAME;

		if (isGameRunning) {
			getWindow(WINDOWS_NAMES.IN_GAME).then((window) => {
				window.restore();
			});
		} else {
			getWindow(WINDOWS_NAMES.DESKTOP).then((window) => {
				window.restore();
			});
		}
	});
</script>
