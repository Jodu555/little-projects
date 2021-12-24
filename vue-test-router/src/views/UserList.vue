<template>
	<div>
		<div class="row text-center justify-content-center">
			<button class="col-2 btn btn-outline-primary" @click="loadUser('male')">Another Man</button>
			<button class="col-2 ms-3 btn btn-outline-primary" @click="loadUser('female')">
				Another Woman
			</button>
			<button class="col-2 ms-3 btn btn-outline-danger" @click="clearUser()">Clear All</button>
		</div>

		<table class="table">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Avatar</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">emial</th>
					<th scope="col">gender</th>
					<th scope="col">Location</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.login.uuid">
					<th scope="row">{{ user.login.salt }}</th>
					<td><img :src="user.picture.medium" alt="Avatar" class="img-thumbnail" /></td>
					<td>{{ user.name.first }}</td>
					<td>{{ user.name.last }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.gender }}</td>
					<td>
						{{ user.location.city }} - {{ user.location.state }} / {{ user.location.country }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	created() {
		this.loadUser();
	},
	computed: mapState(['users']),
	methods: {
		...mapActions(['loadUser']),
		...mapMutations(['clearUser']),
	},
};
</script>

<style></style>
