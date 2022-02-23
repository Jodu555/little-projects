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
@import '../node_modules/bootswatch/dist/cyborg/variables';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootswatch/dist/cyborg/bootswatch';

// @import '../node_modules/bootstrap/scss/bootstrap';

@import '@/styles/sliders';
</style>
