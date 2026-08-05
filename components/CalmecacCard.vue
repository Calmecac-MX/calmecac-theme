<template>
  <div 
    class="calmecac-card relative p-5 bg-calmecac-card border border-calmecac-border rounded-sm transition-all duration-300 hover:border-calmecac-turquoise flex flex-col justify-between"
    :class="[
      glow ? 'shadow-[0_0_20px_rgba(0,176,155,0.2)] border-calmecac-turquoise bg-calmecac-surface' : '',
      accentTop ? 'border-t-3 border-t-calmecac-turquoise' : ''
    ]"
  >
    <div v-if="title || icon" class="flex items-center justify-between mb-3 border-b border-calmecac-border/60 pb-2 shrink-0">
      <h3 v-if="title" class="font-condensed font-bold text-lg uppercase tracking-wide text-calmecac-heading m-0">
        {{ title }}
      </h3>
      <span v-if="icon" class="text-calmecac-turquoise text-xl font-bold">
        {{ icon }}
      </span>
    </div>
    <div class="text-calmecac-gray text-sm leading-relaxed flex-1 flex flex-col justify-center">
      <slot />
    </div>
    <div v-if="footer" class="mt-4 pt-2 border-t border-calmecac-border/40 text-xs text-calmecac-turquoise font-condensed shrink-0">
      {{ footer }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  icon?: string
  footer?: string
  glow?: boolean
  accentTop?: boolean
}>(), {
  title: '',
  icon: '',
  footer: '',
  glow: false,
  accentTop: true
})
</script>
