<script setup lang="ts">
import type PriceData from '@/lib/model/PriceData.ts'
import AddOnField from '@/components/Pricing/AddOnField.vue'
import Card from '@/components/ui/card/Card.vue'
import { FileText, User } from 'lucide-vue-next'

const props = defineProps<{
  addonPrices: PriceData['addonPrices']
}>()

const premiumTutor = defineModel('premiumTutor')
const aamcContent = defineModel('aamcContent')
const uworldContent = defineModel('uworldContent')
</script>

<template>
  <Card class="p-6">
    <fieldset>
      <legend class="text-lg font-sans mb-4">
        Add-Ons
      </legend>
      <ul class="space-y-4">
        <AddOnField
          id="premium-tutor"
          v-model="premiumTutor"
          title="Premium Tutor"
          :icon="User"
          description="One-on-one sessions with expert tutors"
          :price="props.addonPrices.premiumTutorPrice"
        />
        <AddOnField
          id="aamc-content"
          v-model="aamcContent"
          title="AAMC Content"
          :icon="FileText"
          description="Official AAMC practice materials"
          tip="You do not need this if you already have purchased AAMC materials by yourself!"
          :price="props.addonPrices.aamcContentPrice"
          discount
        />
        <AddOnField
          id="uworld-content"
          v-model="uworldContent"
          title="UWorld Content"
          :icon="FileText"
          description="Additional UWorld practice questions"
          tip="You do not need this if you already have purchased UWorld materials by yourself!"
          :price="props.addonPrices.uworldContentPrice"
          discount
        />
      </ul>
    </fieldset>
  </Card>
</template>

<style scoped>

</style>
