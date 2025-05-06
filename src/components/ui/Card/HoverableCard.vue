<script setup lang="ts">
import Card from '@/components/ui/Card/Card.vue'
</script>

<template>
  <Card
    class="border-2
    hover:border-violet-500 hover:bg-violet-50
    hover:shadow-md
    transition-all duration-300
    cursor-pointer"
  >
    <slot />
  </Card>
</template>

<style scoped>

</style>
