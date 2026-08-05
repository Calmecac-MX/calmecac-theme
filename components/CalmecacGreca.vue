<template>
  <!-- Showcase / Catalog Mode -->
  <div v-if="normalizedVariant === 'all' || mode === 'showcase'" class="calmecac-grecas-showcase my-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="item in grecaList" 
        :key="item.id"
        class="border border-calmecac-border bg-calmecac-surface p-4 rounded transition-all duration-300 hover:border-calmecac-turquoise hover:shadow-[0_0_15px_rgba(0,176,155,0.2)]"
      >
        <div class="flex items-center justify-between mb-3 border-b border-calmecac-border/60 pb-2">
          <span class="font-condensed font-bold text-xs uppercase tracking-widest text-calmecac-turquoise">
            {{ item.name }}
          </span>
          <span class="text-[10px] font-mono text-calmecac-gray">
            {{ item.ratioText }}
          </span>
        </div>
        
        <!-- Preview of single greca emblem -->
        <div 
          class="h-20 flex items-center justify-center p-2 bg-calmecac-black border border-calmecac-border/40 rounded mb-3 overflow-hidden" 
          :class="colorClass" 
          :style="customStyle"
        >
          <svg :viewBox="item.viewBox" class="h-12 max-w-full" preserveAspectRatio="xMidYMid meet" fill="none">
            <path v-for="(p, idx) in item.paths" :key="idx" :d="p" fill="currentColor" />
          </svg>
        </div>

        <!-- Pattern strip preview -->
        <div class="text-[10px] font-condensed uppercase tracking-wider text-calmecac-gray mb-1">
          Patrón continuo:
        </div>
        <div class="w-full overflow-hidden bg-calmecac-black/60 p-1 border border-calmecac-border/30 rounded">
          <CalmecacGreca :variant="(item.id as any)" :height="20" :color="color" :animated="animated" />
        </div>
      </div>
    </div>
  </div>

  <!-- Single SVG Mode -->
  <div 
    v-else-if="mode === 'single'" 
    class="calmecac-greca-single inline-flex items-center justify-center" 
    :class="[colorClass, $attrs.class]"
    :style="customStyle"
  >
    <svg 
      :viewBox="activeGreca.viewBox" 
      :height="numericHeight" 
      class="max-w-full h-auto"
      preserveAspectRatio="xMidYMid meet" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path v-for="(p, idx) in activeGreca.paths" :key="idx" :d="p" fill="currentColor" />
    </svg>
  </div>

  <!-- Repeating Pattern Banner Mode (Default) -->
  <div 
    v-else 
    class="calmecac-greca-wrapper w-full overflow-hidden my-3 relative" 
    :class="[colorClass, { 'animate-marquee': animated }, $attrs.class]"
    :style="customStyle"
  >
    <svg 
      width="100%" 
      :height="numericHeight" 
      preserveAspectRatio="none" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern 
          :id="patternId" 
          :width="patternWidth" 
          :height="numericHeight" 
          :viewBox="activeGreca.viewBox" 
          patternUnits="userSpaceOnUse"
        >
          <path v-for="(p, idx) in activeGreca.paths" :key="idx" :d="p" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  variant?: '01' | '02' | '03' | '1' | '2' | '3' | 1 | 2 | 3 | 'all'
  type?: '01' | '02' | '03' | '1' | '2' | '3' | 1 | 2 | 3 | 'all'
  greca?: '01' | '02' | '03' | '1' | '2' | '3' | 1 | 2 | 3 | 'all'
  mode?: 'repeat' | 'single' | 'showcase'
  height?: number | string
  color?: 'turquoise' | 'white' | 'muted' | 'black' | 'gold' | string
  animated?: boolean
}>(), {
  height: 24,
  color: 'turquoise',
  mode: 'repeat',
  animated: false
})

// Unique pattern ID to prevent collisions when multiple grecas are rendered
const autoId = useId()
const patternId = computed(() => `calmecac-greca-pattern-${autoId}`)

const numericHeight = computed(() => {
  if (typeof props.height === 'number') return props.height
  const parsed = parseFloat(props.height)
  return isNaN(parsed) ? 24 : parsed
})

// Normalize variant prop across variant, type, or greca prop aliases
const normalizedVariant = computed(() => {
  const raw = props.variant ?? props.type ?? props.greca ?? '01'
  const str = String(raw).trim()
  if (str === '1' || str === '01') return '01'
  if (str === '2' || str === '02') return '02'
  if (str === '3' || str === '03') return '03'
  if (str === 'all') return 'all'
  return '01'
})

// Definition of the 3 Aztec/Mesoamerican Grecas from original SVG vectors
const GRECA_DEFINITIONS = {
  '01': {
    id: '01',
    name: 'GRECA 01 (Dual Stepped Fret)',
    viewBox: '0 0 243 93',
    width: 243,
    height: 93,
    ratio: 243 / 93,
    ratioText: '243 x 93',
    paths: [
      'M130.846 0H112.154V74.4H18.6923V18.6H74.7692V37.2H37.3846V55.8H93.4615V37.2V0H74.7692H18.6923H0V93H18.6923H112.154H130.846V18.6H224.308V74.4H168.231V55.8H205.615V37.2H149.538V55.8V93H168.231H224.308H243V0H224.308H130.846Z'
    ]
  },
  '02': {
    id: '02',
    name: 'GRECA 02 (Square Xicalcoliuhqui)',
    viewBox: '0 0 93 93',
    width: 93,
    height: 93,
    ratio: 93 / 93,
    ratioText: '93 x 93',
    paths: [
      'M18.6 74.4V18.6H55.8V37.2H37.2V55.8H55.8H74.4V37.2V18.6V0H0V18.6V74.4V93H18.6H93V74.4H18.6Z'
    ]
  },
  '03': {
    id: '03',
    name: 'GRECA 03 (Linear Monumental Band)',
    viewBox: '0 0 487 79',
    width: 487,
    height: 79,
    ratio: 487 / 79,
    ratioText: '487 x 79',
    paths: [
      'M251.037 0V47.0554V78.4257H266.727V0H251.037Z',
      'M0 47.0554V78.4257H15.6899V0H0V47.0554Z',
      'M141.208 0H125.519V62.7406H47.0688V15.6851H94.1387V31.3703H62.7588V47.0554H109.829V31.3703V0H94.1387H47.0688H31.3789V78.4257H47.0688H125.519H141.208V15.6851H219.658V62.7406H172.588V47.0554H203.968V31.3703H156.898V47.0554V78.4257H172.588H219.658H235.348V0H219.658H141.208Z',
      'M392.861 0H377.171V62.7406H298.721V15.6851H345.791V31.3703H314.411V47.0554H361.481V31.3703V0H345.791H298.721H283.031V78.4257H298.721H377.171H392.861V15.6851H471.311V62.7406H424.241V47.0554H455.621V31.3703H408.551V47.0554V78.4257H424.241H471.311H487V0H471.311H392.861Z'
    ]
  }
}

const activeGreca = computed(() => {
  const v = normalizedVariant.value
  if (v === '02') return GRECA_DEFINITIONS['02']
  if (v === '03') return GRECA_DEFINITIONS['03']
  return GRECA_DEFINITIONS['01']
})

const grecaList = computed(() => [
  GRECA_DEFINITIONS['01'],
  GRECA_DEFINITIONS['02'],
  GRECA_DEFINITIONS['03']
])

// Proportional pattern width based on numericHeight
const patternWidth = computed(() => {
  return numericHeight.value * activeGreca.value.ratio
})

// Check if color is a preset name or custom hex/CSS string
const isPresetColor = computed(() => {
  return ['turquoise', 'white', 'black', 'muted', 'gold'].includes(props.color)
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'white': return 'text-white'
    case 'black': return 'text-calmecac-black'
    case 'theme':
    case 'auto': return 'text-calmecac-fg'
    case 'muted': return 'text-calmecac-gray opacity-40'
    case 'gold': return 'text-amber-400'
    case 'turquoise': return 'text-calmecac-turquoise'
    default:
      return ''
  }
})

// Custom style for Hex colors (e.g. #FF5733, #00B09B, rgb(0,176,155), etc.)
const customStyle = computed(() => {
  if (!isPresetColor.value && props.color) {
    return { color: props.color }
  }
  return {}
})
</script>
