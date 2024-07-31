<script setup>
import {defineProps} from 'vue'
import GetPaymentMethodIcon from "@/components/GetPaymentMethodIcon.vue";

defineProps(['paymentMethod'])
</script>

<template>
  <article
      class="flex flex-1 items-center sm:gap-3 gap-1.5 pl-3 sm:pl-5 h-16 bg-white rounded-xl shadow-[0px_0px_10px_0px_#0000000F] hover:shadow-[0px_0px_20px_0px_#0000001A] cursor-pointer transition-shadow">
    <get-payment-method-icon :payment_method="paymentMethod.code" class="w-9 h-9 sm:w-12 sm:h-12"/>
    <div class="flex flex-col overflow-x-scroll scrollbar-hide">
      <h5 class="font-medium text-neutral-800 text-[13px] sm:text-xl">{{ paymentMethod.title }}</h5>
      <p class="text-neutral-800 text-opacity-60 text-[11px] sm:text-sm whitespace-nowrap">
        Комиссия: <span class="font-medium text-neutral-800">{{ paymentMethod.commission }}</span>
      </p>
    </div>
  </article>
</template>
