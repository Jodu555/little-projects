<template>
	<v-app>
		<v-main>
			<v-theme-provider root>
				<router-view />
			</v-theme-provider>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		//
	}),
};
</script>
