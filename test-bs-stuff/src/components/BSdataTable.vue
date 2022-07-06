<template lang="">
	<div>
		<h1>Hello from inside table</h1>
		<table class="table">
			<thead>
				<tr>
					<th v-for="row in tableRowData" scope="col" @click="changeSort(row)">{{ row }}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			sortState: [],
			tableRowData: ['#', 'First', 'Last', 'Handle'],
			tableData: [
				['1', 'Mark', 'Otto', '@mdo'],
				['2', 'Jacob', 'Thornton', '@fat'],
				['3', 'Larry', 'the Bird', '@twitter'],
			],
		};
	},
	methods: {
		changeSort(row) {
			console.log('GOT CHANGE SORT', row);
		},
	},
};
</script>
<style lang=""></style>
