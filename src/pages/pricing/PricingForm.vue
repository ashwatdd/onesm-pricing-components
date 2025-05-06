<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import AddOnFieldset from '@/components/Pricing/AddOnFieldset.vue'
import SelectYourCourseFieldset from '@/components/Pricing/SelectYourCourseFieldset.vue'
import TutoringHoursSlider from '@/components/Pricing/TutoringHoursSlider.vue'
import Card from '@/components/ui/card/Card.vue'
import priceMocks from '@/lib/prices.mock.ts'
import PriceService from '@/lib/service/PriceService.ts'
import { computed, ref } from 'vue'

const courseType = ref<CourseType | undefined>(undefined)
const tutoringEnabled = ref(true)
const tutoringHours = ref(10)
const premiumTutor = ref(false)
const aamcContent = ref(true)
const uworldContent = ref(true)

const totalPrice = computed(() => {
  if (!courseType.value) {
    return 0
  }

  return PriceService.priceCalculator(priceMocks, {
    courseType: courseType.value,
    tutoringHours: tutoringEnabled.value ? tutoringHours.value : 0,
    premiumTutor: premiumTutor.value,
    aamcContent: aamcContent.value,
    uworldContent: uworldContent.value,
  })
})
</script>

<template>
  <form
    class="grid grid-cols-1 lg:grid-cols-3 gap-8
    font-secondary"
    @submit.prevent
  >
    <section v-if="totalPrice === 0" class="hidden lg:block mx-auto mb-auto lg:order-1">
      <p class="font-sans text-sm text-neutral-500">
        select an option to get started
      </p>
    </section>
    <Card
      v-if="totalPrice > 0"
      class="mx-auto mb-auto px-4 py-2
      sticky top-18 lg:order-1
      bg-white border-2 shadow-lg"
    >
      <p>
        calculated pricing:
      </p>
      <h3 class="font-sans text-xl text-bold text-center">
        ${{ totalPrice }}
      </h3>
    </Card>
    <section class="lg:col-span-2 space-y-8">
      <SelectYourCourseFieldset
        v-model="courseType"
        :course-prices="priceMocks.coursePrices"
      />
      <TutoringHoursSlider
        v-model:hours="tutoringHours"
        v-model:checked="tutoringEnabled"
        :tutoring-hour-prices="priceMocks.tutoringHourPrices"
        :course-type="courseType"
      />
      <AddOnFieldset
        v-model:premium-tutor="premiumTutor"
        v-model:aamc-content="aamcContent"
        v-model:uworld-content="uworldContent"
        :addon-prices="priceMocks.addonPrices"
      />
    </section>
  </form>
</template>

<style scoped>

</style>
