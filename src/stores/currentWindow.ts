import { atom } from 'nanostores';
import { logDebug } from './logLevel';

export const currentWindowInfoAtom = atom<overwolf.windows.WindowInfo | null>(null);

export function updateCurrentWindow() {
	overwolf.windows.getCurrentWindow((result) => {
		if (result.success) {
			currentWindowInfoAtom.set(result.window);
			logDebug('[overwolf-nanostores] getCurrentWindow', JSON.stringify(result.window));
		}
	});
}

updateCurrentWindow();
