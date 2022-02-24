<template>
	<!-- <div class="card card-hover card-rad shadow-lg p-3 mb-5 rounded"> -->
	<div
		:class="[
			'card',
			'card-hover',
			{ 'card-rad': this.$props.type == '1' },
			'shadow-lg',
			'p-3',
			'mb-5',
			'rounded',
		]"
	>
		<div class="card-body">
			<h5 class="card-title">
				<h4>
					<b>{{ name }}</b>
				</h4>
			</h5>
			<div class="justify-content-centermt-4">
				<div class="row">
					<div class="col card-text" style="font-size: 1.5rem">
						<div class="row mt-2">
							<dt class="col-sm-7">(v)Cores</dt>
							<dd class="col-sm-5">{{ cores }}</dd>
						</div>
						<div class="row mt-2">
							<dt class="col-sm-7">Memory</dt>
							<dd class="col-sm-5">{{ memory }}GB</dd>
						</div>
						<div class="row mt-2">
							<dt class="col-sm-7">Storage</dt>
							<dd class="col-sm-5">{{ storage }}GB</dd>
						</div>
					</div>
				</div>
			</div>
			<div class="float-end mt-3">
				<a href="#" class="btn btn-outline-primary">Buy</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['name', 'cores', 'memory', 'storage', 'type'],
};
</script>

<style scoped>
.card-hover {
	transition: all 0.5s ease-in-out;
}

.card-rad {
	border-radius: 1.25rem !important;
}

.card-hover:hover {
	box-shadow: 0px 0px 20px 5px #141313ed !important;
	transform: scale(1.1) translateY(20px);
}
</style>
