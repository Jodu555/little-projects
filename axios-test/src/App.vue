<template>
	<h1>Hello</h1>
	<pre>
		loading: {{ loading }}
		statistics: {{ statistics }}
		error: {{ error }}
	</pre
	>
	<button type="button" @click="reload()">Reload</button>
	<pre v-if="!loading">{{ todo }}</pre>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useFetch from '@/utils/useFetch';
const { loading, error, data: todo, reload, statistics } = useFetch(false).get('todos');

onMounted(async () => {
	await reload();
	console.log(todo.value);
});
</script>

<style scoped></style>
