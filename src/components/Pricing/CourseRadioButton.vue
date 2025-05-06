<script setup lang="ts">
import type { Component } from 'vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import HoverableCard from '@/components/ui/card/HoverableCard.vue'
import RadioItem from '@/components/ui/forms/RadioItem.vue'

const props = defineProps<{
  id: string
  value: string
  title: string
  description: string
  icon: Component
  price: string
}>()
const model = defineModel()
</script>

<template>
  <HoverableCard
    class="flex flex-col"
    :class="{ 'border-2 border-violet-500 bg-violet-50': model === props.value }"
    @click="model = props.value"
  >
    <li class="flex-grow p-6 flex flex-col items-center text-center">
      <RadioItem v-model="model" :name="id" :value="props.value" />
      <Component :is="props.icon" class="w-12 h-12 mb-4 text-violet-500" />
      <label
        :for="`${props.id}-${props.value}`"
        class="font-bold text-lg mb-2 cursor-pointer"
      >
        {{ props.title }}
      </label>
      <p class="text-sm text-neutral-500">
        {{ props.description }}
      </p>
    </li>
    <CardFooter class="p-2 text-lg">
      {{ props.price }}
    </CardFooter>
  </HoverableCard>
</template>

<style scoped>

</style>
