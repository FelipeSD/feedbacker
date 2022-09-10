import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import { routes } from '@/router';
import HeaderLogged from '.';

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

const mockStore = {
  currentUser: {}
};

jest.mock('@h/useStore', () => () => mockStore);

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = mount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render 3 dots when there is no user logged', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = mount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    });

    const buttonLogout = wrapper.find('#header-logout-button');
    expect(buttonLogout.text()).toBe('...');
  });

  it('should render user name when user is logged in', async () => {
    router.push('/');
    await router.isReady();

    mockStore.currentUser.name = 'name';

    const wrapper = mount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    });

    const buttonLogout = wrapper.find('#header-logout-button');
    expect(buttonLogout.text()).toContain('name');
  });
});
