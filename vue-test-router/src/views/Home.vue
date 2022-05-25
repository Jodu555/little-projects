<template>
	<div v-auto-animate class="home">
		Counter: {{ $store.state.counter.count }}

		<p>{{ message }}</p>
		<input v-model="message" />
		<br />
		<button @click="increment">Increment</button>
	</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			message: '',
		};
	},
	computed: { ...mapState('counter', ['count']) },
	methods: {
		...mapActions('counter', ['increment', 'decrement', 'incrementIfOdd', 'incrementAsync']),
	},
};
</script>
