<script setup>
import {defineEmits} from 'vue';

defineEmits(['onSubmit'])
</script>

<template>
  <button @click="$emit('onSubmit')" class="py-4 sm:py-5 w-full rounded-xl bg-gold-gradient text-white mt-7 text-xl">
    Оплатить
  </button>
</template>