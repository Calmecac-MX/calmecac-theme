<template>
  <div 
    class="calmecac-alliance-card relative p-5 bg-calmecac-card border border-calmecac-border border-t-3 rounded-sm transition-all duration-300 hover:border-calmecac-turquoise flex flex-col justify-between"
    :class="[
      featured ? 'bg-calmecac-surface border-calmecac-turquoise border-t-calmecac-gold shadow-[0_0_20px_rgba(255,184,0,0.15)]' : 'border-t-calmecac-turquoise'
    ]"
  >
    <div class="flex items-center justify-between mb-3 border-b border-calmecac-border/60 pb-2">
      <span class="font-condensed font-bold text-xs uppercase px-2 py-0.5 border" :class="featured ? 'bg-calmecac-gold/20 text-calmecac-gold border-calmecac-gold/40' : 'bg-calmecac-turquoise/10 text-calmecac-turquoise border-calmecac-turquoise/30'">
        {{ role || 'ALIANZA ESTRATÉGICA' }}
      </span>
      <span v-if="icon" class="text-xl">
        {{ icon }}
      </span>
    </div>

    <h3 class="font-condensed font-bold text-lg uppercase tracking-wide text-calmecac-heading mb-2">
      {{ name }}
    </h3>

    <div class="text-calmecac-gray text-xs md:text-sm leading-relaxed flex-1">
      <slot>
        {{ description }}
      </slot>
    </div>

    <div v-if="valueAdd" class="mt-4 pt-2 border-t border-calmecac-border/40 text-xs font-condensed text-calmecac-turquoise font-bold uppercase tracking-wider">
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
