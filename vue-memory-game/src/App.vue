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

//TODO: Auto Generate these values, and maybe add an Restart Button
const grid = reactive([]);

fillWithRandom();

const selected = reactive([]);

function getRandom(array, withidx) {
	const randomIDX = Math.floor(Math.random() * array.length);
	if (withidx) return { value: array[randomIDX], idx: randomIDX };
	return array[randomIDX];
}

function fillWithRandom() {
	const stuff = '0123456789abcdefghijklmnnopqrstuvwxyz'.split('');
	const cols = 3,
		rows = 4;
	const values = cols * rows;

	const pairs = values / 2;

	const possibles = [];

	for (let i = 0; i < pairs; i++) {
		const value = getRandom(stuff);
		possibles.push(value, value);
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (!Array.isArray(grid[i])) grid[i] = [];
			const { value, idx } = getRandom(possibles, true);
			grid[i][j] = { value, revealed: false, finished: false };
			possibles.splice(idx, 1);
		}
	}
}

function reveal(i, j) {
	const cardObj = grid[i][j];
	if (cardObj.finished || gameState.value == 'No Pair') return;
	cardObj.revealed = true;
	console.log(selected.length);
	if (selected.length < 2 && selected?.[0]?.i == i && selected?.[0]?.j == j) return;
	selected.push({ i, j, ...cardObj });
	if (selected.length < 2) return;

	if (selected[0].value === selected[1].value) {
		//Got Pair
		selected.forEach((e) => (grid[e.i][e.j].finished = true));
		if (checkIfWon()) {
			gameState.value = 'Won';
		}
		selected.splice(0, selected.length);
	} else {
		//Got None Pair
		gameState.value = 'No Pair';
		setTimeout(() => {
			gameState.value = 'Running';
			selected.forEach((e) => (grid[e.i][e.j].revealed = false));
			selected.splice(0, selected.length);
		}, 1 * 1000);
	}
}

function checkIfWon() {
	const out = grid.flat().filter((e) => !e.finished);
	console.log(out, out.length);
	return out.length <= 0;
}
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
