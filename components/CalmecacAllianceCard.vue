<template>
  <div 
    class="calmecac-alliance-card relative p-3.5 md:p-4 bg-calmecac-card border border-calmecac-border border-t-3 rounded-sm transition-all duration-300 hover:border-calmecac-turquoise flex flex-col justify-between h-full"
    :class="[
      featured ? 'bg-calmecac-surface border-calmecac-turquoise border-t-calmecac-gold shadow-[0_0_15px_rgba(255,184,0,0.15)]' : 'border-t-calmecac-turquoise'
    ]"
  >
    <div class="flex items-center justify-between mb-2 border-b border-calmecac-border/60 pb-1.5 shrink-0">
      <span class="font-condensed font-bold text-[11px] uppercase px-2 py-0.5 border" :class="featured ? 'bg-calmecac-gold/20 text-calmecac-gold border-calmecac-gold/40' : 'bg-calmecac-turquoise/10 text-calmecac-turquoise border-calmecac-turquoise/30'">
        {{ role || 'ALIANZA ESTRATÉGICA' }}
      </span>
      <span v-if="icon" class="text-lg md:text-xl shrink-0">
        {{ icon }}
      </span>
    </div>

    <h3 class="font-condensed font-bold text-sm md:text-base uppercase tracking-wide text-calmecac-heading mb-1.5 shrink-0">
      {{ name }}
    </h3>

    <div class="text-calmecac-gray text-xs leading-relaxed flex-1 my-auto">
      <slot>
        {{ description }}
      </slot>
    </div>

    <div v-if="valueAdd" class="mt-2.5 pt-1.5 border-t border-calmecac-border/40 text-[11px] font-condensed text-calmecac-turquoise font-bold uppercase tracking-wider shrink-0">
      💡 {{ valueAdd }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  name?: string
  role?: string
  icon?: string
  description?: string
  valueAdd?: string
  featured?: boolean
}>(), {
  name: '',
  role: '',
  icon: '',
  description: '',
  valueAdd: '',
  featured: false
})
</script>
