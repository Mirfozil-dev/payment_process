<script setup>
import VisaMasterCardIcon from "@/components/icons/VisaMasterCardIcon.vue";
</script>

<template>
  <article
      class="flex flex-1 items-center sm:gap-3 gap-1.5 pl-3 sm:pl-5 h-16 bg-white rounded-xl shadow-[0px_0px_10px_0px_#0000000F] hover:shadow-[0px_0px_20px_0px_#0000001A] cursor-pointer transition-shadow">
    <visa-master-card-icon class="w-9 sm:w-12"/>
    <div class="flex flex-col">
      <h5 class="font-medium text-neutral-800 text-[13px] sm:text-xl">Картой РФ</h5>
      <p class="text-neutral-800 text-opacity-60 text-[11px] sm:text-sm">
        Комиссия: <span class="font-medium text-neutral-800">8%</span>
      </p>
    </div>
  </article>
</template>
