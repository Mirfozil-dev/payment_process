<script setup>
import GetCurrencyIcon from "@/components/GetCurrencyIcon.vue";
import {defineEmits, defineProps} from 'vue'

const props = defineProps(['currency'])
defineEmits('selectCurrency')
</script>

<template>
  <article
      @click="$emit('selectCurrency', currency)"
      class="flex h-16 px-6 rounded-xl shadow-[0px_0px_15px_0px_#0000000F] items-center cursor-pointer">
    <div class="flex gap-2.5">
      <get-currency-icon :currency="currency" class="w-7"/>
      <p class="my-auto">{{ currency }}</p>
    </div>
  </article>
</template>

<style scoped>

</style>