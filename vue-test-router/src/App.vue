<template>
	<div>
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
	methods: {
		...mapActions('auth', ['authenticate']),
	},
};
</script>

<style lang="scss">
.wrapper {
	width: 100%;
	min-height: 100vh;
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.75s ease-out;
}

.slide-enter-to {
	position: absolute;
	right: 0;
}

.slide-enter-from {
	position: absolute;
	right: -100%;
}

.slide-leave-to {
	position: absolute;
	left: -100%;
}

.slide-leave-from {
	position: absolute;
	left: 0;
}
</style>
