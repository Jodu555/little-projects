<template>
	<div>
		<Navbar />
		<router-view class="container py-5" />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
	components: {
		Navbar,
	},
};
</script>
