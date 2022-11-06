<template>
	<div>
		<header>
			<!-- place navbar here -->
		</header>

		<main class="container mt-4">
			<pre>{{ state }} {{ selectedPlaylists }}</pre>
			<div class="btn-group">
				<button
					class="btn btn-secondary dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					data-bs-auto-close="outside"
					aria-expanded="false"
				>
					Dropdown button
					<span v-for="sel in selectedPlaylists" class="badge bg-primary">{{ sel.name }}</span>
				</button>
				<ul class="dropdown-menu">
					<li class="px-5 dropdown-item form-check">
						<input
							class="form-check-input"
							@input="checkAll"
							type="checkbox"
							id="all"
							value="all"
						/>
						<label class="form-check-label" for="all">Select All</label>
					</li>
					<li v-for="playlist in state.playlists" class="px-5 dropdown-item form-check">
						<input
							class="form-check-input"
							type="checkbox"
							v-model="playlist.checked"
							:id="playlist.name"
							:value="playlist.name"
						/>
						<label class="form-check-label" :for="playlist.name">{{ playlist }}</label>
					</li>
				</ul>
			</div>
		</main>

		<footer>
			<!-- place footer here -->
		</footer>
	</div>
</template>
<script>
import { computed, reactive } from 'vue';

export default {
	setup(props) {
		const state = reactive({
			playlists: [
				{ name: 'Watchlist', checked: false },
				{ name: 'Aboniert', checked: false },
			],
		});

		const selectedPlaylists = computed(() => {
			return state.playlists.filter((e) => e.selected);
		});

		function checkAll(event) {
			console.log(event);
			state.playlists = state.playlists.map((e) => ({ ...e, checked: event.target.checked }));
		}

		return { state, checkAll, selectedPlaylists };
	},
};
</script>
<style lang=""></style>
