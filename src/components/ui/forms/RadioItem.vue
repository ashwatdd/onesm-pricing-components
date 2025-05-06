<script setup lang="ts">
const props = defineProps<{
  name: string
  value: string
}>()
const model = defineModel()
</script>

<template>
  <input
    :id="`${props.name}-${props.value}`" v-model="model"
    type="radio" :name="props.name"
    :value="props.value"
    class="sr-only"
  >
</template>

<style scoped>

</style>
