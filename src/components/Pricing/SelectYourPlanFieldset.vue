<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue'
import CardFooter from '@/components/ui/Card/CardFooter.vue'
import HoverableCard from '@/components/ui/Card/HoverableCard.vue'
import RadioItem from '@/components/ui/forms/RadioItem.vue'
import { Book, Briefcase, Clock } from 'lucide-vue-next'

const emit = defineEmits(['update:modelValue'])
const model = defineModel()

const options = [{
  value: 'comprehensive-course',
  title: 'Comprehensive Course',
  icon: Book,
  description: 'Perfect for beginners',
  price: 4500,
}, {
  value: 'bootcamp',
  title: 'Bootcamp',
  icon: Briefcase,
  description: 'Intensive Learning',
  price: 2000,
}, {
  value: 'plain-hours',
  title: 'Plain 1-on-1 Hours',
  icon: Clock,
  description: 'Personalized learning',
  price: 1000,
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
          @click="emit('update:modelValue', option.value)"
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
            ${{ option.price }}
          </CardFooter>
        </HoverableCard>
      </ul>
    </fieldset>
  </Card>
</template>

<style scoped>

</style>
