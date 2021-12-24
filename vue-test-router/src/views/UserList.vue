<template>
	<table>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>emial</th>
			<th>gender</th>
		</tr>
		<tr v-for="user in users" :key="user.id">
			<td>{{ user.first_name }}</td>
			<td>{{ user.last_name }}</td>
			<td>{{ user.email }}</td>
			<td>{{ user.gender }}</td>
		</tr>
		<br />
		<button @click="loadUser()">Another One</button>
		<button @click="clearUser()">Clear All</button>
	</table>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	created() {
		console.log(123, this);
		this.loadUser();
		// this.$store.dispatch('loadUser');
	},
	computed: mapState(['users']),
	methods: {
		...mapActions(['loadUser']),
		...mapMutations(['clearUser']),
	},
};
</script>

<style></style>
