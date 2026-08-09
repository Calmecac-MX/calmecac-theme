<template>
  <div 
    class="calmecac-benefit-card relative p-5 bg-calmecac-card border rounded-sm transition-all duration-300 flex flex-col justify-between"
    :class="[
      glow ? 'border-calmecac-turquoise bg-calmecac-surface shadow-[0_0_20px_rgba(0,176,155,0.15)]' : 'border-calmecac-border hover:border-calmecac-turquoise/70',
      variant === 'gold' ? 'border-t-3 border-t-calmecac-gold' : 'border-t-3 border-t-calmecac-turquoise'
    ]"
  >
    <!-- Header with Number Badge & Icon -->
    <div class="flex items-center justify-between mb-3 border-b border-calmecac-border/60 pb-2">
      <div class="flex items-center gap-2">
        <span 
          v-if="number"
          class="font-condensed font-black text-xs px-2 py-0.5 rounded-xs uppercase tracking-wider"
          :class="variant === 'gold' ? 'bg-calmecac-gold/20 text-calmecac-gold border border-calmecac-gold/40' : 'bg-calmecac-turquoise/20 text-calmecac-turquoise border border-calmecac-turquoise/40'"
        >
          {{ number }}
        </span>
        <h3 class="font-condensed font-bold text-base uppercase tracking-wide text-calmecac-heading m-0">
          {{ title }}
        </h3>
      </div>
      <span v-if="icon" class="text-xl shrink-0" :class="variant === 'gold' ? 'text-calmecac-gold' : 'text-calmecac-turquoise'">
        {{ icon }}
      </span>
    </div>

    <!-- Description Content -->
    <div class="text-calmecac-gray text-xs md:text-sm leading-relaxed flex-1">
      <slot>
        {{ description }}
      </slot>
    </div>

    <!-- Highlight / Tag Footer if provided -->
    <div v-if="tag" class="mt-3 pt-2 border-t border-calmecac-border/40 flex items-center gap-1.5 text-xs font-condensed font-bold tracking-wider uppercase" :class="variant === 'gold' ? 'text-calmecac-gold' : 'text-calmecac-turquoise'">
      <span>✦</span> {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  number?: string | number
  icon?: string
  tag?: string
  glow?: boolean
  variant?: 'turquoise' | 'gold'
}>(), {
  title: '',
  description: '',
  icon: '',
  tag: '',
  glow: false,
  variant: 'turquoise'
})
</script>
