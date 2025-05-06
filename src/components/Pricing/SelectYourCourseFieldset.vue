<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import type PriceData from '@/lib/model/PriceData.ts'
import CourseRadioButton from '@/components/Pricing/CourseRadioButton.vue'
import Card from '@/components/ui/card/Card.vue'
import { Book, Briefcase, Clock } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  coursePrices: PriceData['coursePrices']
}>()
const model = defineModel<CourseType | undefined>()
const comprehensiveCoursePrice = computed(() => `$${props.coursePrices.comprehensiveCoursePrice}`)
const bootcampPrice = computed(() => `$${props.coursePrices.bootcampPrice}`)
</script>

<template>
  <Card class="p-6">
    <fieldset>
      <legend class="text-lg font-sans mb-4">
        Select Your Plan
      </legend>
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CourseRadioButton
          id="select-your-course"
          v-model="model"
          value="comprehensive-course"
          title="Comprehensive Course"
          description="Perfect for beginners"
          :icon="Book"
          :price="comprehensiveCoursePrice"
        />
        <CourseRadioButton
          id="select-your-course"
          v-model="model"
          value="bootcamp"
          title="Bootcamp"
          description="Intensive Learning"
          :icon="Briefcase"
          :price="bootcampPrice"
        />
        <CourseRadioButton
          id="select-your-course"
          v-model="model"
          value="plain-hours"
          title="Plain 1-on-1 Hours"
          description="Personalized learning"
          :icon="Clock"
          price="Pay-as-you-go"
        />
      </ul>
    </fieldset>
  </Card>
</template>

<style scoped>

</style>
