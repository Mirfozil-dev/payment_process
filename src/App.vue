<script setup>


import Tooltip from "@/components/UI/Tooltip.vue";
import CurrenciesIcon from "@/components/icons/CurrenciesIcon.vue";
import DropdownIcon from "@/components/icons/DropdownIcon.vue";
import PaymentMethodCard from "@/components/PaymentMethodCard.vue";
import AttentionIcon from "@/components/icons/AttentionIcon.vue";
import {computed, onMounted, ref} from "vue";
import GetCurrencyIcon from "@/components/GetCurrencyIcon.vue";
import axiosInstance from "@/mock.js";
import SubmitBtn from "@/components/SubmitBtn.vue";
import AmountInput from "@/components/AmountInput.vue";
import AccordionAnimation from "@/components/UI/AccordionAnimation.vue";
import CurrencyCard from "@/components/CurrencyCard.vue";

const selectedPrice = ref(null)
const selectedCurrency = ref(null)
const selectedPaymentMethod = ref(null)
const currencies = ref([])
const cryptoSelected = ref(false)
const countryInfoDropdown = ref(false)
const otherCurrencies = ref(false)

const toggleCountryInfo = () => {
  countryInfoDropdown.value = !countryInfoDropdown.value
}
const toggleOtherCurrencies = () => {
  otherCurrencies.value = !otherCurrencies.value
}

const filteredCurrencies = computed(() => {
  return currencies.value ? Object.keys(currencies.value).filter(k => k !== selectedCurrency.value && k !== 'CRYPTO') : []
})

const paymentMethods = computed(() => cryptoSelected.value ? currencies.value.CRYPTO : currencies.value[selectedCurrency.value])

const onSubmit = () => {
  if (selectedPaymentMethod.value) {
    axiosInstance.post('/api/ui/payments/invoice/create/', {
      currency: cryptoSelected.value ? 'CRYPTO' : selectedCurrency.value,
      method: selectedPaymentMethod.value.code,
      amount: selectedPrice.value
    }).then((res) => {
      if (res.data.success) {
        alert(`Invoice created successfully. \n ${res.data.data.url}`)
      }
    }).catch(er => {
      console.log(er)
    })
  }
}
const selectCurrency = (currency) => {
  selectedCurrency.value = currency
  cryptoSelected.value = false
  selectedPaymentMethod.value = null
  selectedPrice.value = null
}
onMounted(() => {
  axiosInstance.get('/api/ui/payment/info')
      .then(res => {
        if (res.data.success) {
          selectedCurrency.value = res.data.data.default_currency
          currencies.value = res.data.data.currencies

          console.log(currencies.value[selectedCurrency.value]);
        }
      })
      .catch(err => {
        console.log(err)
      })
})
</script>

<template>
  <main class="container mx-auto pt-10 sm:py-20 sm:px-0 px-[15px] py-6">
    <h2 class="sm:font-semibold font-medium">Пополните баланс, <span class="opacity-60">чтобы получить номер для приема смс</span>
    </h2>
    <section class="flex items-center mt-2">
      <h5 class="mr-0.5">
        Выберите валюту оплаты
      </h5>
      <tooltip text="Тут выбирается способ которым вы будете оплачивать"/>
    </section>
    <section class="flex gap-4 mt-4 max-md:flex-wrap">
      <article
          @click="cryptoSelected = true"
          class="flex h-16 px-4 sm:px-6 rounded-xl shadow-[0px_0px_15px_0px_#0000000F] relative items-center cursor-pointer"
      >
        <span class="bg-gold-gradient px-1.5 py-0.5 text-xs text-white rounded-[100px] absolute top-0.5 right-0.5">
          Рекомендуем
        </span>
        <div class="flex gap-2.5">
          <get-currency-icon currency="CRYPTO" class="w-6 h-6"/>
          <p class="my-auto">Криптовалюты</p>
        </div>
      </article>
      <article
          class="flex h-16 px-3 sm:px-5 rounded-xl shadow-[0px_0px_15px_0px_#0000000F] relative items-center">
        <div
            class="flex gap-3 py-3 pr-4 sm:pr-5 sm:pl-4 text-base whitespace-nowrap border-r border-black border-opacity-10">
          <get-currency-icon :currency="selectedCurrency" class="w-7"/>
          <span class="my-auto">{{ selectedCurrency }}</span>
        </div>
        <div @click="toggleOtherCurrencies()"
             class="flex gap-2.5 items-center py-3 sm:pr-4 pl-3 my-auto text-sm cursor-pointer">
          <currencies-icon class="shrink-0 self-stretch w-6 aspect-square"/>
          <p>Другие валюты</p>
          <dropdown-icon :class="otherCurrencies ? 'scale-y-[-1]' : 'scale-y-1'" class="w-4 transition-transform"/>
        </div>
      </article>
    </section>
    <AccordionAnimation :show="otherCurrencies">
      <section class="flex gap-4 mt-4 p-2 w-full m-[-8px]">
        <currency-card v-for="currency in filteredCurrencies" :key="currency" :currency="currency"
                       @selectCurrency="selectCurrency"/>
      </section>
    </AccordionAnimation>
    <h5 class="mt-[30px]">
      Выберите способ оплаты
    </h5>

    <section
        class="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 overflow-y-scroll h-full max-h-[214px] py-2 sm:py-5 px-3 sm:pr-0 mx-[-12px]">
      <payment-method-card
          v-for="method in paymentMethods" :key="method.code" :paymentMethod="method"
          @click="selectedPaymentMethod = method"
          :class="{ 'border-gold-gradient': selectedPaymentMethod && method.code === selectedPaymentMethod.code}"
          class=" border-solid border-2 border-transparent transition-all"
      />
    </section>
    <section
        class="flex gap-1.5 mt-4 items-center cursor-pointer"
        @click="toggleCountryInfo()"
    >
      <div class="flex gap-1.5 items-center">
        <attention-icon class="w-4"/>
        <p class="font-semibold">
          Внимание, при нажатии раскрывается информация про страны
        </p>
      </div>
      <dropdown-icon :class="countryInfoDropdown ? 'scale-y-[-1]' : 'scale-y-1'" class="w-4 transition-transform"/>
    </section>
    <accordion-animation :show="countryInfoDropdown">
      <p
          v-html="selectedPaymentMethod ? selectedPaymentMethod.description : 'Выберите способ оплаты'"
          class="mt-2.5 overflow-hidden"/>
    </accordion-animation>
    <h5 class="mt-5 sm:mt-[30px]">
      Укажите сумму платежа
    </h5>
    <amount-input v-model="selectedPrice" :selected-payment-method="selectedPaymentMethod"/>
    <submit-btn @on-submit="onSubmit()"/>
  </main>
</template>