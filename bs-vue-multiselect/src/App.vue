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
			<!-- <ul class="list-group">
				<li v-for="list in state.playlists" class="list-group-item">{{ list.name }}</li>
			</ul> -->
			<div class="col-md-3">
				<draggable
					class="list-group"
					tag="ul"
					v-model="list"
					v-bind="dragOptions"
					:move="onMove"
					@start="isDragging = true"
					@end="isDragging = false"
				>
					<transition-group type="transition" :name="'flip-list'">
						<li class="list-group-item" v-for="element in list" :key="element.order">
							<i
								:class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
								@click="element.fixed = !element.fixed"
								aria-hidden="true"
							></i>
							{{ element.name }}
							<span class="badge">{{ element.order }}</span>
						</li>
					</transition-group>
				</draggable>
			</div>
		</main>

		<footer>
			<!-- place footer here -->
		</footer>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
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
	name: 'hello',
	components: {
		draggable,
	},
	data() {
		return {
			list: message.map((name, index) => {
				return { name, order: index + 1, fixed: false };
			}),
			list2: [],
			editable: true,
			isDragging: false,
			delayedDragging: false,
		};
	},
	methods: {
		orderList() {
			this.list = this.list.sort((one, two) => {
				return one.order - two.order;
			});
		},
		onMove({ relatedContext, draggedContext }) {
			const relatedElement = relatedContext.element;
			const draggedElement = draggedContext.element;
			return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
		},
	},
	computed: {
		dragOptions() {
			return {
				animation: 0,
				group: 'description',
				disabled: !this.editable,
				ghostClass: 'ghost',
			};
		},
		listString() {
			return JSON.stringify(this.list, null, 2);
		},
		list2String() {
			return JSON.stringify(this.list2, null, 2);
		},
	},
	watch: {
		isDragging(newValue) {
			if (newValue) {
				this.delayedDragging = true;
				return;
			}
			this.$nextTick(() => {
				this.delayedDragging = false;
			});
		},
	},
};
</script>

<!-- <script setup>
import draggable from 'vuedraggable';
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
</script> -->

<style lang="">
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
