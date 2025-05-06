import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import type { Ref } from 'vue'
import PriceService from '@/lib/service/PriceService.ts'
import { computed } from 'vue'

export default function usePriceServiceForTutoring(
  tutoringHourPrices: PriceData['tutoringHourPrices'],
  courseType: Ref<CourseType>,
  hours: Ref<number>,
) {
  const isComboDiscount = computed(
    () => PriceService.doesCourseProvideComboDiscount(courseType.value),
  )
  const is15PercentDiscount = computed(
    () => PriceService.doesCourseProvide15PercentDiscount(courseType.value),
  )

  const pricePerHour = computed(() => PriceService.calculateHourlyRate(
    tutoringHourPrices,
    hours.value,
  ))
  const totalCost = computed(() => PriceService.calculateDiscountedTutoringPrice(
    tutoringHourPrices,
    hours.value,
    courseType.value,
  ))

  return { isComboDiscount, is15PercentDiscount, pricePerHour, totalCost }
}
