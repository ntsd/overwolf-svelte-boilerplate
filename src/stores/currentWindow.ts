import { atom } from 'nanostores';
import { logDebug } from './logLevel';

export const currentWindowInfoAtom = atom<overwolf.windows.WindowInfo | null>(null);

overwolf.windows.getCurrentWindow((result) => {
	if (result.success) {
		currentWindowInfoAtom.set(result.window);
		logDebug('[overwolf-nanostores] getCurrentWindow', JSON.stringify(result.window));
	}
});
