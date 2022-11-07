import { computed, watch } from 'vue'

export function useExtendedWatch(object, changeFn) {

  const watchStr = computed(() => {
    console.log('watchStr');
    return JSON.stringify(object);
  });

  watch(watchStr, (newValue, oldValue) => {
    // console.log(`newValue`, newValue);
    // console.log(`oldValue`, oldValue);
    changeFn(newValue, oldValue);
  });
}