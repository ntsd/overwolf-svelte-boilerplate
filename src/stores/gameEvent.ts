import { atom } from 'nanostores';
import { logDebug, logError } from './logLevel';

const gamesEvent = overwolf.games.events;
const REGISTER_RETRY_TIMEOUT = 10000;

export interface GameEventData<GameInfo, GameEvent> {
	info?: GameInfo;
	events?: GameEvent[];
}

export const gameEventRequiredFeaturesAtom = atom<string[]>([]);
export const gameEventAtom = atom<unknown[]>([]);
export const gameInfoAtom = atom<unknown>({});

function handleGameEvent({ info, events }: GameEventData<unknown, unknown>) {
	if (info) {
		gameInfoAtom.set(info);
		logDebug('[overwolf-nanostores] gameInfo', JSON.stringify(info));
	}
	if (events) {
		gameEventAtom.set(events);
		logDebug('[overwolf-nanostores] gameEvent', JSON.stringify(events));
	}
}

function registerToGepCallback(result: overwolf.games.events.SetRequiredFeaturesResult) {
	if (result.success) {
		gamesEvent.onInfoUpdates2.removeListener(handleGameEvent);
		gamesEvent.onNewEvents.removeListener(handleGameEvent);

		gamesEvent.onInfoUpdates2.addListener(handleGameEvent);
		gamesEvent.onNewEvents.addListener(handleGameEvent);
		return;
	}

	// retry set required if failed
	logError(
		`[overwolf-nanostores] registerToGepCallback failed, retrying in ${REGISTER_RETRY_TIMEOUT}ms:`,
		result.error
	);
	setTimeout(() => {
		gamesEvent.setRequiredFeatures(gameEventRequiredFeaturesAtom.get(), registerToGepCallback);
	}, REGISTER_RETRY_TIMEOUT);
}

export function setGameEventRequiredFeatures(requiredFeatures: string[]) {
	gameEventRequiredFeaturesAtom.set(requiredFeatures);
	gamesEvent.setRequiredFeatures(requiredFeatures, registerToGepCallback);
}
