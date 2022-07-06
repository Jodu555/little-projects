<template lang="">
	<div>
		<h1>Hello from inside table</h1>
		<table class="table">
			<thead>
				<tr>
					<th v-for="(row, i) in tableRowData" scope="col" @click="changeSort(i)">{{ row }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in tableData">
					<component v-for="(data, i) in row" :is="i == 0 ? 'th' : 'td'">{{ data }}</component>
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
		changeSort(idx) {
			console.log('GOT CHANGE SORT', idx);
		},
	},
};
</script>
<style lang=""></style>
