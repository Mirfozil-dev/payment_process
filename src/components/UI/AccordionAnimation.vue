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
    <div v-if="show" class="overflow-hidden">
      <slot/>
    </div>
  </transition>
</template>

<style scoped>

</style>