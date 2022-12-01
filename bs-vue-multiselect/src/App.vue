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
						<a href="#" @click="show = true" class="btn btn-outline-info">Profile</a>
					</div>
				</div>
			</nav>
		</header>

		<main class="container mt-4">
			<!-- <MultiSelect :playlists="state.playlists" :checkAll="checkAll" /> -->

			<Modal title="Model title goes here" :show="show" :handleClose="() => (show = false)" ref="thisModal">
				<template #body>This should be in the body</template>
				<template #footer>
					<button class="btn btn-primary">Extra footer button</button>
				</template>
			</Modal>

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
						<div v-if="element.edited">
							<div class="row text-center mt-2 mb-2 align-items-center">
								<div class="col-2">
									<label for="name" class="form-label">Name:</label>
								</div>
								<div class="col-7">
									<input type="text" class="form-control" id="name" :value="element.name" />
								</div>
							</div>
							<div class="row text-center align-items-center">
								<div class="col-2">
									<label for="url" class="form-label">Aniworld-URL:</label>
								</div>
								<div class="col-7">
									<input type="text" class="form-control" id="url" :value="element.url" />
								</div>
							</div>
							<div class="d-flex justify-content-end">
								<button type="button" @click="element.edited = false" class="btn btn-outline-danger mx-2">Cancel</button>
								<button type="button" @click="element.edited = false" class="btn btn-outline-success">Save</button>
							</div>
						</div>
						<button v-else type="button" @click="element.edited = true" class="btn btn-outline-primary">Edit</button>
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
import Modal from './components/Modal.vue';
import { useExtendedWatch } from './composables/useExtendedWatch';

let show = ref(false);

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
		return { name, edited: false, url: '', order: index + 1 };
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

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
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
