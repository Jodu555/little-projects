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
			idx: 0,
			sortState: [],
			tableRowData: ['#', 'Channel', 'Length', 'Size'],
			tableData: [
				['1', 'Sintica', '30m15s', '1.5GB'],
				['2', 'Jacob', 'Thornton', '@fat'],
				['3', 'Larry', 'the Bird', '@twitter'],
			],
		};
	},
	mounted() {
		setInterval(() => {
			this.idx += 1;
			this.tableData = [
				[
					'1',
					'Sintica',
					`${this.idx * 0.5}m${Math.round(this.idx / 10 + this.idx * 5)}s`,
					`${this.idx * 0.5}GB`,
				],
				['2', 'Jacob', 'Thornton', '@fat'],
				['3', 'Larry', 'the Bird', '@twitter'],
			];
			console.log(123);
		}, 1000);
	},
	methods: {
		changeSort(idx) {
			console.log('GOT CHANGE SORT', idx);
		},
	},
};
</script>
<style lang=""></style>
