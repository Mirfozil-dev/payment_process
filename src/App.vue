<script setup>


import Tooltip from "@/components/UI/Tooltip.vue";
import BitcoinIcon from "@/components/icons/BitcoinIcon.vue";
import RussiaIcon from "@/components/icons/RussiaIcon.vue";
import CurrenciesIcon from "@/components/icons/CurrenciesIcon.vue";
import DropdownIcon from "@/components/icons/DropdownIcon.vue";
import PaymentMethodCard from "@/components/PaymentMethodCard.vue";
import AttentionIcon from "@/components/icons/AttentionIcon.vue";
import {ref, watch} from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

const prices = [1000, 2000, 5000, 10000, 20000, 50000]

const selectedPrice = ref(null)
const selectedPaymentMethod = ref(null)
const paymentAmountError = ref(null)

const selectPrice = (price) => {
  selectedPrice.value = price
}
const countryInfoDropdown = ref(false)
const otherCurrencies = ref(false)

const toggleCountryInfo = () => {
  countryInfoDropdown.value = !countryInfoDropdown.value
}
const toggleOtherCurrencies = () => {
  otherCurrencies.value = !otherCurrencies.value
}

const startTransition = (el) => {
  el.style.height = el.scrollHeight + 'px'
}

const endTransition = (el) => {
  el.style.height = ''
}

watch(selectedPrice, (newVal) => {
  if (newVal !== '' && newVal < 1000) {
    paymentAmountError.value = 'Внимание, минимальная сумма 1.000₽'
  } else {
    paymentAmountError.value = null
  }

  // any other input validations can be added here
})
</script>

<template>
  <main class="container mx-auto pt-10 sm:py-20 sm:px-0 px-4 py-6">
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
          class="flex h-16 px-4 sm:px-6 rounded-xl shadow-[0px_0px_15px_0px_#0000000F] relative items-center">
        <span class="bg-gold-gradient px-1.5 py-0.5 text-xs text-white rounded-[100px] absolute top-0.5 right-0.5">
          Рекомендуем
        </span>
        <div class="flex gap-2.5">
          <bitcoin-icon class="w-6 h-6"/>
          <p class="my-auto">Криптовалюты</p>
        </div>
      </article>
      <article
          class="flex h-16 px-3 sm:px-5 rounded-xl shadow-[0px_0px_15px_0px_#0000000F] relative items-center">
        <div
            class="flex gap-3 py-3 pr-4 sm:pr-5 sm:pl-4 text-base whitespace-nowrap border-r border-black border-opacity-10">
          <russia-icon class="shrink-0 w-7 aspect-square"/>
          <span class="my-auto">RUB</span>
        </div>
        <div @click="toggleOtherCurrencies()"
             class="flex gap-2.5 items-center py-3 sm:pr-4 pl-3 my-auto text-sm cursor-pointer">
          <currencies-icon class="shrink-0 self-stretch w-6 aspect-square"/>
          <p>Другие валюты</p>
          <dropdown-icon :class="otherCurrencies ? 'scale-y-[-1]' : 'scale-y-1'" class="w-4 transition-transform"/>
        </div>
      </article>
    </section>
    <transition
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition"
    >
      <section v-if="otherCurrencies" class="flex gap-4 mt-4 overflow-hidden">
        <article v-for="id in 10" :key="id"
                 class="flex h-16 px-6 rounded-xl shadow-[0px_0px_15px_0px_#0000000F] items-center">
          <div class="flex gap-2.5">
            <russia-icon class="shrink-0 w-7 aspect-square"/>
            <p class="my-auto">RUB</p>
          </div>
        </article>
      </section>
    </transition>
    <h5 class="mt-[30px]">
      Выберите способ оплаты
    </h5>

    <section
        class="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 overflow-y-scroll h-[214px] py-2 sm:py-5 sm:pr-4">
      <payment-method-card v-for="id in 15" :key="id"
                           class="active:border-gold-gradient border-solid border-2 border-transparent transition-all"/>
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
    <transition
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition"
    >
      <p v-if="countryInfoDropdown" class="mt-2.5 overflow-hidden">
        Зачисление до 6 минут
        <p class="mt-2.5">
          Эта платежная система не принимает платежи из стран: <br>
          Армения, Австрия, Азербайджан, Бельгия, Болгария, Кипр, Чешская Республика, Дания, Эстония, Финляндия,
          Франция,
          Грузия, Германия, Греция, Венгрия, Исландия, Ирландия, Испания, Италия, Кыргызстан, Латвия, Литва, Люксембург,
          Мальта, Румыния, Сербия и Черногория, Словакия, Словения, Швеция, Швейцария, Таджикистан, Турция,
          Туркменистан,
          Соединенное Королевство, Узбекистан, Австралия, Норвегия, Израиль, Португалия, Нидерланды, Саудовская Аравия,
          Объединенные Арабские Эмираты, Сингапур, Новая Зеландия, Хорватия, Польша, Бруней-Даруссалам, Перу, Южная
          Корея,
          Катар, Египет.
        </p>
      </p>
    </transition>
    <h5 class="mt-5 sm:mt-[30px]">
      Укажите сумму платежа
    </h5>
    <div
        :class="paymentAmountError ? 'border-[#E86068] outline-0' : 'border-transparent'"
        class="flex items-center px-4 sm:px-5 py-4 mt-4 w-full text-sm sm:text-base bg-white rounded-xl outline outline-[#0000001A] transition-all
         border-solid border-2 hover:outline-[#0000004D]">
      <input
          class="outline-0 w-full text-neutral-800"
          v-model.number="selectedPrice"
          type="number"
          placeholder="Минимальная сумма платежа: 1.000₽"
      />
      <button>
        <close-icon v-show="selectedPrice" @click="selectedPrice = ''"/>
      </button>
    </div>
    <transition
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition"
    >
      <p v-if="paymentAmountError" class="overflow-hidden text-[#E86068]">{{ paymentAmountError }}</p>
    </transition>
    <section
        class="flex gap-2.5 self-start sm:py-0 py-1.5 mt-2.5 text-sm font-medium whitespace-nowrap overflow-x-scroll w-full">
      <button v-for="price in prices" :key="price"
              :class="{ 'border-gold-gradient bg-white text-opacity-100': price === selectedPrice }"
              class="px-3 py-2 rounded-xl bg-neutral-800 bg-opacity-5 text-neutral-800 text-opacity-60 hover:text-opacity-100
              transition-all duration-300 border-2 border-transparent border-solid"
              @click="selectPrice(price)" :aria-pressed="selectedPrice === price">
        {{ price }}₽
      </button>
    </section>
    <button class="py-4 sm:py-5 w-full rounded-xl bg-gold-gradient text-white mt-7 text-xl">
      Оплатить
    </button>
  </main>
</template>


<style>
.v-enter-active,
.v-leave-active {
  will-change: height;
  transition: height 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  height: 0 !important;
}
</style>