import { atom } from 'nanostores';
import { logDebug } from './logLevel';

export interface RunningLauncherPayload {
	id: number;
	title: string;
	isInFocus: boolean;
}

export const runningLauncherAtom = atom<RunningLauncherPayload | null>(null);

function onLauncherInfoUpdated(payload: overwolf.games.launchers.UpdatedEvent) {
	logDebug('[overwolf-nanostores] onLauncherInfoUpdated', JSON.stringify(payload));
	const gameRunning: RunningLauncherPayload = {
		id: Math.round((payload.info?.id || 0) / 10),
		title: payload.info?.title || '',
		isInFocus: payload.info?.isInFocus || false
	};
	runningLauncherAtom.set({ ...gameRunning });
}

function onGetRunningLauncherInfo(
	payload: overwolf.games.launchers.GetRunningLaunchersInfoResult
): void {
	if (payload.success) {
		payload.launchers.forEach((launcher) => {
			console.log('launcher', launcher);
		});
	}
	// const runningLauncherInfo: RunningLauncherPayload = {
	// 	gameChanged: runningGameAtom.get()?.gameChanged || false,
	// 	id: Math.round((payload?.launchers || 0) / 10),
	// 	title: payload?.title || '',
	// 	gameRunning: payload?.isRunning ?? false,
	// 	isInFocus: payload?.isInFocus ?? false
	// };
	// runningLauncherAtom.set({ ...runningLauncherInfo });
	// logDebug('[overwolf-nanostores] onGetRunningLauncherInfo', JSON.stringify(runningLauncherInfo));
}

overwolf.games.launchers.getRunningLaunchersInfo(onGetRunningLauncherInfo);
overwolf.games.launchers.events.onInfoUpdates.removeListener(onLauncherInfoUpdated);
overwolf.games.launchers.events.onInfoUpdates.addListener(onLauncherInfoUpdated);
