<script setup lang="ts">
import type { CourseType } from '@/lib/model/CourseType.ts'
import type { Component } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import HoverableCard from '@/components/ui/card/HoverableCard.vue'
import RadioItem from '@/components/ui/forms/RadioItem.vue'
import { Book, Briefcase, Clock } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  coursePrices: {
    comprehensiveCoursePrice: number
    bootcampPrice: number
  }
  installmentCount: number
}>()
const model = defineModel<CourseType | undefined>()

const options: {
  value: CourseType
  title: string
  icon: Component
  description: string
  price: any
}[] = [{
  value: 'comprehensive-course',
  title: 'Comprehensive Course',
  icon: Book,
  description: 'Perfect for beginners',
  price: computed(() => `$${props.coursePrices.comprehensiveCoursePrice}`),
}, {
  value: 'bootcamp',
  title: 'Bootcamp',
  icon: Briefcase,
  description: 'Intensive Learning',
  price: computed(() => `$${props.coursePrices.bootcampPrice}`),
}, {
  value: 'plain-hours',
  title: 'Plain 1-on-1 Hours',
  icon: Clock,
  description: 'Personalized learning',
  price: 'Pay-as-you-go',
}]
</script>

<template>
  <Card class="p-6">
    <fieldset>
      <legend class="text-lg font-sans mb-4">
        Select Your Plan
      </legend>
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HoverableCard
          v-for="option in options" :key="option.value"
          class="flex flex-col"
          :class="{ 'border-2 border-violet-500 bg-violet-50': model === option.value }"
          @click="model = option.value"
        >
          <li class="flex-grow p-6 flex flex-col items-center text-center">
            <RadioItem v-model="model" name="select-your-plan" :value="option.value" />
            <Component :is="option.icon" class="w-12 h-12 mb-4 text-violet-500" />
            <label
              :for="`select-your-plan-${option.value}`"
              class="font-bold text-lg mb-2 cursor-pointer"
            >
              {{ option.title }}
            </label>
            <p class="text-sm text-neutral-500">
              {{ option.description }}
            </p>
          </li>
          <CardFooter class="p-2 text-lg">
            {{ option.price }}
          </CardFooter>
        </HoverableCard>
      </ul>
    </fieldset>
  </Card>
</template>

<style scoped>

</style>
