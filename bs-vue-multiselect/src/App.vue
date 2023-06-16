<template>
	<div>
		<header>
			<nav class="navbar navbar-expand-sm">
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
						<AutoComplete :options="{ placeholder: 'Search for a series...' }" :data="state.autocompleteSearch" :select-fn="autocompleteSearch" />
						<a href="#" @click="show = true" class="btn btn-outline-info">Profile</a>
					</div>
				</div>
			</nav>
		</header>
		<!-- <div class="live-info">
			<div class="card" style="width: 12rem">
				<div class="card-body text-center">
					<h5 class="card-title text-center">
						<div class="spinner-grow text-danger" role="info">
							<span class="visually-hidden">Live Indicator</span>
						</div>
					</h5>
					<p class="card-text text-center">
						<span> Active Sync Session... </span>
						<br />
						<span>You are the host</span>
						<br />
						<span class="text-muted">5 Participants</span>
					</p>
					<a href="#" class="btn btn-outline-warning me-2">Leave</a>
					<a href="#" class="btn btn-outline-info">Manage</a>
				</div>
			</div>
		</div> -->

		<!-- <AutoComplete :options="{ placeholder: 'Select Series' }" :data="state.autocompleteSearch" /> -->
		<main class="container mt-4">
			<AutoComplete
				v-slot="{ properties }"
				:options="{ placeholder: 'Search for a series...' }"
				:data="state.autocompleteSearch"
				:select-fn="autocompleteSearch"
			>
				<img
					:src="`http://cinema-api.jodu555.de/images/${properties.ID}/cover.jpg?auth-token=SECR-DEV`"
					style="width: 10%; height: auto; margin-right: 0.5rem"
				/>
			</AutoComplete>
			<MultiSelect class="mt-4 mb-4" :playlists="state.playlists" :checkAll="checkAll" />

			<Modal v-model:show="show">
				<template #title> You Selected: {{ selectedModalSeries }}</template>
				<template #body>This should be in the body</template>
			</Modal>
			<br />
			<button class="btn btn-outline-primary" @click="addEmptyItem">Add Item</button>

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
					<li class="list-group-item" v-auto-animate>
						<div class="d-flex justify-content-between">
							<div>
								{{ element.name }} -
								{{ element.categorie }}
								<span class="badge bg-info mx-2">{{ element.order }}</span>
								<button v-if="!element.edited" type="button" @click="element.edited = true" class="btn btn-outline-primary">
									<font-awesome-icon :icon="['fa-solid', 'fa-pen']" size="lg" />
								</button>
							</div>
							<div>
								<button v-if="element.edited" type="button" @click="element.edited = false" class="btn btn-close"></button>
							</div>
						</div>

						<div v-if="element.edited">
							<div class="row text-center mt-2 mb-2 align-items-center">
								<div class="col-2">
									<label for="name" class="form-label">Name:</label>
								</div>
								<div class="col-7">
									<input type="text" class="form-control" id="name" v-model="element.name" />
								</div>
							</div>
							<div class="row text-center mt-2 mb-2 align-items-center">
								<div class="col-2">
									<label for="name" class="form-label">Kategorie:</label>
								</div>
								<div class="col-3">
									<select v-model="element.categorie" style="width: 100%" class="form-select" aria-label="Default select example">
										<option selected>Kategorie</option>
										<option>Aniworld</option>
										<option>STO</option>
										<option>K-Drama</option>
									</select>
								</div>
							</div>
							<hr />
							<h5>References</h5>
							<div class="row text-center align-items-center mb-4">
								<div class="col-2">
									<label for="url" class="form-label">Aniworld:</label>
								</div>
								<div class="col-7">
									<input type="text" class="form-control" id="url" v-model="element.references.aniworld" />
								</div>
							</div>
							<div class="row text-center align-items-center">
								<div class="col-2">
									<label for="url" class="form-label">Zoro:</label>
								</div>
								<div class="col-7">
									<input type="text" class="form-control" id="url" v-model="element.references.zoro" />
								</div>
							</div>

							<div class="d-flex justify-content-end">
								<button type="button" @click="element.edited = false" class="btn btn-outline-danger mx-2">Cancel</button>
								<button
									type="button"
									@click="
										element.edited = false;
										save();
									"
									class="btn btn-outline-success"
								>
									Save
								</button>
							</div>
						</div>
					</li>
				</template>
			</draggable>

			<div class="mt-5">
				<pre>{{ state.list }}</pre>
			</div>
		</main>
	</div>
</template>

<script setup>
import { reactive, computed, ref, watch, watchEffect, onMounted } from 'vue';
import draggable from 'vuedraggable';
import AutoComplete from './components/AutoComplete.vue';
import Modal from './components/Modal.vue';
import MultiSelect from './components/MultiSelect.vue';
import { useExtendedWatch } from './composables/useExtendedWatch';
import axios from 'axios';

let show = ref(false);

let selectedModalSeries = ref(null);

const state = reactive({
	playlists: [
		{ name: 'Watchlist', checked: false },
		{ name: 'Aboniert', checked: false },
		{ name: 'Some other', checked: false },
		{ name: 'Random List', checked: false },
	],
	list: [],
	// list: [
	// 	'More Than a Married Couple, But Not Lovers',
	// 	'Re:ZERO - Starting Life in Another World',
	// 	'Blue Lock',
	// 	'Call of the Night',
	// 	'In Another World With My Smartphone',
	// 	'Don’t Toy With Me, Miss Nagatoro',
	// 	'To Love-Ru',
	// 	'',
	// ].map((name, index) => {
	// 	return { name, edited: false, categorie: '', references: { aniworld: '', zoro: '' }, order: index + 1 };
	// }),
	autocompleteSearch: [],
});

// {"name":"Call of the Night","edited":false,"categorie":"","references":{"aniworld":"","zoro":""},"order":1}

onMounted(async () => {
	const res = await axios.get('http://cinema-api.jodu555.de/index/all?auth-token=SECR-DEV');
	// console.log(res.data);
	state.autocompleteSearch = res.data.map((x) => ({ value: x.title, ID: x.ID }));
	// res.data.forEach((x) => data.push({ value: x.title, ID: x.ID }));

	const todos = await axios.get('http://localhost:3200/todo');

	state.list = todos.data;
});

function autocompleteSearch(ID, value) {
	console.log('Passed Through', ID, value);
}

// useExtendedWatch(state.playlists, (newValue, oldValue) => {
// 	console.log(`newValue`, newValue);
// 	console.log(`oldValue`, oldValue);
// });
// useExtendedWatch(state.list, (newValue, oldValue) => {
// 	console.log(`newValue`, newValue);
// 	console.log(`oldValue`, oldValue);
// });

const checkAll = () => {
	const checked = Boolean(state.playlists.find((e) => !e.checked));
	state.playlists.forEach((e) => (e.checked = checked));
};
const drag = ref(false);

const change = (event) => {
	state.list = state.list.map((name, index) => {
		return { ...name, order: index + 1 };
	});
	console.log('Change');
	//Here we can save the state to the database
	pushTodoListUpdate();
};

const addEmptyItem = () => {
	const item = { name: '', edited: false, categorie: '', references: { aniworld: '', zoro: '' }, order: -1 };
	state.list.push(item);
	pushTodoListUpdate();
};

const save = () => {
	console.log('Save');
	pushTodoListUpdate();
};

const pushTodoListUpdate = async () => {
	const saveList = JSON.parse(JSON.stringify(state.list)).map((x) => {
		delete x.edited;
		return x;
	});
	// this.$socket.emit('todoListUpdate', saveList);
	console.log(saveList);
	await axios.post('http://localhost:3200/todo', saveList);
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

.live-info {
	position: sticky;
	top: 0;
	z-index: 100;
}
</style>
