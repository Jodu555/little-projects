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
			<span v-for="sel in selectedPlaylists" class="badge bg-primary mx-1">{{ sel.name }}</span>
		</button>
		<ul class="dropdown-menu">
			<li @click="checkAll" class="px-5 dropdown-item form-check">
				<label class="form-check-label">Select All</label>
			</li>
			<li
				v-for="playlist in state.playlists"
				@click="playlist.checked = !playlist.checked"
				class="px-5 dropdown-item"
			>
				<label class="form-check-label">{{ playlist }}</label>
			</li>
		</ul>
	</div>
</template>
<script setup>
import { computed, reactive, watch } from 'vue';

const state = reactive({
	playlists: [
		{ name: 'Watchlist', checked: false },
		{ name: 'Aboniert', checked: false },
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
<style lang=""></style>
