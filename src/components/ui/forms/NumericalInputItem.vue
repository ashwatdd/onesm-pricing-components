<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  min?: number
  max?: number
}>()
const model = defineModel<number | undefined>()

const rawInputData = ref('')
watch(model, (newValue) => {
  rawInputData.value = newValue?.toString() ?? '0'
}, { immediate: true })

function handleInput() {
  const newValue = Number.parseInt(rawInputData.value)
  if (Number.isNaN(newValue)) {
    model.value = 0
  }
  else if (props.min && newValue < props.min) {
    model.value = props.min
  }
  else if (props.max && newValue > props.max) {
    model.value = props.max
  }
}
</script>

<template>
  <input
    v-model="rawInputData"
    type="text"
    class="text-center outline-none"
    @blur="handleInput"
    @keydown.enter.prevent="handleInput"
  >
</template>

<style scoped>

</style>
