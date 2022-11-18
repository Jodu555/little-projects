import { computed, onMounted, ref, watch } from 'vue';
import networking from './networking';

export default function useFetch(method, url) {
	const loading = ref(true);
	const error = ref(false);
	const data = ref({});
	onMounted(async () => {
		try {
			const response = await networking[method](url);
			data.value = response.data;
			loading.value = false;
		} catch (e) {
			console.log('Came Error', error);
			loading.value = false;
			error.value = e.message;
		}
	});
	return {
		loading,
		error,
		data,
	};
}
