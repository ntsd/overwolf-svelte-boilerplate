export async function setWindowSize(windowId: string, width: number, height: number) {
	overwolf.windows.changeSize(windowId, width, height);
}
