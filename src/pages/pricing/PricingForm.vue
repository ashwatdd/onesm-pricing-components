<script setup lang="ts">
import type { PaymentRecord } from '@/lib/model/PaymentRecord.ts'
import PaymentRecordRepository from '@/lib/repositories/PaymentRecordRepository.ts'
import { ref } from 'vue'

const data = ref<PaymentRecord[]>([])

async function loadData() {
  data.value = await PaymentRecordRepository.getPaymentRecords()
}
</script>

<template>
  <div class="p-8">
    <code>
      {{ data }}
    </code>
    <button
      class="p-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-800 cursor-pointer"
      @click="loadData"
    >
      Load Data
    </button>
  </div>
  <form class="font-secondary">
    <section>
      <fieldset>
        <legend>Select Your Plan</legend>
        <ul>
          <li>
            <input
              id="select-your-plan-standard" type="radio"
              name="select-your-plan" value="standard"
            >
            <label for="select-your-plan-standard">
              <span>Standard</span>
              <strong>$49</strong>
            </label>
          </li>
          <li>
            <input
              id="select-your-plan-premium" type="radio"
              name="select-your-plan" value="premium"
            >
            <label for="select-your-plan-premium">
              <span>Premium</span>
              <span>Popular</span>
              <strong>$99</strong>
            </label>
          </li>
          <li>
            <input
              id="select-your-plan-enterprise" type="radio"
              name="select-your-plan" value="enterprise"
            >
            <label for="select-your-plan-enterprise">
              <span>Enterprise</span>
              <strong>$199</strong>
            </label>
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend>Licenses</legend>
        <input
          id="licenses" type="range"
          name="licenses" min="1" max="10"
        >
        <label for="licenses">1 license</label>
      </fieldset>
      <fieldset>
        <legend>Add-Ons</legend>
        <ul>
          <li>
            <input
              id="add-ons-priority-support" type="checkbox"
              name="priority-support"
            >
            <label for="add-ons-priority-support">
              <span>Priority Support</span>
              <strong>+$49</strong>
            </label>
          </li>
          <li>
            <input
              id="add-ons-advanced-analytics" type="checkbox"
              name="advanced-analytics"
            >
            <label for="add-ons-advanced-analytics">
              <span>Advanced Analytics</span>
              <strong>+$29</strong>
            </label>
          </li>
          <li>
            <input
              id="add-ons-custom-branding" type="checkbox"
              name="custom-branding"
            >
            <label for="add-ons-custom-branding">
              <span>Custom Branding</span>
              <strong>+$49</strong>
            </label>
          </li>
        </ul>
      </fieldset>
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
