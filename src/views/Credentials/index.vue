<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-full max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é a sua chave de api
      </p>
      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="
          flex
          py-3
          px-5
          mt-2
          rounded
          items-center
          justify-between
          bg-brand-gray
          w-full
          lg:w-1/2
        "
      >
        <span v-if="state.hasError">Erro ao carregar apiKey</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!state.hasError" class="flex ml-20 mr-5">
          <icon
            size="24"
            name="copy"
            class="cursor-pointer"
            :color="brandColors.graydark"
            @click="handleCopy"
          />
          <icon
            size="24"
            name="loading"
            class="cursor-pointer ml-3"
            :color="brandColors.graydark"
            @click="handleGenerateApiKey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="
          py-2
          pl-5
          pr-20
          mt-2
          rounded
          bg-brand-gray
          overflow-y-hidden overflow-x-auto
        "
      >
        <span v-if="state.hasError">Erro ao carregar script</span>
        <pre v-else>
&lt;script src="https://felipesd-feedbacker-widget.netlify.app?apiKey={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { setApiKey } from '@st/user';
import Icon from '@c/Icon';
import HeaderLogged from '@c/HeaderLogged';
import ContentLoader from '@c/ContentLoader';
import useStore from '@h/useStore';
import services from '@s';
import palette from '@/../palette';

export default {
  components: { HeaderLogged, Icon, ContentLoader },
  setup () {
    const store = useStore();
    const toast = useToast();
    const state = reactive({
      isLoading: false,
      hasError: false
    });

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true);
      }
    });

    function handleError (error) {
      state.isLoading = false;
      state.hasError = !!error;
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true;
        const { data } = await services.users.generateApiKey();
        setApiKey(data.apiKey);
        state.isLoading = false;
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }

    async function handleCopy () {
      toast.clear();
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey);
        toast.success('Copiado com sucesso');
      } catch (error) {
        console.log(error);
        toast.error('Erro ao copiar');
      }
    }

    return {
      store,
      state,
      brandColors: palette.brand,
      handleCopy,
      handleGenerateApiKey
    };
  }
};
</script>
