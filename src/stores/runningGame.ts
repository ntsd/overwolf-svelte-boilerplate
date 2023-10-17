import { atom } from 'nanostores';
import { logDebug } from './logLevel';

export interface RunningGamePayload {
	gameRunning: boolean;
	id: number;
	title: string;
	gameChanged: boolean;
	isInFocus: boolean;
}

export const runningGameAtom = atom<RunningGamePayload | null>(null);

function onGameInfoUpdated(payload: overwolf.games.GameInfoUpdatedEvent) {
	const gameRunning: RunningGamePayload = {
		gameRunning: payload?.gameInfo?.isRunning ?? false,
		id: Math.round((payload?.gameInfo?.id || 0) / 10),
		title: payload?.gameInfo?.title || '',
		gameChanged: payload?.gameChanged || false,
		isInFocus: payload?.focusChanged || false
	};
	runningGameAtom.set({ ...gameRunning });
	logDebug('[overwolf-nanostores] onGameInfoUpdated', JSON.stringify(gameRunning));
}

function onGetRunningGameInfo(payload: overwolf.games.GetRunningGameInfoResult): void {
	const runningGameInfo = {
		gameChanged: runningGameAtom.get()?.gameChanged || false,
		id: Math.round((payload?.id || 0) / 10),
		title: payload?.title || '',
		gameRunning: payload?.isRunning ?? false,
		isInFocus: payload?.isInFocus ?? false
	};
	runningGameAtom.set({ ...runningGameInfo });
	logDebug('[overwolf-nanostores] onGetRunningGameInfo', JSON.stringify(runningGameInfo));
}

overwolf.games.getRunningGameInfo(onGetRunningGameInfo);
overwolf.games.onGameInfoUpdated.removeListener(onGameInfoUpdated);
overwolf.games.onGameInfoUpdated.addListener(onGameInfoUpdated);
