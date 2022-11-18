import { computed, onMounted, ref, watch } from 'vue';
import networking from './networking';

export default function useFetch(method, url) {
	const loading = ref(true);
	const error = ref(false);
	const data = ref({});
	const statistics = ref({});
	onMounted(async () => {
		load();
	});
	const load = async () => {
		loading.value = true;
		error.value = false;
		try {
			const response = await networking[method](url);
			data.value = response.data;
			statistics.value = response.customData;
			console.log(`response`, response);
			loading.value = false;
		} catch (e) {
			loading.value = false;
			error.value = e.message;
		}
	};
	return {
		loading,
		error,
		data,
		reload: load,
		statistics,
	};
}
