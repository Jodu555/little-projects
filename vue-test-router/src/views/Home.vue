<template>
	<div class="home">
		Counter: {{ $store.state.count }}

		<p>{{ message }}</p>
		<input v-model="message" />
		<br />
		<button @click="increment">Increment</button>
	</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Home',
	data() {
		return {
			message: '',
		};
	},
	mounted() {},
	methods: {
		...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync']),
	},
};
</script>
