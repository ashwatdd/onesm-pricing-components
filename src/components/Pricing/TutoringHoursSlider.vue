<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue'
import NumericalInputItem from '@/components/ui/forms/NumericalInputItem.vue'
import SliderItem from '@/components/ui/forms/SliderItem.vue'
import { computed } from 'vue'

const model = defineModel<number>()
const pricePerHour = 150
const safeModel = computed(() => model.value ?? 0)
const totalCost = computed(() => safeModel.value * pricePerHour)
</script>

<template>
  <Card class="p-6">
    <header class="flex justify-between">
      <h4 class="text-lg font-sans mb-4">
        Tutoring Hours
      </h4>
    </header>
    <SliderItem
      :model-value="[model ?? 0]"
      :max="60"
      :min="0"
      name="tutoring-hours"
      :step="1"
      @update:model-value="(e) => { model = e ? e[0] : 0 }"
    />
    <div
      class="mt-4 p-4
      flex items-center justify-center gap-2
      bg-neutral-200 rounded-md
      font-sans text-neutral-700"
    >
      <Card
        class="p-2 min-w-12 h-12 grow
        bg-white border-2
        text-xl font-bold text-black"
      >
        <NumericalInputItem v-model="model" class="w-full h-full" :max="200" :min="0" />
      </Card>

      <p>
        {{ safeModel === 1 ? 'hour' : 'hours' }}
      </p>
      <p class="pl-2">
        @
      </p>

      <Card
        class="p-2 min-w-12 h-12 shrink-0
        flex justify-center items-center
        bg-white border-2
        text-xl font-bold"
      >
        ${{ pricePerHour.toFixed(2) }}
      </Card>

      <p class="px-2 text-xl">
        =
      </p>

      <Card
        class="p-2 min-w-28 h-12 shrink-0
        flex justify-center items-center
        bg-violet-50 border-2
        text-xl text-violet-500 font-bold"
      >
        ${{ totalCost.toFixed(2) }}
      </Card>
    </div>
  </Card>
</template>

<style scoped>

</style>
