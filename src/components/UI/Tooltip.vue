<script setup>
import InfoIcon from "@/components/icons/InfoIcon.vue";
import {defineProps, ref} from 'vue'

const active = ref(false)

const props = defineProps({
  text: String,
})

const setActive = val => {
  active.value = val
}
</script>

<template>
  <div class="relative">
    <info-icon :color="active ? '#000' : '#CACACA'" class="w-6 h-6"
               @mouseover="setActive(true)"
               @mouseout="setActive(false)"/>
    <p class="tooltip bg-white" :class="{ 'show': active }">{{ text }}</p>
  </div>
</template>

<style scoped>
.tooltip {
  width: 275px;
  box-shadow: 0 0 20px 0 #00000014;
  padding: 8px 12px 8px 12px;
  border-radius: 10px;
  position: absolute;
  z-index: -1;
  opacity: 0;
  top: 25px;
  left: 0;
  transition: 0.3s;
  transform: translateY(-10px);
}

.tooltip.show {
  z-index: 1;
  opacity: 1;
  transform: translateY(0);
}

@media screen and (max-width: 550px) {
  .tooltip {
    left: -100px;
    width: 215px;
  }
}
</style>