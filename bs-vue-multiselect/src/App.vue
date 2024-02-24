
<template>
	<div style="overflow-x: hidden">
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

		<Modal size="xl" v-model:show="showSyncModal">
			<template #title> Sync Room 74533 Manager</template>
			<template #body>
				<div class="table-responsive-md">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Username</th>
								<th scope="col">Role</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr class="">
								<td scope="row">Jodu555</td>
								<td>Viewer</td>
								<td>
									<button type="button" class="btn btn-primary me-3">Promote</button>
									<button type="button" class="btn btn-danger">Kick</button>
								</td>
							</tr>
							<tr class="">
								<td scope="row">TRyFlow</td>
								<td>Host</td>
								<td>-</td>
							</tr>
						</tbody>
					</table>
				</div>
			</template>
		</Modal>

		<div class="live-info">
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
					<button @click="showSyncModal = true" class="btn btn-outline-info">Manage</button>
				</div>
			</div>
		</div>

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
				item-key="ID"
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
										<option selected disabled>Kategorie</option>
										<option>Aniworld</option>
										<option>STO</option>
										<option>K-Drama</option>
									</select>
								</div>
							</div>
							<!-- <div class="row text-center mt-2 mb-2 align-items-center">
								<div class="col-2">
									<label for="name" class="form-label">From:</label>
								</div>
								<div class="col-3">
									<select v-model="element.from" style="width: 100%" class="form-select" aria-label="Default select example">
										<option selected disabled>From</option>
										<option value="UUID">Jodu555</option>
										<option value="UUID">Svenja</option>
									</select>
								</div>
							</div> -->
							<hr />
							<h5>References</h5>
							<h6>Anime</h6>
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
							<hr />
							<h6>Other</h6>
							<div class="row text-center align-items-center mb-4">
								<div class="col-2">
									<label for="url" class="form-label">STO:</label>
								</div>
								<div class="col-7">
									<input type="text" class="form-control" id="url" v-model="element.references.sto" />
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
		<div v-for="item of list">
			<!-- {{ item.title }}
			{{ item.data.length }}
			{{ item.data.length > 1 }} -->
			<VideoCarousel v-if="item.data.length > 1" class="pb-4 pt-10" :category="item.title" :wrapAround="true" :list="item.data" />
		</div>
		<!-- <VideoCarousel v-if="list?.foryou?.length > 1" class="pb-4 pt-10" category="For You" :wrapAround="true" :list="list.foryou" />
		<VideoCarousel v-if="list?.newest?.length > 1" class="pb-4 pt-10" category="Newest" :wrapAround="false" :list="list.newest" /> -->
	</div>
</template>

<script setup>
import { reactive, computed, ref, watch, watchEffect, onMounted } from 'vue';
import draggable from 'vuedraggable';
import AutoComplete from './components/AutoComplete.vue';
import Modal from './components/Modal.vue';
import MultiSelect from './components/MultiSelect.vue';
import VideoCarousel from './components/VideoCarousel.vue';
import { useExtendedWatch } from './composables/useExtendedWatch';
import axios from 'axios';

let show = ref(false);
let showSyncModal = ref(false);

let selectedModalSeries = ref(null);

const list = reactive({});

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
	const res = await axios.get('http://cinema-api.jodu555.de/index?auth-token=SECR-DEV');
	// console.log(res.data);
	state.autocompleteSearch = res.data.map((x) => ({ value: x.title, ID: x.ID }));
	// res.data.forEach((x) => data.push({ value: x.title, ID: x.ID }));

	// const todos = await axios.get('http://localhost:3200/todo');

	// state.list = todos.data;

	// const forYouItems = 20;
	// const newestItems = 15;

	// const token = 'b3fbb4a3-7868-4735-9ce0-765c147108d4';

	// const response = await axios.get(`http://cinema-api.jodu555.de/index?auth-token=${token}`);

	// const series = response.data
	// 	.filter((x) => x.categorie == 'Aniworld')
	// 	.map((x) => ({
	// 		ID: x.ID,
	// 		url: `http://cinema-api.jodu555.de/images/${x.ID}/cover.jpg?auth-token=${token}`,
	// 		title: x.title,
	// 		infos: x.infos,
	// 	}));
	// list.foryou = series
	// 	.slice()
	// 	.sort((a, b) => 0.5 - Math.random())
	// 	.slice(0, forYouItems);
	// list.newest = series.reverse().slice(0, newestItems);

	const response = await axios.get(`http://localhost:3100/recommendation?auth-token=SECR-DEV`);

	Object.keys(response.data).forEach((k) => {
		console.log(k, response.data[k].data);
		// list[k] = response.data[k];

		list[k] = {
			title: response.data[k].title,
			data: response.data[k].data.map((x) => {
				const f = res.data.find((z) => z.ID == x);
				f.url = `http://cinema-api.jodu555.de/images/${f.ID}/cover.jpg?auth-token=${'SECR-DEV'}`;
				return f;
			}),
		};
	});
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
	const ID = Math.round(Math.random() * 10 ** 6);
	const item = { name: '', edited: false, categorie: '', references: { aniworld: '', zoro: '', sto: '' }, order: -1, ID };
	state.list.push(item);
	// pushTodoListUpdate();
	change();
};

const save = () => {
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
