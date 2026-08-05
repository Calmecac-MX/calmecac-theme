<template>
  <span 
    class="inline-flex items-center px-3 py-1 font-condensed font-bold text-xs uppercase tracking-wider rounded-none border transition-colors"
    :class="[
      variant === 'solid' ? 'bg-calmecac-turquoise text-calmecac-black border-calmecac-turquoise' :
      variant === 'outline' ? 'bg-transparent text-calmecac-turquoise border-calmecac-turquoise' :
      'bg-calmecac-surface text-calmecac-fg border-calmecac-border'
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'solid' | 'outline' | 'dark'
}>(), {
  variant: 'outline'
})
</script>
