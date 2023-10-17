export async function setWindowFullScreen(windowId: string) {
	const gameRes = await getGameResolution();

	if (gameRes === null) {
		return;
	}

	overwolf.windows.changeSize(windowId, gameRes.width, gameRes.height);
	overwolf.windows.changePosition(windowId, 0, 0);
}

export async function getGameResolution(): Promise<{
	width: number;
	height: number;
}> {
	return new Promise((resolve, reject) => {
		overwolf.games.getRunningGameInfo((result) => {
			if (result && result.width) {
				resolve({
					width: result.width,
					height: result.height
				});
				return;
			}

			reject(null);
		});
	});
}
