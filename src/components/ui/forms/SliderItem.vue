<script setup lang="ts">
import type { SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<Omit<SliderRootProps, 'modelValue'> & {
  modelValue: number | number[]
}>()
const emits = defineEmits<{
  'update:modelValue': [payload: number | number[]]
}>()

const forwardProps = computed(() => ({
  ...props,
  modelValue: typeof props.modelValue === 'number' ? [props.modelValue] : props.modelValue,
}))

function onUpdate(value: number[] | undefined) {
  if (value === undefined) {
    return
  }

  emits('update:modelValue', typeof props.modelValue === 'number' ? value[0]! : value)
}
</script>

<template>
  <SliderRoot
    class="relative h-2 w-full flex
    data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col
    items-stretch"
    v-bind="forwardProps"
    @update:model-value="onUpdate"
  >
    <SliderTrack
      class="grow relative rounded-full overflow-hidden
      bg-neutral-200 border border-neutral-300"
    >
      <SliderRange class="absolute h-full data-[orientation=vertical]:w-full bg-violet-500" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in (forwardProps.modelValue)"
      :key="key"
      class="self-center h-5 w-5 rounded-full bg-neutral-200
      transition-colors
      border-2 border-neutral-500
      focus:outline-2 focus:outline-offset-2 focus:outline-black
      disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
