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
		document.body.setAttribute('data-theme', this.dark ? 'dark' : 'light');
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
// Required
@import '../node_modules/bootstrap/scss/functions';

// Required
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

@import '../node_modules/bootstrap/scss/bootstrap';

.wrapper {
	width: 100%;
	min-height: 100vh;
}

.scale-enter-active,
.scale-leave-active {
	transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
	opacity: 0;
	transform: scale(0.9);
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.65s ease-out;
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

.scale-slide-enter-active,
.scale-slide-leave-active {
	position: absolute;
	transition: all 0.85s ease;
}

.scale-slide-enter-from {
	left: -100%;
}

.scale-slide-enter-to {
	left: 0%;
}

.scale-slide-leave-from {
	transform: scale(1);
}

.scale-slide-leave-to {
	transform: scale(0.8);
}
</style>
