<template>
	<div class="home">
		Counter: {{ counter }}

		<p>{{ message }}</p>
		<input v-model="message" />
		<br />
		<button @click="increment()">Increment</button>
	</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue';

export default {
	name: 'Home',
	data() {
		return {
			counter: 0,
			message: '',
		};
	},
	mounted() {
		setInterval(() => {
			this.counter++;
		}, 1000);
	},
	methods: {
		increment() {
			this.counter++;
		},
	},
};
</script>
