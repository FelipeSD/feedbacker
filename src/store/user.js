import { reactive } from 'vue';

const userInitialState = {
  currentUser: {}
};

let state = reactive(userInitialState);

export default state;

export function resetUserStore () {
  state = reactive(userInitialState);
}

export function setCurrentUser (user) {
  state.currentUser = user;
}

export function setApiKey (apiKey) {
  state.currentUser = { ...state.currentUser, apiKey };
}

export function clearCurrentUser () {
  state.currentUser = {};
}
