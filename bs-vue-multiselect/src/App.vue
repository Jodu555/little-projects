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

			<draggable
				class="list-group"
				tag="ul"
				:component-data="{
					tag: 'ul',
					name: !drag ? 'flip-list' : null,
				}"
				:list="state.list"
				v-bind="dragOptions"
				@start="drag = true"
				@end="drag = false"
				@change="change"
				item-key="order"
			>
				<template #item="{ element }">
					<li class="list-group-item">
						{{ element.name }}
						<span class="badge bg-info mx-2">{{ element.order }}</span>
					</li>
				</template>
			</draggable>

			<div class="list-group col-md-3">
				<pre>{{ state.list }}</pre>
			</div>
		</main>

		<footer></footer>
	</div>
</template>

<script setup>
import { reactive, computed, ref, watch, watchEffect } from 'vue';
import draggable from 'vuedraggable';
import { useExtendedWatch } from './composables/useExtendedWatch';

const state = reactive({
	playlists: [
		{ name: 'Watchlist', checked: false },
		{ name: 'Aboniert', checked: false },
		{ name: 'Some other', checked: false },
		{ name: 'Random List', checked: false },
	],
	list: [
		'More Than a Married Couple, But Not Lovers',
		'Re:ZERO - Starting Life in Another World',
		'Blue Lock',
		'Call of the Night',
		'In Another World With My Smartphone',
		'Don’t Toy With Me, Miss Nagatoro',
		'To Love-Ru',
	].map((name, index) => {
		return { name, order: index + 1 };
	}),
});

useExtendedWatch(state.playlists, (newValue, oldValue) => {
	console.log(`newValue`, newValue);
	console.log(`oldValue`, oldValue);
});

const checkAll = () => {
	const checked = Boolean(state.playlists.find((e) => !e.checked));
	state.playlists.forEach((e) => (e.checked = checked));
};
const drag = ref(false);

const change = (event) => {
	state.list = state.list.map((name, index) => {
		return { ...name, order: index + 1 };
	});
	//Here we can save the state to the database
};

const dragOptions = computed(() => {
	return {
		animation: 200,
		group: 'description',
		disabled: false,
		ghostClass: 'ghost',
	};
});
</script>

<style>
.flip-list-move {
	transition: transform 0.5s;
}
.no-move {
	transition: transform 0s;
}
.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}
.list-group-item {
	cursor: move;
}
</style>
