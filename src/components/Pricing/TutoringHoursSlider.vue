<script setup lang="ts">
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/card/Card.vue'
import NumericalInputItem from '@/components/ui/forms/NumericalInputItem.vue'
import SliderItem from '@/components/ui/forms/SliderItem.vue'
import { Percent } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  pricePerHour: number
  discounted: boolean
  installmentCount: number
}>()

const model = defineModel<number>()
const safeModel = computed(() => model.value ?? 0)
const totalCost = computed(() => safeModel.value * props.pricePerHour)
</script>

<template>
  <Card class="p-6">
    <header class="flex items-center justify-between font-sans mb-6">
      <h4 class="text-lg">
        Tutoring Hours
      </h4>
      <Transition>
        <Badge v-if="props.discounted" class="text-green-700 bg-green-100 transition-all">
          <Percent class="h-4 w-4" />
          15% discount automatically applied
        </Badge>
      </Transition>
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
        ${{ props.pricePerHour.toFixed(2) }}
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
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
</style>
