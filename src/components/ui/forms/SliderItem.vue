<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<SliderRootProps>()
const emits = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue }"
    class="relative h-2 w-full flex
    data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col
    items-stretch"
    v-bind="forwarded"
  >
    <SliderTrack
      class="grow relative rounded-full overflow-hidden
      bg-neutral-200 border border-neutral-300"
    >
      <SliderRange class="absolute h-full data-[orientation=vertical]:w-full bg-violet-500" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="self-center h-5 w-5 rounded-full bg-neutral-200
      transition-colors
      border-2 border-neutral-500
      focus:outline-2 focus:outline-offset-2 focus:outline-black
      disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
