import { onMounted, ref } from 'vue';
import networking from './networking';

export default function useFetch(immediate = true) {
	const execute = (method, url, body) => {
		const loading = ref(false);
		const error = ref(false);
		const data = ref({});
		const statistics = ref({});
		if (immediate) {
			onMounted(async () => {
				load();
			});
		}
		const load = async () => {
			loading.value = true;
			error.value = false;
			try {
				const response = await networking[method](url, body);
				data.value = response.data;
				statistics.value = response.customData;
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
	};
	return {
		get: (url) => {
			return execute('get', url);
		},
		post: (url, body) => {
			return execute('post', url, body);
		},
	};
}

export function useOther(method, url, body) {
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
			const response = await networking[method](url, body);
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
