<script setup>
import {defineProps} from 'vue'

const startTransition = (el) => {
  el.style.height = el.scrollHeight + 'px'
}

const endTransition = (el) => {
  el.style.height = ''
}

defineProps(['show'])
</script>

<template>
  <transition
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
  >
    <div v-if="show" class="overflow-hidden p-2 m-[-8px]">
      <slot/>
    </div>
  </transition>
</template>

<style scoped>
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