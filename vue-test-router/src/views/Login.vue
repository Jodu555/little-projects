<template>
	<div>
		<form @submit.prevent="login">
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
export default {
	data() {
		return {
			username: '',
			password: '',
		};
	},
	methods: {
		login() {
			console.log(this.username, this.password);
		},
	},
};
</script>

<style></style>
