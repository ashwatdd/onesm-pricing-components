<script setup lang="ts">
import type { Component } from 'vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import HoverableCard from '@/components/ui/card/HoverableCard.vue'
import SwitchItem from '@/components/ui/forms/SwitchItem.vue'
import { Lightbulb } from 'lucide-vue-next'

const props = defineProps<{
  id: string
  title: string
  description: string
  icon: Component
  tip?: string
  price: number
  discount?: boolean
}>()

const model = defineModel()
</script>

<template>
  <HoverableCard
    class="flex flex-col"
    @click="model = !model"
  >
    <li class="flex-grow p-6 flex items-center gap-4">
      <div class="bg-neutral-200 p-3 rounded-full">
        <Component :is="props.icon" class="h-6 w-6 text-neutral-500" />
      </div>
      <div class="flex-grow">
        <label
          :for="props.id"
          class="font-bold cursor-pointer"
          @click.prevent
        >{{ props.title }}</label>
        <p class="text-sm text-neutral-500">
          {{ props.description }}
        </p>
      </div>
      <p class="font-bold shrink-0">
        +${{ props.price }}
      </p>
      <SwitchItem v-model="model" :name="props.id" />
    </li>
    <CardFooter
      v-if="props.tip"
      class="flex gap-2
            text-xs text-neutral-500"
    >
      <div
        class="px-2 py-1 rounded-bl-md
              flex items-center bg-neutral-200"
      >
        <Lightbulb class="h-4 w-4" />
        <span class="mx-1">Tip</span>
      </div>
      <p class="self-center">
        {{ props.tip }}
      </p>
    </CardFooter>
  </HoverableCard>
</template>

<style scoped>

</style>
