<template>
	<div class="about">
		<h1>This is an about page</h1>
		<div class="row mt-4">
			<div class="col">
				<ServerCard name="Bronze" cores="1" memory="1" storage="5"></ServerCard>
			</div>
			<div class="col-1" style="width: 0.33333%"></div>
			<div class="col">
				<ServerCard name="Silver" cores="2" memory="4" storage="10" type="1"></ServerCard>
			</div>
			<div class="col-1" style="width: 0.33333%"></div>
			<div class="col"></div>
			<div class="col-1" style="width: 0.33333%"></div>
			<div class="col"></div>
		</div>
	</div>
</template>

<script>
import ServerCard from '@/components/ServerCard';
export default {
	components: {
		ServerCard,
	},
};
</script>
