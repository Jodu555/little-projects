<template>
	<div>
		<header>
			<nav class="navbar navbar-expand-sm navbar-light bg-light">
				<div class="container">
					<p class="navbar-brand">My Test Project for all my silly Ideas</p>
					<button
						class="navbar-toggler d-lg-none"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapsibleNavId"
						aria-controls="collapsibleNavId"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="collapsibleNavId">
						<ul class="me-auto"></ul>
						<a href="#" class="btn btn-outline-info">Profile</a>
					</div>
				</div>
			</nav>
		</header>

		<main class="container mt-4">
			<!-- <MultiSelect :playlists="state.playlists" :checkAll="checkAll" /> -->
			<!-- next test Sortable List -->
			<ul class="list-group">
				<li v-for="list in state.playlists" class="list-group-item">{{ list.name }}</li>
			</ul>
		</main>

		<footer>
			<!-- place footer here -->
		</footer>
	</div>
</template>
<script setup>
import { reactive, watch, computed } from 'vue';
import MultiSelect from '@/components/MultiSelect.vue';
import { useExtendedWatch } from './composables/useExtendedWatch';

const state = reactive({
	playlists: [
		{ name: 'Watchlist', checked: false },
		{ name: 'Aboniert', checked: false },
		{ name: 'Some other', checked: false },
		{ name: 'Random List', checked: false },
	],
});

useExtendedWatch(state.playlists, (newValue, oldValue) => {
	console.log(`newValue`, newValue);
	console.log(`oldValue`, oldValue);
});

const checkAll = () => {
	const checked = Boolean(state.playlists.find((e) => !e.checked));
	state.playlists.forEach((e) => (e.checked = checked));
};
</script>
<style lang=""></style>
