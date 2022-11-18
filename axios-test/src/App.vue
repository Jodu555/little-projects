<template>
	<h1>Hello</h1>
	<pre>{{ todo }}</pre>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import networking from '@/utils/networking';

const todo = ref({});

onMounted(async () => {
	const response = await networking.get('todos/1');
	console.log(response);
	todo.value = response.data;
});
</script>

<style scoped></style>
