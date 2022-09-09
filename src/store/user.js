import { reactive } from 'vue';

const state = reactive({
  currentUser: {}
});

export default state;

export function setCurrentUser (user) {
  state.currentUser = user;
}

export function setApiKey (apiKey) {
  state.currentUser = { ...state.currentUser, apiKey };
}

export function clearCurrentUser () {
  state.currentUser = {};
}
