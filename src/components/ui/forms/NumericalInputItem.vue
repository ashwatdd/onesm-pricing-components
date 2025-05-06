<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  min?: number
  max?: number
  disabled?: boolean
}>()
const model = defineModel()
const rawInputData = ref('')

watch(model, (newValue) => {
  rawInputData.value = newValue!.toString()
}, { immediate: true })

function handleInput() {
  let newValue = Number.parseInt(rawInputData.value)
  if (Number.isNaN(newValue)) {
    newValue = props.min ?? 0
  }
  else if (props.min && newValue < props.min) {
    newValue = props.min
  }
  else if (props.max && newValue > props.max) {
    newValue = props.max
  }
  rawInputData.value = newValue.toString()
  model.value = newValue
}
</script>

<template>
  <input
    v-model="rawInputData"
    type="text"
    class="text-center outline-none"
    :class="{ 'pointer-events-none': disabled }"
    :disabled="props.disabled"
    @blur="handleInput"
    @keydown.enter.prevent="handleInput"
  >
</template>

<style scoped>

</style>
