<template>
  <footer class="grid grid-cols-3 items-center border-t border-calmecac-border pt-2 mt-3 text-xs text-calmecac-gray font-condensed shrink-0 relative z-10">
    <div class="flex items-center gap-2">
      <span>Rífatela 2026</span>
    </div>
    <div class="text-center">
      <a 
        href="https://calmecac.lat" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="text-calmecac-turquoise hover:text-calmecac-fg font-mono text-[11px] tracking-wider transition-colors no-underline"
      >
        calmecac.lat
      </a>
    </div>
    <div class="flex items-center justify-end gap-4 text-right">
      <span v-if="currentPage">{{ currentPage }} / {{ totalPages }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, unref, getCurrentInstance } from 'vue'
import { useSlideContext } from '@slidev/client'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const instance = getCurrentInstance()

const currentPage = computed(() => {
  const proxy = instance?.proxy as any
  return unref(slideContext?.$nav?.currentPage) ?? proxy?.$slidev?.nav?.currentPage ?? 0
})

const totalPages = computed(() => {
  const proxy = instance?.proxy as any
  return unref(slideContext?.$nav?.total) ?? proxy?.$slidev?.nav?.total ?? 0
})
</script>
