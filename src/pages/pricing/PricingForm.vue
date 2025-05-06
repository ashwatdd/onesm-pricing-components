<script setup lang="ts">
import PlanAddOnFieldset from '@/components/Pricing/PlanAddOnFieldset.vue'
import SelectYourPlanFieldset from '@/components/Pricing/SelectYourPlanFieldset.vue'
import TutoringHoursSlider from '@/components/Pricing/TutoringHoursSlider.vue'
import { ref } from 'vue'

const plan = ref(null)
const tutoringHours = ref(10)
const premiumTutor = ref(null)
const aamcContent = ref(null)
const uworldContent = ref(null)
</script>

<template>
  <form
    class="grid grid-cols-1 md:grid-cols-3 gap-8
    font-secondary"
    @submit.prevent
  >
    <ul>
      <li>Plan: {{ plan }}</li>
      <li>Tutoring hours: {{ tutoringHours }}</li>
      <li>Premium Tutor: {{ premiumTutor }}</li>
      <li>AAMC: {{ aamcContent }}</li>
      <li>UWorld: {{ uworldContent }}</li>
    </ul>

    <section class="md:col-span-3 space-y-8">
      <SelectYourPlanFieldset v-model="plan" />
      <TutoringHoursSlider v-model="tutoringHours" />
      <PlanAddOnFieldset
        v-model:premium-tutor="premiumTutor"
        v-model:aamc-content="aamcContent"
        v-model:uworld-content="uworldContent"
      />
    </section>
    <section>
      <h1>Price Summary</h1>
      <output>
        <span>Total Price</span>
        <strong>$49.00</strong>
        <span>/month</span>
      </output>
      <button type="submit">
        Get Started
      </button>
    </section>
  </form>
</template>

<style scoped>

</style>
