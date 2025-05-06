<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import DiscountBadge from '@/components/Pricing/DiscountBadge.vue'
import TutoringHoursPriceBar from '@/components/Pricing/TutoringHoursPriceBar.vue'
import usePriceServiceForTutoring from '@/components/Pricing/usePriceServiceForTutoring.ts'
import Card from '@/components/ui/card/Card.vue'
import DropInFadeTransition from '@/components/ui/DropInFadeTransition.vue'
import SliderItem from '@/components/ui/forms/SliderItem.vue'
import SwitchItem from '@/components/ui/forms/SwitchItem.vue'
import { DollarSign, Percent } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  tutoringHourPrices: PriceData['tutoringHourPrices']
  courseType: CourseType | undefined
}>()
const courseType = computed(() => props.courseType ?? 'plain-hours')
const min = 5
const max = computed(() => props.tutoringHourPrices.reduce(
  (max, current) => current.hours > max ? current.hours : max,
  min,
))

const checked = defineModel<boolean>('checked')
const disabled = computed(() => props.courseType === undefined || !checked.value)

const hours = defineModel<number>('hours', { default: min })
const {
  is15PercentDiscount,
  isComboDiscount,
  pricePerHour,
  totalCost,
} = usePriceServiceForTutoring(props.tutoringHourPrices, courseType, hours)
</script>

<template>
  <Card class="p-6">
    <header class="flex items-center font-sans mb-6 gap-4">
      <h4 class="text-lg">
        Tutoring Hours
      </h4>
      <DropInFadeTransition class="grow flex justify-end">
        <DiscountBadge v-if="is15PercentDiscount">
          <Percent class="h-4 w-4" />
          15% <span class="hidden sm:inline">discount applied</span>
        </DiscountBadge>
        <DiscountBadge v-if="isComboDiscount">
          <DollarSign class="h-4 w-4" />
          Combo <span class="hidden sm:inline">discount applied</span>
        </DiscountBadge>
      </DropInFadeTransition>
      <DropInFadeTransition class="flex items-center justify-end">
        <SwitchItem
          v-if="courseType !== 'plain-hours'"
          v-model="checked"
          name="tutoring-hours"
        />
      </DropInFadeTransition>
    </header>
    <SliderItem
      v-model="hours"
      :max="max" :min="min" :step="1"
      name="tutoring-hours"
      :disabled="disabled"
    />
    <TutoringHoursPriceBar
      v-model="hours"
      :max="200" :min="min"
      :price-per-hour="pricePerHour"
      :total-cost="totalCost"
      :disabled="disabled"
    />
  </Card>
</template>

<style scoped>

</style>
