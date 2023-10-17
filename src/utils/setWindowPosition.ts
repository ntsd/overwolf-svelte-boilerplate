export async function setWindowPosition(windowId: string, left: number, top: number) {
	overwolf.windows.changePosition(windowId, left, top);
}
