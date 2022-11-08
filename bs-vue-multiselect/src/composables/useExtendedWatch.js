import { computed, watch } from 'vue'

export function useExtendedWatch(object, changeFn) {

  const watchStr = computed(() => {
    return JSON.stringify(object);
  });

  watch(watchStr, (newValue, oldValue) => {
    changeFn(newValue, oldValue);
  });
}