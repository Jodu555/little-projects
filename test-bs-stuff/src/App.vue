<template lang="">
	<div>
		<nav class="navbar navbar-expand-lg">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Test</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li>
					</ul>
					<div class="d-flex">
						<button @click="switchTheme" class="btn btn-outline-success">Switch</button>
					</div>
				</div>
			</div>
		</nav>
		<div class="container py-2">
			<h2>Bootstrap 5 <span class="text-capitalize" id="darkTheme">dark</span> Theme</h2>
			<div class="d-flex justify-content-between">
				<button class="btn btn-primary">Primary</button>
				<button class="btn btn-secondary">Secondary</button>
				<button class="btn btn-info">Info</button>
				<button class="btn btn-success">Success</button>
				<button class="btn btn-danger">Danger</button>
				<button class="btn btn-dark">Dark</button>
				<button class="btn btn-light">Light</button>
			</div>

			<span style="color: var(--bs-success)">--bs-success text</span>
			<p>plain text</p>
			<div class="bg-light p-3 text-dark">bg-light</div>
			<div class="bg-primary p-3 text-light">bg-primary</div>
			<BSdataTable> </BSdataTable>

			<div class="accordion accordion-dark" id="accordionExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingOne">
						<button
							class="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="true"
							aria-controls="collapseOne"
						>
							Accordion Item #1
						</button>
					</h2>
					<div
						id="collapseOne"
						class="accordion-collapse collapse show"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample"
					>
						<div class="accordion-body">
							<strong>This is the first item's accordion body.</strong> It is shown by default,
							until the collapse plugin adds the appropriate classes that we use to style each
							element. These classes control the overall appearance, as well as the showing and
							hiding via CSS transitions. You can modify any of this with custom CSS or overriding
							our default variables. It's also worth noting that just about any HTML can go within
							the <code>.accordion-body</code>, though the transition does limit overflow.
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingTwo">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseTwo"
							aria-expanded="false"
							aria-controls="collapseTwo"
						>
							Accordion Item #2
						</button>
					</h2>
					<div
						id="collapseTwo"
						class="accordion-collapse collapse"
						aria-labelledby="headingTwo"
						data-bs-parent="#accordionExample"
					>
						<div class="accordion-body">
							<strong>This is the second item's accordion body.</strong> It is hidden by default,
							until the collapse plugin adds the appropriate classes that we use to style each
							element. These classes control the overall appearance, as well as the showing and
							hiding via CSS transitions. You can modify any of this with custom CSS or overriding
							our default variables. It's also worth noting that just about any HTML can go within
							the <code>.accordion-body</code>, though the transition does limit overflow.
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingThree">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseThree"
							aria-expanded="false"
							aria-controls="collapseThree"
						>
							Accordion Item #3
						</button>
					</h2>
					<div
						id="collapseThree"
						class="accordion-collapse collapse"
						aria-labelledby="headingThree"
						data-bs-parent="#accordionExample"
					>
						<div class="accordion-body">
							<strong>This is the third item's accordion body.</strong> It is hidden by default,
							until the collapse plugin adds the appropriate classes that we use to style each
							element. These classes control the overall appearance, as well as the showing and
							hiding via CSS transitions. You can modify any of this with custom CSS or overriding
							our default variables. It's also worth noting that just about any HTML can go within
							the <code>.accordion-body</code>, though the transition does limit overflow.
						</div>
					</div>
				</div>
			</div>

			<div class="py-5">
				<h1 class="text-center">Twitch-Stream Downloader</h1>
			</div>
		</div>
	</div>
</template>
<script>
import BSdataTable from './components/BSdataTable.vue';
export default {
	components: { BSdataTable },
	methods: {
		switchTheme() {
			console.log(123);
			const out = document.body.classList.toggle('dark');
			console.log(out);

			[...document.querySelectorAll('table.table')].forEach((e) =>
				e.classList.toggle('text-white', out)
			);

			[...document.querySelectorAll('nav.navbar')].forEach((e) => {
				e.classList.toggle('bg-light', !out);
				e.classList.toggle('bg-dark', out);
				e.classList.toggle('navbar-dark', out);
			});
		},
	},
};
</script>
<style lang="scss">
@import '../node_modules/bootstrap/scss/_functions';
@import '../node_modules/bootstrap/scss/_variables';
@import '../node_modules/bootstrap/scss/_mixins';

.dark {
	/*$enable-gradients: true;*/

	/* redefine theme colors for dark theme */
	$primary: #0050d8;
	$secondary: #68788f;
	$success: #3cb690;
	$dark: #253649;
	$info: #1d9fff;
	$light: #aaa;

	$theme-colors: (
		'primary': $primary,
		'secondary': $secondary,
		'success': $success,
		'danger': $danger,
		'info': $info,
		'dark': $dark,
		'light': $light,
	);

	/* redefine theme color variables */
	@each $color, $value in $theme-colors {
		--#{$variable-prefix}#{$color}: #{$value};
	}

	$theme-colors-rgb: map-loop($theme-colors, to-rgb, '$value');

	@each $color, $value in $theme-colors-rgb {
		--#{$variable-prefix}#{$color}-rgb: #{$value};
	}

	$body-color: $dark;
	$body-bg: #1f2d3d;
	$accordion-button-active-color: $info;
	$accordion-button-active-bg: $dark;
	$accordion-bg: #1f2d3d;

	$accordion-color: $primary;

	$headings-color: $light;

	--#{$variable-prefix}body-color: #{$body-color};
	--#{$variable-prefix}body-bg: #{$body-bg};

	@import '../node_modules/bootstrap/scss/bootstrap';
}

@import '../node_modules/bootstrap/scss/bootstrap';
</style>
