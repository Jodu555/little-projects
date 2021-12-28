<template>
	<div>
		<div v-if="error" class="alert alert-danger">
			{{ error }}
		</div>
		<form @submit.prevent="onLogin">
			<div class="mb-3">
				<label for="username" class="form-label">Username</label>
				<input type="text" v-model="username" class="form-control" />
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input type="password" v-model="password" class="form-control" id="password" />
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	data() {
		return {
			username: '',
			password: '',
			error: null,
		};
	},
	methods: {
		...mapActions('auth', ['login']),
		async onLogin() {
			const error = await this.login({ username: this.username, password: this.password });
			this.username = '';
			this.password = '';
			this.error = error.error;
		},
	},
};
</script>

<style></style>
