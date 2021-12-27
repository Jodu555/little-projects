<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
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
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
					<li v-if="userInfo.UUID" class="nav-item">
						<router-link class="nav-link" to="/login"></router-link>
					</li>
				</ul>
				<div class="d-flex">
					<h5>{{ userInfo.username }}</h5>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
	computed: mapState('auth', ['userInfo']),
};
</script>

<style></style>
