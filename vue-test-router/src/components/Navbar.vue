<template>
	<nav
		:class="[
			'navbar',
			'navbar-expand-lg',
			dark ? 'navbar-dark' : 'navbar-light',
			dark ? 'bg-dark' : 'bg-light',
		]"
	>
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">Navbar</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<router-link class="nav-link" aria-current="page" to="/">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/login">Login</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/about">About</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/users">Users</router-link>
					</li>
				</ul>
				<ul v-if="userInfo.UUID" class="navbar-nav">
					<li class="nav-item" style="margin-right: 0.6vw">
						<h5>{{ userInfo.username }}</h5>
					</li>
					<li class="nav-item" style="margin-right: 0.6vw">
						<button @click="setDark()" class="btn btn-outline-primary">Light / Dark</button>
					</li>
					<li class="nav-item">
						<button @click="logout()" class="btn btn-outline-danger">Logout</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
	computed: {
		...mapState('auth', ['userInfo']),
		...mapState('theme', ['dark']),
	},
	methods: {
		...mapActions('auth', ['logout']),
		...mapMutations('theme', ['setDark']),
	},
};
</script>

<style></style>
