<script>
export default {
	data() {
		return {
			// store,
		};
	},

	props: {
		searchItem: Object,
		itemType: String,
		isActive: Boolean,
	},

	computed: {
		languageFix() {
			switch (this.searchItem.original_language) {
				case 'en':
					return 'gb';

				case 'ja':
					return 'jp';

				case 'zh':
					return 'cn';

				case 'ko':
					return 'kr';

				default:
					return this.searchItem.original_language;
			}
		},
	},

	methods: {
		voteWithStars() {
			return Math.ceil(this.searchItem.vote_average / 2);
		},
	},
};
</script>

<template>
	<div class="carousel-card" :class="{ active: isActive }">
		<div class="carousel-card-image">
			<img :src="searchItem.url" />
		</div>

		<div class="carousel-card-details">
			<div class="title"><span>Title:</span> {{ searchItem.title.split(' ').slice(0, 10).join(' ').trim() }}</div>
			<div><span>Year:</span> {{ searchItem.infos?.startDate || '?' }} - {{ searchItem.infos?.endDate || '?' }}</div>
			<div><span>Overview:</span> {{ searchItem.infos.description?.split(' ').slice(0, 30).join(' ').trim() }}...</div>
			<br />
			<div><span>ID:</span> {{ searchItem.ID }}</div>
			<br />
			<a :href="`http://cinema.jodu555.de/watch?id=${searchItem.ID}`" target="_blank" class="btn btn-outline-primary">Play</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.carousel-card {
	cursor: pointer;
	transition: all 0.5s;
	border-radius: 20px;

	padding: 30px 10px;

	&:hover,
	&.active {
		transform: scale(1.15);
		border-radius: 20px;
	}

	&:hover .carousel-card-image img,
	&.active .carousel-card-image img {
		transition: opacity 0.2s ease-in-out;
		opacity: 0.1;
		border-radius: 20px;
	}

	.carousel-card-image {
		img {
			// max-width: 20vw;
			// min-width: 20vw;
			max-width: 18rem;
			min-width: 17rem;
			// max-width: 17rem;
			// min-width: 16rem;
			min-height: 24rem;
			max-height: 20rem;
			width: 100%;
			object-fit: cover;
			border-radius: 20px;
		}
	}

	.carousel-card-details {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.8em;
		width: 70%;
		height: 70%;
		transition: all 0.5s;
		overflow: hidden;
		overflow-y: auto;

		.title {
			text-transform: uppercase;
			font-weight: bold;
		}
	}

	&:hover .carousel-card-details,
	&.active .carousel-card-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	span {
		font-size: 1.1em;
		font-weight: bold;
		text-transform: uppercase;
		padding-right: 6px;
		color: rgb(220, 31, 43);
	}

	.fa-solid.fa-star {
		color: gold;
	}
}
</style>
