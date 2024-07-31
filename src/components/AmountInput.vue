<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";
import {defineEmits, defineModel, defineProps, ref, watch} from "vue";
import AccordionAnimation from "@/components/UI/AccordionAnimation.vue";

const paymentAmountError = ref(null)
const prices = [1000, 2000, 5000, 10000, 20000, 50000]

const selectedPrice = defineModel()

const props = defineProps(['selectedPaymentMethod'])
const emit = defineEmits(["changeAmount"])

watch(selectedPrice, (newVal) => {
  if (newVal !== '' && props.selectedPaymentMethod && newVal < props.selectedPaymentMethod.min_amount) {
    paymentAmountError.value = `Внимание, минимальная сумма ${props.selectedPaymentMethod.min_amount}`
  } else {
    paymentAmountError.value = null
  }

  // any other input validations can be added here
})
</script>

<template>
  <div
      :class="paymentAmountError ? 'border-[#E86068] outline-0' : 'border-transparent'"
      class="flex items-center px-4 sm:px-5 py-4 mt-4 w-full text-sm sm:text-base bg-white rounded-xl outline outline-[#0000001A] transition-all
         border-solid border-2 hover:outline-[#0000004D]">
    <input
        class="outline-0 w-full text-neutral-800"
        v-model="selectedPrice"
        type="number"
        :readonly="!selectedPaymentMethod"
        :placeholder="selectedPaymentMethod ? `Минимальная сумма платежа: ${selectedPaymentMethod.min_amount}` : 'Выберите способ оплаты'"
    />
    <button>
      <close-icon v-show="selectedPrice" @click="selectedPrice = ''"/>
    </button>
  </div>
  <AccordionAnimation :show="paymentAmountError">
    <p class="text-[#E86068]">{{ paymentAmountError }}</p>
  </AccordionAnimation>
  <section
      class="flex gap-2.5 self-start sm:py-0 py-1.5 mt-2.5 text-sm font-medium whitespace-nowrap overflow-x-scroll w-full">
    <button v-for="price in prices" :key="price"
            :class="{ 'border-gold-gradient bg-white text-opacity-100': price === selectedPrice }"
            class="px-3 py-2 rounded-xl bg-neutral-800 bg-opacity-5 text-neutral-800 text-opacity-60 hover:text-opacity-100
              transition-all duration-300 border-2 border-transparent border-solid"
            :disabled="!selectedPaymentMethod"
            @click="selectedPrice = price">
      {{ price }}
    </button>
  </section>
</template>

<style scoped>

</style>