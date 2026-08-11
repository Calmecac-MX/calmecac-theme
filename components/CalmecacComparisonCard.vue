<template>
  <div 
    class="calmecac-comparison-card relative p-3.5 md:p-4 rounded-sm border transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
    :class="[
      type === 'before' 
        ? 'bg-calmecac-card/80 border-calmecac-coral/40 border-t-3 border-t-calmecac-coral' 
        : 'bg-calmecac-surface border-calmecac-turquoise border-t-3 border-t-calmecac-turquoise shadow-[0_0_20px_rgba(0,176,155,0.18)]'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b shrink-0" :class="type === 'before' ? 'border-calmecac-coral/30' : 'border-calmecac-turquoise/30'">
      <div class="flex items-center gap-2 min-w-0">
        <span 
          class="font-condensed font-bold text-[11px] px-2 py-0.5 uppercase tracking-widest shrink-0"
          :class="type === 'before' ? 'bg-calmecac-coral/20 text-calmecac-coral border border-calmecac-coral/40' : 'bg-calmecac-turquoise/20 text-calmecac-turquoise border border-calmecac-turquoise/40'"
        >
          {{ badge || (type === 'before' ? 'SITUACIÓN ACTUAL' : 'CON CALMÉCAC') }}
        </span>
        <h3 class="font-condensed font-bold text-sm md:text-base uppercase tracking-wide m-0 truncate" :class="type === 'before' ? 'text-calmecac-fg' : 'text-calmecac-heading'">
          {{ title }}
        </h3>
      </div>
      <span class="text-lg md:text-xl shrink-0 ml-1">
        {{ icon || (type === 'before' ? '⚠️' : '⚡') }}
      </span>
    </div>

    <!-- Body -->
    <div class="text-xs leading-relaxed flex-1 my-auto" :class="type === 'before' ? 'text-calmecac-gray' : 'text-calmecac-fg'">
      <slot />
    </div>

    <!-- Footer Note -->
    <div v-if="footer" class="mt-2.5 pt-1.5 border-t text-[11px] font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0" :class="type === 'before' ? 'border-calmecac-coral/20 text-calmecac-coral' : 'border-calmecac-turquoise/20 text-calmecac-gold'">
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
