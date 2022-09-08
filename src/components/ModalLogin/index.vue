<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button class="text-4xl text-gray-600" @click="close">&times;</button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          class="
            w-full
            px-4
            py-2
            mt-1
            text-lg
            bg-gray-100
            border border-transparent
            rounded-md
            focus:outline-none focus:border-brand-blue
          "
          :class="{
            'border-brand-danger': !!state.email.errorMesssage,
          }"
          placeholder="Digite seu email"
          type="email"
          v-model="state.email.value"
        />
        <span
          v-if="!!state.email.errorMesssage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMesssage }}</span
        >
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          class="
            w-full
            px-4
            py-2
            mt-1
            text-lg
            bg-gray-100
            border border-transparent
            rounded-md
            focus:outline-none focus:border-brand-blue
          "
          :class="{
            'border-brand-danger': !!state.password.errorMesssage,
          }"
          placeholder="Digite sua senha"
          type="password"
          v-model="state.password.value"
        />
        <span
          v-if="!!state.password.errorMesssage"
          class="block font-medium text-brand-danger"
          >{{ state.password.errorMesssage }}</span
        >
      </label>

      <button
        :disabled="state.isLoading"
        :class="{ 'opacity-50': state.isLoading }"
        class="
          px-8
          py-3
          mt-10
          text-2xl
          font-bold
          text-white
          bg-brand-main
          rounded-full
          transition-all
          duration-150
        "
      >
        <icon name="loading" class="animate-spin" v-if="state.isLoading" />
        <span v-if="!state.isLoading">Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useField } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { validateEmptyAndLength3, validateEmptyAndEmail } from '@u/validators';
import useModal from '@h/useModal';
import services from '@s/index';
import Icon from '@c/Icon';

export default {
  components: {
    Icon
  },
  watch: {
    'state.email.value' (value) {
      console.log('email', value, this.state.email.errorMesssage);
    }
  },
  setup () {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const {
      value: emailValue,
      errorMesssage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail);

    const {
      value: passwordValue,
      errorMesssage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3);

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMesssage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMesssage: passwordErrorMessage
      }
    });

    async function handleSubmit () {
      try {
        toast.clear();
        state.isLoading = true;

        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        });

        if (!errors) {
          window.localStorage.setItem('token', data.token);
          router.push({ name: 'Feedbacks' });
          modal.close();
          state.isLoading = false;
          return;
        }

        if (errors.status === 404) {
          toast.error('Usuário não encontrado');
        } else if (errors.status === 401) {
          toast.error('E-mail ou senha incorreta');
        } else if (errors.status === 400) {
          toast.error('Ocorreu um erro inesperado');
        }

        state.isLoading = false;
      } catch (error) {
        state.hasErrors = !!error;
        state.isLoading = false;
        toast.error('Ocorreu ao tentar fazer login');
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    };
  }
};
</script>

<style>
</style>
