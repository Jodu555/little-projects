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
				v-model="list"
				v-bind="dragOptions"
				@start="drag = true"
				@end="drag = false"
				item-key="order"
			>
				<template #item="{ element }">
					<li class="list-group-item">
						{{ element.name }} <span class="badge bg-info mx-2">{{ element.order }}</span>
					</li>
				</template>
			</draggable>

			<div class="list-group col-md-3">
				<pre>{{ list }}</pre>
			</div>
		</main>

		<footer></footer>
	</div>
</template>

<script>
const message = [
	'vue.draggable',
	'draggable',
	'component',
	'for',
	'vue.js 2.0',
	'based',
	'on',
	'Sortablejs',
];
export default {
	components: {
		draggable,
	},
	data() {
		return {
			list: message.map((name, index) => {
				return { name, order: index + 1 };
			}),
			drag: false,
		};
	},
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			};
		},
	},
};
</script>

<style>
.button {
	margin-top: 35px;
}
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
.list-group {
	min-height: 20px;
}
.list-group-item {
	cursor: move;
}
.list-group-item i {
	cursor: pointer;
}
</style>
