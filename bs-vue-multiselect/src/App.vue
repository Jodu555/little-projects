<template>
	<div>
		<header>
			<!-- place navbar here -->
		</header>

		<main class="container mt-4">
			<MultiSelect :playlists="state.playlists" :checkAll="checkAll" />
		</main>

		<footer>
			<!-- place footer here -->
		</footer>
	</div>
</template>
<script setup>
import { reactive } from 'vue';
import MultiSelect from '@/components/MultiSelect.vue';

const state = reactive({
	playlists: [
		{ name: 'Watchlist', checked: false },
		{ name: 'Aboniert', checked: false },
		{ name: 'Some other', checked: false },
		{ name: 'Random List', checked: false },
	],
});

const checkAll = (event) => {
	const checked = Boolean(state.playlists.find((e) => !e.checked));
	state.playlists = state.playlists.map((e) => ({ ...e, checked }));
};
</script>
<style lang=""></style>
