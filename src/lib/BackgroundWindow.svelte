<script lang="ts">
	import { GAME_ID, REQUIRED_FEATURES, WINDOWS_NAME } from '../consts';
	import { getWindow } from '../utils/getWindow';
	import { setLauncherRequiredFeatures } from '../stores/launcherEvent';
	import { runningLaunchersMap } from '../stores/runningLaunchers';

	runningLaunchersMap.subscribe((runningLaunchers) => {
		Object.values(runningLaunchers).forEach((launcher) => {
			const launcherRunning = launcher.classId === GAME_ID.LOL_LAUNCHER;

			if (launcherRunning) {
				setLauncherRequiredFeatures(launcher.classId, REQUIRED_FEATURES);
				getWindow(WINDOWS_NAME.DESKTOP).then((window) => {
					window.restore();
				});
			}
		});
	});
</script>
