import useStore from '@h/useStore';
import { setCurrentUser, resetUserStore, setApiKey, clearCurrentUser } from './user';

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore();
  });

  it('should set current user', () => {
    const store = useStore();
    setCurrentUser({ name: 'name' });
    expect(store.User.currentUser.name).toBe('name');
  });

  it('should set api_key on current user', () => {
    const store = useStore();
    setApiKey('1234');
    expect(store.User.currentUser.apiKey).toBe('1234');
  });

  it('should clean current user', () => {
    const store = useStore();
    setCurrentUser({ name: 'name' });
    expect(store.User.currentUser.name).toBe('name');
    clearCurrentUser();
    expect(store.User.currentUser.name).toBeFalsy();
  });
});
