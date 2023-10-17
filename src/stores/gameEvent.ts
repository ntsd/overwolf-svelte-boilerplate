import { atom } from 'nanostores';
import { logDebug, logError } from './logLevel';

const overwolfEvent = overwolf.games.events;
const REGISTER_RETRY_TIMEOUT = 10000;

export interface GameEventData<GameInfo, GameEvent> {
	info?: GameInfo;
	events?: GameEvent[];
}

export const requiredFeaturesAtom = atom<string[]>([]);
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

function registerToGepCallback({ success }: { success: boolean }) {
	if (success) {
		overwolfEvent.onInfoUpdates2.removeListener(handleGameEvent);
		overwolfEvent.onNewEvents.removeListener(handleGameEvent);

		overwolfEvent.onInfoUpdates2.addListener(handleGameEvent);
		overwolfEvent.onNewEvents.addListener(handleGameEvent);
		return;
	}

	// retry set required if failed
	logError(
		`[overwolf-nanostores] registerToGepCallback failed, retrying in ${REGISTER_RETRY_TIMEOUT}ms`
	);
	setTimeout(() => {
		overwolfEvent.setRequiredFeatures(requiredFeaturesAtom.get(), registerToGepCallback);
	}, REGISTER_RETRY_TIMEOUT);
}

export function setRequiredFeatures(requiredFeatures: string[]) {
	requiredFeaturesAtom.set(requiredFeatures);
	overwolfEvent.setRequiredFeatures(requiredFeatures, registerToGepCallback);
}
