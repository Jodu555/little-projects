<template>
	<div class="modal fade" :id="id" tabindex="-1" aria-labelledby="" aria-hidden="true" ref="modalEle">
		<div class="modal-dialog" :class="`modal-${size}`">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" :id="id + 'Label'">
						<slot name="title"> </slot>
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<slot name="body" />
				</div>
				<div class="modal-footer">
					<slot name="footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Modal } from 'bootstrap';
const props = defineProps({
	id: {
		type: String,
		default: 'exampleModal',
	},
	show: {
		type: Boolean,
	},
	handleClose: {
		type: Function,
	},
	size: {
		type: String,
		default: '',
	},
});
let modalEle = ref(null);
let thisModalObj = null;

onMounted(() => {
	thisModalObj = new Modal(modalEle.value);
	modalEle.value.addEventListener('hide.bs.modal', onHide);
	modalEle.value.addEventListener('show.bs.modal', onShow);
});

onUnmounted(() => {
	if (modalEle.value) {
		modalEle.value.removeEventListener('hide.bs.modal', onHide);
		modalEle.value.removeEventListener('show.bs.modal', onShow);
	}
});

const onHide = () => {
	console.log('onHide');
	props.handleClose();
};

const onShow = () => {
	console.log('onShow');
};

watch(
	() => props.show,
	(newX) => {
		newX && thisModalObj.show();
		!newX && thisModalObj.hide();
	}
);

// function _show() {
// 	thisModalObj.show();
// }

// defineExpose({ show: _show });
</script>
<style lang=""></style>
