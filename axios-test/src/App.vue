<template>
	<h1>Hello</h1>
</template>

<script setup>
import { onMounted } from 'vue';
import networking from '@/utils/networking';
onMounted(async () => {
	const data = await networking.get('todos/1');
	console.log(data);
});
</script>

<style scoped></style>
