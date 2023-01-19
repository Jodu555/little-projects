<template>
	<div class="dropdown">
		<input
			ref="inputRef"
			@click="click"
			@input="input"
			@keydown="keydown"
			type="text"
			class="form-control me-3 dropdown-toggle"
			placeholder="Search for a series..."
			style="width: 18rem"
			autocomplete="off"
			data-bs-toggle="dropdown"
		/>
		<div ref="dropdownMenuRef" v-show="recommendations.length >= 1" class="dropdown-menu" style="margin: 0px">
			<button v-for="recommendation in recommendations" type="button" class="dropdown-item">
				<span v-for="value in recommendation.values" :class="{ 'text-primary': value.h }">
					{{ value.value }}
				</span>
			</button>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import { Dropdown } from 'bootstrap';
import axios from 'axios';

const data = reactive([]);

(async () => {
	const res = await axios.get('http://cinema-api.jodu555.de/index/all?auth-token=SECR-DEV');
	console.log(res.data);
	res.data.forEach((x) => data.push({ value: x.title, ID: x.ID }));
})();

const recommendations = ref([]);

const inputRef = ref(null);
const dropdownMenuRef = ref(null);
let dropdown;
onMounted(() => {
	dropdown = new Dropdown(dropdownMenuRef.value);
});

function input() {
	dropdown.show();
	const maximumItems = 5;
	const lookup = inputRef.value.value.toLowerCase();
	if (lookup.trim() === '') {
		recommendations.value = [];
		return;
	}

	recommendations.value = data
		.map((key) => {
			const value = key.value;
			const idx = removeDiacritics(value).toLowerCase().indexOf(removeDiacritics(lookup).toLowerCase());
			if (idx >= 0) {
				return {
					taken: true,
					values: [
						{ value: value.substring(0, idx), h: false },
						{ value: value.substring(idx, idx + lookup.length), h: true },
						{ value: value.substring(idx + lookup.length, value.length), h: false },
					],
				};
			} else {
				return {
					taken: false,
				};
			}
		})
		.filter((x) => x.taken);
	recommendations.value.splice(maximumItems, recommendations.value.length);
}

function keydown(e) {
	if (e.keyCode === 27) {
		dropdown.hide();
		return;
	}
	if (e.keyCode === 40) {
		dropdown._menu.children[0]?.focus({ preventScroll: true });
		return;
	}
}

function removeDiacritics(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
</script>
<style lang=""></style>
