<template>
	<h1>Hello</h1>
	<pre>
		loading: {{ loading }}
		error: {{ error }}
	</pre
	>
	<pre v-if="!loading">{{ todo }}</pre>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import networking from '@/utils/networking';
import useFetch from '@/utils/useFetch';

const { loading, error, data: todo } = useFetch('get', 'todos--/1');

onMounted(async () => {
	// const response = await networking.get('todos/1');
	// console.log(response);
	// todo.value = response.data;
});
</script>

<style scoped></style>
