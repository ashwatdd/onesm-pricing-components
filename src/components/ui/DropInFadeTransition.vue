<script setup lang="ts">

</script>

<template>
  <div class="relative">
    <Transition name="dif-transition">
      <slot />
    </Transition>
  </div>
</template>

<style>
.dif-transition-leave-active:not(:only-child) {
  position: absolute;
}

.dif-transition-enter-active,
.dif-transition-leave-active {
  transition: all 0.150s var(--default-transition-timing-function);
}

.dif-transition-enter-from,
.dif-transition-leave-to {
  opacity: 0;
}

.dif-transition-enter-from:only-child,
.dif-transition-leave-to:only-child {
  transform: translateY(-5px);
}
</style>
