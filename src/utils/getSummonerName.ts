export function getSummonerName(retry = 0): Promise<string> {
	return new Promise((resolve, reject) => {
		overwolf.games.launchers.events.getInfo(10902, (info) => {
			if (info.success) {
				resolve(info.res.summoner_info.display_name);
			} else {
				if (retry > 3) {
					reject(new Error('Failed to get summoner name'));
				}
				setTimeout(() => {
					console.log('Failed to get summoner name, trying again in 2s');
					resolve(getSummonerName(retry + 1));
				}, 2000);
			}
		});
	});
}
