<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
              @select="changeFeedbackType"
            />
          </template>
          <template #fallback> <filters-loading class="mt-8" /> </template>
        </suspense>
      </div>
      <div class="col-span-3 px-10 pt-20">
        <p
          class="text-lg text-center text-gray-800 front-regular"
          v-if="state.hasError"
        >
          Aconteceu um erro ao carregar os feedbacks :(
        </p>
        <p
          class="text-lg text-center text-gray-800 front-regular"
          v-if="
            state.feedbacks.length === 0 &&
            !state.isLoading &&
            !state.isLoadingFeedbacks &&
            !state.hasError
          "
        >
          Ainda nenhum feedback recebido
        </p>

        <feedback-card-loading
          v-if="state.isLoading || state.isLoadingFeedbacks"
        />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />

        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '@c/HeaderLogged';
import FeedbackCard from '@c/FeedbackCard';
import FeedbackCardLoading from '@c/FeedbackCard/Loading';
import Filters from './Filters';
import FiltersLoading from './FiltersLoading';
import { onErrorCaptured, onMounted, onUnmounted, reactive } from 'vue';
import services from '@/services';

export default {
  components: {
    Filters,
    HeaderLogged,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },
  setup () {
    const state = reactive({
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      hasError: false,
      feedbacks: [],
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0,
        total: 0
      }
    });

    onMounted(() => {
      fetchFeedbacks();
      window.addEventListener('scroll', handleScroll, false);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false);
    });

    onErrorCaptured(handleErrors);

    function handleErrors (error) {
      state.isLoading = false;
      state.isLoadingFeedbacks = false;
      state.isLoadingMoreFeedbacks = false;
      state.hasError = !!error;
    }

    async function handleScroll () {
      const isBottom = Math.ceil(
        document.documentElement.scrollTop + window.innerHeight
      ) >= document.documentElement.scrollHeight;

      if (state.isLoadingFeedbacks || state.isLoadingMoreFeedbacks) return;
      if (!isBottom) return;
      if (state.feedbacks.length >= state.pagination.total) return;

      try {
        state.isLoadingMoreFeedbacks = true;

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: state.pagination.offset + state.pagination.limit
        });

        if (data.results.length > 0) {
          state.feedbacks.push(...data.results);
        }

        state.isLoadingMoreFeedbacks = false;
        state.pagination = data.pagination;
      } catch (error) {
        handleErrors(error);
      }
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true;
        state.hasError = false;
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoading = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    async function changeFeedbackType (type) {
      try {
        state.isLoadingFeedbacks = true;
        state.pagination.offset = 0;
        state.pagination.limit = 5;
        state.hasError = false;
        state.currentFeedbackType = type;

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoadingFeedbacks = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    return { state, changeFeedbackType };
  }
};
</script>

<style>
</style>
