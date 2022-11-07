<template>
	<pre>{{ state }}</pre>
	<div class="btn-group">
		<button
			class="btn btn-secondary dropdown-toggle"
			type="button"
			data-bs-toggle="dropdown"
			data-bs-auto-close="outside"
			aria-expanded="false"
		>
			Playlists
			<span v-for="sel in selectedPlaylists" class="badge bg-info mx-1">{{ sel.name }}</span>
		</button>
		<ul class="dropdown-menu">
			<li @click="checkAll" class="px-5 dropdown-item form-check">
				<label class="form-check-label nosel">Select All</label>
			</li>
			<li
				v-for="playlist in state.playlists"
				@click="playlist.checked = !playlist.checked"
				class="px-4 dropdown-item"
			>
				<font-awesome-icon
					:icon="['fa-regular', playlist.checked ? 'fa-square-check' : 'fa-square']"
					size="lg"
				/>
				<label class="form-check-label px-3 nosel">{{ playlist.name }}</label>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { computed, reactive } from 'vue';

const state = reactive({
	playlists: [
		{ name: 'Watchlist', checked: false },
		{ name: 'Aboniert', checked: false },
		{ name: 'Some other', checked: false },
		{ name: 'Random List', checked: false },
	],
});

const selectedPlaylists = computed(() => {
	return state.playlists.filter((e) => e.checked);
});

function checkAll(event) {
	const checked = Boolean(state.playlists.find((e) => !e.checked));
	state.playlists = state.playlists.map((e) => ({ ...e, checked }));
}
</script>
<style>
.nosel {
	user-select: none;
}
</style>
