<template>
	<div class="dropdown">
		<input
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
		<div ref="dropdownMenu" class="dropdown-menu"></div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { Dropdown } from 'bootstrap';

const dropdownMenu = ref(null);
const dropdown = new Dropdown(dropdownMenu);
function click() {}

function input() {}

function keydown() {}
</script>
<style lang=""></style>
