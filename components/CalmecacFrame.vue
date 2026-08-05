<template>
  <div class="relative group inline-block w-full h-full overflow-hidden">
    <!-- Image / Content Box -->
    <div class="relative z-10 w-full h-full border border-calmecac-border bg-calmecac-surface overflow-hidden">
      <slot />
    </div>

    <!-- Glowing Cyan/Turquoise Outline Overlay (Brand Manual Accent) -->
    <div 
      class="absolute inset-0 z-20 pointer-events-none border-2 border-calmecac-turquoise shadow-[0_0_12px_rgba(0,176,155,0.4)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
      :style="{ margin: offset }"
    />
    
    <!-- Sacred Corner Markings -->
    <div class="absolute top-0 left-0 w-2 h-2 bg-calmecac-turquoise z-30 pointer-events-none" />
    <div class="absolute bottom-0 right-0 w-2 h-2 bg-calmecac-turquoise z-30 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  offset?: string
}>(), {
  offset: '0px'
})
</script>
