import { reactive } from 'vue';

const state = reactive({
  isLoading: false
});

export default state;

export function setGlobalLoading (isLoading) {
  state.isLoading = isLoading;
}
