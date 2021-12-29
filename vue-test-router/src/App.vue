<template>
	<div :class="dark ? 'dark' : ''">
		<Navbar />
		<router-view v-slot="{ Component }">
			<transition name="slide">
				<component class="container py-5" :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Navbar from '@/components/Navbar';

export default {
	components: {
		Navbar,
	},
	created() {
		this.authenticate();
	},
	computed: {
		...mapState('theme', ['dark']),
	},
	methods: {
		...mapActions('auth', ['authenticate']),
	},
};
</script>

<style lang="scss">
// $cs-body-bg: #1c2938;
// $cs-body-color: #e5e9f2;
// $cs-secondary: #c0ccda;
body[data-theme='dark'] {
	--bs-body-bg: #1c2938;
	--bs-body-color: #e5e9f2;
	--bs-secondary: #c0ccda;
	*,
	*:before,
	*:after {
		color: var(--bs-body-color);
	}
	input {
		background-color: var(--bs-body-bg);
	}
}

@import '../node_modules/bootstrap/scss/bootstrap';

@import '@/styles/sliders';
</style>
