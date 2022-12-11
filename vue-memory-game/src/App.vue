<template>
	<h1>{{ gameState }}</h1>
	<div class="row" v-for="(row, i) in grid" :key="i">
		<div class="card" @click="reveal(i, j)" :class="{ revealed: col.revealed, pointer: !col.finished }" v-for="(col, j) in row" :key="j">
			{{ col.value }}
		</div>
	</div>
	<pre>{{ grid }}</pre>
</template>

<script setup>
import { reactive, ref } from 'vue';

const gameState = ref('Running');

const grid = reactive(
	[
		[1, 3, 4, 5],
		[0, 2, 4, 3],
		[1, 0, 2, 5],
	].map((e) => e.map((x) => ({ value: x, revealed: false, finished: false })))
);

const selected = reactive([]);

const reveal = (i, j) => {
	const cardObj = grid[i][j];
	if (cardObj.finished) return;
	cardObj.revealed = !cardObj.revealed;
	selected.push({ i, j, ...cardObj });
	console.log(selected.length);
	if (selected.length < 2) return;

	console.log(selected[0].value, selected[1].value);

	if (selected[0].value === selected[1].value) {
		console.log('Came');
		selected.forEach((e) => (grid[e.i][e.j].finished = true));
	} else {
		selected.forEach((e) => (grid[e.i][e.j].revealed = false));
	}
	selected.splice(0, selected.length);
};
</script>

<style scoped>
.row {
	display: flex;
	flex-direction: row;
	gap: 1rem;
}

.card {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	margin: 0.2rem;
	height: 4rem;
	width: 3.5rem;
	background-color: black;
}

.pointer {
	cursor: pointer;
}

.card.revealed {
	background-color: white;
}
</style>
