import { atom } from 'nanostores';
import { logDebug, logError } from './logLevel';

const launcherEvent = overwolf.games.launchers.events;
const REGISTER_RETRY_TIMEOUT = 10000; // 10s

export interface LauncherEventData<LauncherInfo, LauncherEvent> {
	info?: LauncherInfo;
	events?: LauncherEvent[];
}

export const launcherEventAtom = atom<unknown[]>([]);
export const launcherInfoAtom = atom<unknown>({});

function handleGameEvent({ info, events }: LauncherEventData<unknown, unknown>) {
	if (info) {
		launcherInfoAtom.set(info);
		logDebug('[overwolf-nanostores] launcherInfo', JSON.stringify(info));
	}
	if (events) {
		launcherEventAtom.set(events);
		logDebug('[overwolf-nanostores] launcherEvent', JSON.stringify(events));
	}
}

function getSetRequiredFeaturesCb(launcherClassId: number, requiredFeatures: string[]) {
	function setRequiredFeaturesCb(result: overwolf.games.events.SetRequiredFeaturesResult) {
		if (result.success) {
			launcherEvent.onInfoUpdates.removeListener(handleGameEvent);
			launcherEvent.onNewEvents.removeListener(handleGameEvent);

			launcherEvent.onInfoUpdates.addListener(handleGameEvent);
			launcherEvent.onNewEvents.addListener(handleGameEvent);
			return;
		}

		// retry set required if failed
		logError(
			`[overwolf-nanostores] registerEventListerner failed, retrying in ${REGISTER_RETRY_TIMEOUT}ms:`,
			result.error
		);
		setTimeout(() => {
			launcherEvent.setRequiredFeatures(
				launcherClassId,
				requiredFeatures,
				getSetRequiredFeaturesCb(launcherClassId, requiredFeatures)
			);
		}, REGISTER_RETRY_TIMEOUT);
	}
	return setRequiredFeaturesCb;
}

export function setLauncherRequiredFeatures(launcherClassId: number, requiredFeatures: string[]) {
	launcherEvent.setRequiredFeatures(
		launcherClassId,
		requiredFeatures,
		getSetRequiredFeaturesCb(launcherClassId, requiredFeatures)
	);
}
