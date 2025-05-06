<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import DiscountBadge from '@/components/Pricing/DiscountBadge.vue'
import Card from '@/components/ui/card/Card.vue'
import DropInFadeTransition from '@/components/ui/DropInFadeTransition.vue'
import NumericalInputItem from '@/components/ui/forms/NumericalInputItem.vue'
import SliderItem from '@/components/ui/forms/SliderItem.vue'
import SwitchItem from '@/components/ui/forms/SwitchItem.vue'
import PriceService from '@/lib/service/PriceService.ts'
import { round } from '@/lib/utils.ts'
import { DollarSign, Percent } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  tutoringHourPrices: PriceData['tutoringHourPrices']
  courseType: CourseType | undefined
  installmentCount: number
}>()
const checked = defineModel<boolean>('checked')
const disabled = computed(() => props.courseType === undefined || !checked.value)

const min = 5
const max = computed(() => props.tutoringHourPrices.reduce(
  (max, current) => current.hours > max ? current.hours : max,
  min,
))
const hardMax = 200

const model = defineModel<number>('hours')
const safeModel = computed(() => model.value ?? min)
const safeCourseType = computed(() => props.courseType ?? 'plain-hours')

const isComboDiscount = computed(() => PriceService.doesCourseProvideComboDiscount(safeCourseType.value))
const is15PercentDiscount = computed(() => PriceService.doesCourseProvide15PercentDiscount(safeCourseType.value))

const pricePerHour = computed(() => PriceService.calculateHourlyRate(
  props.tutoringHourPrices,
  safeModel.value,
))
const totalCost = computed(() => PriceService.calculateDiscountedTutoringPrice(
  props.tutoringHourPrices,
  safeModel.value,
  safeCourseType.value,
))
</script>

<template>
  <Card class="p-6">
    <header class="flex items-center font-sans mb-6 gap-4">
      <h4 class="text-lg">
        Tutoring Hours
      </h4>
      <DropInFadeTransition class="grow sm:grow-0 flex items-center justify-end">
        <SwitchItem
          v-if="safeCourseType !== 'plain-hours'"
          v-model="checked"
          name="tutoring-hours"
        />
      </DropInFadeTransition>
      <DropInFadeTransition class="grow hidden sm:flex justify-end">
        <DiscountBadge v-if="is15PercentDiscount">
          <Percent class="h-4 w-4" />
          15% discount automatically applied
        </DiscountBadge>
        <DiscountBadge v-if="isComboDiscount">
          <DollarSign class="h-4 w-4" />
          Combo discount automatically applied
        </DiscountBadge>
      </DropInFadeTransition>
    </header>
    <SliderItem
      :model-value="[model ?? min]"
      :max="max"
      :min="min"
      name="tutoring-hours"
      :step="1"
      :disabled="disabled"
      @update:model-value="(e) => { model = e ? e[0] : min }"
    />
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
          'bg-neutral-200 text-black/50': disabled,
          'bg-white text-black': !disabled,
        }"
      >
        <NumericalInputItem
          v-model="model"
          :max="hardMax" :min="min"
          class="w-full h-full"
          :disabled="disabled"
        />
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
        border-2
        text-xl font-bold"
        :class="{ 'text-black/50': disabled }"
      >
        ${{ round(pricePerHour, 2) }}
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
        ${{ round(totalCost, 2) }}
      </Card>
    </div>
  </Card>
</template>

<style scoped>

</style>
