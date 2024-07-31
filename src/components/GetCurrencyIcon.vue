<script setup>
import BitcoinIcon from "@/components/icons/BitcoinIcon.vue";
import RussiaIcon from "@/components/icons/RussiaIcon.vue";
import UnitedStatesIcon from "@/components/icons/UnitedStatesIcon.vue";
import {defineProps} from "vue";

const getCurrencyIcon = (cur) => {
  switch (cur) {
    case 'RUB':
      return RussiaIcon
    case 'USD':
      return UnitedStatesIcon
    case 'CRYPTO':
      return BitcoinIcon
  }
}

defineProps({
  currency: String,
})
</script>

<template>
  <component :is="getCurrencyIcon(currency)"/>
</template>
