<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark">{{
        getDiffTimeBetweenCurrentDate(feedback.createdAt)
      }}</span>
    </div>
    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>

    <div
      class="flex mt-8 animate_animated animate__fadeInUp animate__faster"
      :class="{ animated__fadeOutUp: state.isClosing }"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Página
          </span>
          <span class="font-medium text-gray-700 uppercase select-none">
            {{ feedback.page }}
          </span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Dispositivo
          </span>
          <span class="font-medium text-gray-700 uppercase select-none">
            {{ feedback.device }}
          </span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">
            Usuário
          </span>
          <span class="font-medium text-gray-700 uppercase select-none">
            {{ feedback.fingerprint }}
          </span>
        </div>
      </div>

      <div class="flex justify-en mt-8" v-if="!state.isOpen">
        <icon name="chevron-down" size="24" :color="brandColors.graydark" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { getDiffTimeBetweenCurrentDate } from '@u/date';
import { wait } from '@u/timeout';
import palette from '@/../palette';
import Badge from './Badge';
import Icon from '@c/Icon';

export default {
  components: {
    Badge, Icon
  },
  props: {
    feedback: {
      type: Object,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const state = reactive({
      isOpen: props.isOpen,
      isClosing: !props.isOpen
    });

    async function handleToggle () {
      state.isClosing = true;
      await wait(250);
      state.isOpen = !state.isOpen;
    }

    return {
      state,
      brandColors: palette.brand,
      handleToggle,
      getDiffTimeBetweenCurrentDate
    };
  }
};
</script>

<style>
</style>
