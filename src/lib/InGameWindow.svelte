<script lang="ts">
	import { WINDOWS_NAME } from '../consts';
	import { setPositionFull } from '../utils/setWindowPosition';

	async function setFull() {
		await setPositionFull(WINDOWS_NAME.IN_GAME);
	}
	setFull();
</script>

<div>Test Ingame</div>
