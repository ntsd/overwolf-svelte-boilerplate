import { map } from 'nanostores';
import { logDebug } from './logLevel';

export const runningLaunchersMap = map<{
	[windowId: string]: overwolf.games.launchers.LauncherInfo;
}>({});

function onLauncherInfoUpdated(payload: overwolf.games.launchers.UpdatedEvent) {
	runningLaunchersMap.setKey(payload.info.classId, payload.info);
	logDebug('[overwolf-nanostores] onLauncherInfoUpdated', JSON.stringify(payload));
}

function onGetRunningLauncherInfo(
	payload: overwolf.games.launchers.GetRunningLaunchersInfoResult
): void {
	if (payload.success) {
		payload.launchers.forEach((launcher) => {
			runningLaunchersMap.setKey(launcher.classId, launcher);
		});
	}
	logDebug('[overwolf-nanostores] onGetRunningLauncherInfo', JSON.stringify(payload));
}

overwolf.games.launchers.getRunningLaunchersInfo(onGetRunningLauncherInfo);
overwolf.games.launchers.events.onInfoUpdates.removeListener(onLauncherInfoUpdated);
overwolf.games.launchers.events.onInfoUpdates.addListener(onLauncherInfoUpdated);
