<template>
  <div 
    class="calmecac-benefit-card relative p-2 md:p-2.5 bg-calmecac-card border rounded-sm transition-all duration-300 flex flex-col justify-between h-full"
    :class="[
      glow ? 'border-calmecac-turquoise bg-calmecac-surface shadow-[0_0_12px_rgba(0,176,155,0.12)]' : 'border-calmecac-border hover:border-calmecac-turquoise/70',
      variant === 'gold' ? 'border-t-3 border-t-calmecac-gold' : 'border-t-3 border-t-calmecac-turquoise'
    ]"
  >
    <!-- Header with Number Badge & Icon -->
    <div class="flex items-center justify-between mb-0.5 pb-0.5 border-b border-calmecac-border/60 shrink-0">
      <div class="flex items-center gap-1.5 min-w-0 flex-1">
        <span 
          v-if="number"
          class="font-condensed font-black text-[9px] md:text-[10px] px-1 py-0 rounded-xs uppercase tracking-wider shrink-0"
          :class="variant === 'gold' ? 'bg-calmecac-gold/20 text-calmecac-gold border border-calmecac-gold/40' : 'bg-calmecac-turquoise/20 text-calmecac-turquoise border border-calmecac-turquoise/40'"
        >
          {{ number }}
        </span>
        <h3 class="font-condensed font-bold text-[10px] md:text-[11px] uppercase tracking-wide text-calmecac-heading m-0 leading-tight">
          {{ title }}
        </h3>
      </div>
      <span v-if="icon" class="text-xs md:text-sm shrink-0 ml-1.5" :class="variant === 'gold' ? 'text-calmecac-gold' : 'text-calmecac-turquoise'">
        {{ icon }}
      </span>
    </div>

    <!-- Description Content -->
    <div class="text-calmecac-gray text-[10px] md:text-[11px] leading-snug flex-1 my-auto py-0.5">
      <slot>
        {{ description }}
      </slot>
    </div>

    <!-- Highlight / Tag Footer if provided -->
    <div v-if="tag" class="mt-0.5 pt-0.5 border-t border-calmecac-border/40 flex items-center gap-1 text-[9px] md:text-[10px] font-condensed font-bold tracking-wider uppercase shrink-0" :class="variant === 'gold' ? 'text-calmecac-gold' : 'text-calmecac-turquoise'">
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
