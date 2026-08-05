<template>
  <button 
    @click="toggleTheme" 
    class="calmecac-theme-toggle inline-flex items-center gap-2 px-3 py-1.5 font-condensed font-bold text-xs uppercase tracking-wider rounded border border-calmecac-border bg-calmecac-surface text-calmecac-fg hover:border-calmecac-turquoise hover:text-calmecac-turquoise transition-all cursor-pointer select-none shadow-sm"
    :title="isDark ? 'Cambiar a Modo Claro (Light Mode)' : 'Cambiar a Modo Oscuro (Dark Mode)'"
  >
    <svg 
      v-if="isDark" 
      class="w-4 h-4 text-calmecac-turquoise" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    <svg 
      v-else 
      class="w-4 h-4 text-calmecac-turquoise" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
    <span>{{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(true)

function checkCurrentTheme() {
  if (typeof document !== 'undefined') {
    isDark.value = !document.documentElement.classList.contains('light')
  }
}

function toggleTheme() {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  if (html.classList.contains('light')) {
    html.classList.remove('light')
    html.classList.add('dark')
    isDark.value = true
  } else {
    html.classList.remove('dark')
    html.classList.add('light')
    isDark.value = false
  }
}

onMounted(() => {
  checkCurrentTheme()
  // Observe class mutations on <html> element
  if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
    const observer = new MutationObserver(() => {
      checkCurrentTheme()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  }
})
</script>
