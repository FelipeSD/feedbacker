<template>
  <custom-header
    @create-account="handleCreateAccount()"
    @login="handleLogin()"
  />
  <contact />
  <footer class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">
      feedbacker Copyright © 2022
    </p>
  </footer>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import CustomHeader from './CustomHeader';
import Contact from './Contact';
import useModal from '@h/useModal';

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter();
    const modal = useModal();

    onMounted(() => {
      const token = window.localStorage.getItem('token');

      if (token) {
        router.push({ name: 'Feedbacks' });
      }
    });

    function handleLogin () {
      modal.open({
        component: 'ModalLogin'
      });
    }

    function handleCreateAccount () {
      modal.open({
        component: 'ModalCreateAccount'
      });
    }

    return {
      handleLogin,
      handleCreateAccount
    };
  }
};
</script>
