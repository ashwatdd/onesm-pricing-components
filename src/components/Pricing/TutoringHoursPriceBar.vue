<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import NumericalInputItem from '@/components/ui/forms/NumericalInputItem.vue'
import { round } from '@/lib/utils.ts'

const props = defineProps<{
  max: number
  min: number
  pricePerHour: number
  totalCost: number
  disabled: boolean
}>()
const hours = defineModel<number>({ default: 0 })
</script>

<template>
  <div
    class="hidden mt-4 p-4
      sm:flex items-center justify-center gap-2
      bg-neutral-200 rounded-md
      font-sans text-neutral-700
      select-none"
  >
    <Card
      class="p-2 min-w-12 h-12 grow
        border-2
        text-xl font-bold"
      :class="{
        'bg-neutral-200 text-black/50': props.disabled,
        'bg-white text-black': !props.disabled,
      }"
    >
      <NumericalInputItem
        v-model="hours"
        :max="props.max" :min="props.min"
        class="w-full h-full"
        :disabled="props.disabled"
      />
    </Card>

    <p>
      {{ hours === 1 ? 'hour' : 'hours' }}
    </p>
    <p class="pl-2">
      @
    </p>

    <Card
      class="p-2 min-w-12 h-12 shrink-0
        flex justify-center items-center
        border-2
        text-xl font-bold"
      :class="{ 'text-black/50': props.disabled }"
    >
      ${{ round(props.pricePerHour, 2) }}
    </Card>

    <p class="px-2 text-xl">
      =
    </p>

    <Card
      class="p-2 min-w-28 h-12 shrink-0
        flex justify-center items-center
        border-2
        text-xl  font-bold"
      :class="{
        'bg-neutral-200 text-violet-500/50': disabled,
        'bg-violet-100 text-violet-500': !disabled,
      }"
    >
      ${{ round(props.totalCost, 2) }}
    </Card>
  </div>
</template>

<style scoped>

</style>
