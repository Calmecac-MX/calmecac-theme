<template>
  <div 
    class="calmecac-comparison-card relative p-6 rounded-sm border transition-all duration-300 flex flex-col justify-between h-full"
    :class="[
      type === 'before' 
        ? 'bg-calmecac-card/80 border-calmecac-coral/40 border-t-3 border-t-calmecac-coral' 
        : 'bg-calmecac-surface border-calmecac-turquoise border-t-3 border-t-calmecac-turquoise shadow-[0_0_25px_rgba(0,176,155,0.18)]'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 pb-3 border-b" :class="type === 'before' ? 'border-calmecac-coral/30' : 'border-calmecac-turquoise/30'">
      <div class="flex items-center gap-2.5">
        <span 
          class="font-condensed font-bold text-xs px-2.5 py-1 uppercase tracking-widest"
          :class="type === 'before' ? 'bg-calmecac-coral/20 text-calmecac-coral border border-calmecac-coral/40' : 'bg-calmecac-turquoise/20 text-calmecac-turquoise border border-calmecac-turquoise/40'"
        >
          {{ badge || (type === 'before' ? 'SITUACIÓN ACTUAL' : 'CON CALMÉCAC') }}
        </span>
        <h3 class="font-condensed font-bold text-lg uppercase tracking-wide m-0" :class="type === 'before' ? 'text-calmecac-fg' : 'text-calmecac-heading'">
          {{ title }}
        </h3>
      </div>
      <span class="text-2xl">
        {{ icon || (type === 'before' ? '⚠️' : '⚡') }}
      </span>
    </div>

    <!-- Body -->
    <div class="text-xs md:text-sm leading-relaxed flex-1" :class="type === 'before' ? 'text-calmecac-gray' : 'text-calmecac-fg'">
      <slot />
    </div>

    <!-- Footer Note -->
    <div v-if="footer" class="mt-4 pt-3 border-t text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-2" :class="type === 'before' ? 'border-calmecac-coral/20 text-calmecac-coral' : 'border-calmecac-turquoise/20 text-calmecac-gold'">
      <span>{{ type === 'before' ? '❌' : '✅' }}</span> {{ footer }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  badge?: string
  icon?: string
  footer?: string
  type?: 'before' | 'after'
}>(), {
  title: '',
  badge: '',
  icon: '',
  footer: '',
  type: 'after'
})
</script>
