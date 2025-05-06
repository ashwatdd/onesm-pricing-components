<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
const model = defineModel()
</script>

<template>
  <span
    class="h-6 w-11 shrink-0
    inline-flex border-2 border-neutral-300 rounded-full
    transition-colors duration-75
    cursor-pointer"
    :class="{ 'bg-violet-500': model }"
  >
    <input
      :id="props.name" v-model="model"
      type="checkbox" :name="props.name"
      class="sr-only"
    >

    <span
      class="h-5 w-5 rounded-full bg-neutral-500 transition-transform duration-75"
      :class="{ 'translate-x-5': model }"
    />
  </span>
</template>

<style scoped>

</style>
