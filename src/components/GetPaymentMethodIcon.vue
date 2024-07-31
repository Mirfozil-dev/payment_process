<script setup>
import {defineProps} from "vue";
import CryptomusIcon from "@/components/icons/CryptomusIcon.vue";
import VisaMasterCardIcon from "@/components/icons/VisaMasterCardIcon.vue";
import PayeerIcon from "@/components/icons/PayeerIcon.vue";
import PaypalIcon from "@/components/icons/PaypalIcon.vue";
import MirIcon from "@/components/icons/MirIcon.vue";
import SBPIcon from "@/components/icons/SBPIcon.vue";
import SteamPayIcon from "@/components/icons/SteamPayIcon.vue";

const getMethodIcon = (method) => {
  switch (method) {
    case 'cryptomus':
      return CryptomusIcon
    case 'card':
      return VisaMasterCardIcon
    case 'payeer':
      return PayeerIcon
    case 'paypal':
      return PaypalIcon
    case 'card_usd':
      return VisaMasterCardIcon
    case 'mir':
      return MirIcon
    case 'sbp':
      return SBPIcon
    case 'steampay':
      return SteamPayIcon
  }
}

defineProps({
  payment_method: String,
})
</script>

<template>
  <component :is="getMethodIcon(payment_method)"/>
</template>