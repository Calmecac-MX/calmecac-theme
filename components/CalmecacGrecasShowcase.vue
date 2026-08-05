<template>
  <div class="calmecac-grecas-showcase-interactive relative h-full flex flex-col justify-between overflow-hidden rounded-xl border border-calmecac-border/80 bg-calmecac-surface/95 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-300">
    <!-- Subtle Ambient Glow Effects -->
    <div class="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-calmecac-turquoise/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-calmecac-turquoise/5 blur-3xl"></div>

    <!-- Header / Selector Tabs -->
    <div class="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 border-b border-calmecac-border/70 pb-2">
      <div>
        <div class="flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-widest text-calmecac-turquoise">
          <span class="inline-block h-2 w-2 rounded-full bg-calmecac-turquoise shadow-[0_0_8px_#00B09B]"></span>
          <span>CATÁLOGO DE GRECAS MEXICAS</span>
          <span class="rounded-full border border-calmecac-turquoise/40 bg-calmecac-turquoise/15 px-2 py-0.5 text-[9px] font-semibold text-calmecac-turquoise">
            SISTEMA VISUAL
          </span>
        </div>
        <p class="mt-0.5 text-[10.5px] text-calmecac-gray">
          Selecciona una greca y personaliza su color con valores predefinidos o código Hexadecimal.
        </p>
      </div>

      <!-- Greca Selector Buttons (Tabs) -->
      <div class="flex items-center gap-1 rounded-lg border border-calmecac-border/80 bg-calmecac-black/90 p-1 shadow-inner">
        <button 
          v-for="g in ['01', '02', '03']" 
          :key="g"
          @click="selectedVariant = g"
          class="relative px-3 py-0.5 text-[11px] font-condensed font-bold uppercase tracking-wider rounded-md transition-all duration-200"
          :class="selectedVariant === g 
            ? 'bg-calmecac-turquoise text-calmecac-black font-extrabold shadow-[0_0_12px_rgba(0,176,155,0.5)] scale-[1.02]' 
            : 'text-calmecac-gray hover:text-white hover:bg-white/5'"
        >
          GRECA {{ g }}
        </button>
        <button 
          @click="selectedVariant = 'all'"
          class="relative px-3 py-0.5 text-[11px] font-condensed font-bold uppercase tracking-wider rounded-md transition-all duration-200 flex items-center gap-1"
          :class="selectedVariant === 'all' 
            ? 'bg-calmecac-turquoise text-calmecac-black font-extrabold shadow-[0_0_12px_rgba(0,176,155,0.5)] scale-[1.02]' 
            : 'text-calmecac-gray hover:text-white hover:bg-white/5'"
        >
          <span>VER TODAS</span>
          <span class="text-[9px] opacity-75">(3)</span>
        </button>
      </div>
    </div>

    <!-- Active Greca Controls & Preview -->
    <div v-if="selectedVariant !== 'all'" class="relative z-10 flex-1 min-h-0 flex flex-col justify-between gap-2 my-1">
      <!-- 2-Column Preview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-1 min-h-0">
        <!-- Visual Emblem Preview (Single) -->
        <div class="group relative rounded-lg border border-calmecac-border bg-calmecac-black/90 p-2.5 flex flex-col justify-between transition-all duration-300 hover:border-calmecac-turquoise/50 hover:shadow-[0_0_15px_rgba(0,176,155,0.15)]">
          <div class="flex items-center justify-between shrink-0 mb-1">
            <div class="flex items-center gap-1.5 font-condensed text-[10.5px] font-bold text-calmecac-turquoise uppercase tracking-widest">
              <span class="h-1.5 w-1.5 rounded-full bg-calmecac-turquoise"></span>
              <span>VISTA INDIVIDUAL (MODO SINGLE)</span>
            </div>
            <span class="rounded bg-calmecac-border/60 px-1.5 py-0.5 font-mono text-[9.5px] text-calmecac-gray border border-white/5">
              variant="{{ selectedVariant }}"
            </span>
          </div>
          <div class="flex-1 min-h-0 flex items-center justify-center p-2 rounded bg-calmecac-surface/50 border border-white/5 group-hover:border-calmecac-turquoise/20 transition-colors overflow-hidden">
            <CalmecacGreca 
              :variant="selectedVariant" 
              mode="single" 
              :height="44" 
              :color="selectedColor" 
            />
          </div>
        </div>

        <!-- Continuous Strip Preview (Repeat) -->
        <div class="group relative rounded-lg border border-calmecac-border bg-calmecac-black/90 p-2.5 flex flex-col justify-between transition-all duration-300 hover:border-calmecac-turquoise/50 hover:shadow-[0_0_15px_rgba(0,176,155,0.15)]">
          <div class="flex items-center justify-between shrink-0 mb-1">
            <div class="flex items-center gap-1.5 font-condensed text-[10.5px] font-bold text-calmecac-turquoise uppercase tracking-widest">
              <span class="h-1.5 w-1.5 rounded-full bg-calmecac-turquoise"></span>
              <span>PATRÓN CONTINUO (MODO REPEAT)</span>
            </div>
            <span class="rounded bg-calmecac-border/60 px-1.5 py-0.5 font-mono text-[9.5px] text-calmecac-gray border border-white/5">
              height="{{ selectedHeight }}px"
            </span>
          </div>
          <div class="flex-1 min-h-0 flex items-center px-1 rounded bg-calmecac-surface/50 border border-white/5 group-hover:border-calmecac-turquoise/20 transition-colors overflow-hidden">
            <CalmecacGreca 
              :variant="selectedVariant" 
              mode="repeat" 
              :height="selectedHeight" 
              :color="selectedColor" 
            />
          </div>
        </div>
      </div>

      <!-- Control Deck Bar: Presets, Hex Picker & Height Slider -->
      <div class="shrink-0 flex flex-wrap items-center justify-between gap-2 p-2 bg-calmecac-black/90 border border-calmecac-border/80 rounded-lg text-xs shadow-inner">
        <!-- Preset & Custom Hex Color Controls -->
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="font-condensed font-bold text-calmecac-gray uppercase text-[10px] tracking-wider flex items-center gap-1">
            <svg class="w-3 h-3 text-calmecac-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            COLOR:
          </span>
          
          <!-- Color Swatch Buttons -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <button 
              v-for="c in colorPresets" 
              :key="c.id"
              @click="selectPreset(c.value)"
              class="group/preset relative px-2 py-0.5 rounded text-[10px] font-condensed uppercase font-bold border transition-all duration-200 flex items-center gap-1.5"
              :class="selectedColor.toLowerCase() === c.value.toLowerCase() 
                ? 'border-calmecac-turquoise text-white bg-calmecac-turquoise/20 shadow-[0_0_10px_rgba(0,176,155,0.3)]' 
                : 'border-calmecac-border/80 text-calmecac-gray hover:text-white hover:border-white/30 hover:bg-white/5'"
            >
              <span 
                class="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm transition-transform group-hover/preset:scale-110" 
                :style="{ backgroundColor: c.previewHex }"
              ></span>
              {{ c.name }}
            </button>
          </div>

          <!-- Hex Input & Color Picker -->
          <div class="flex items-center gap-1.5 border-l border-calmecac-border/80 pl-2.5">
            <span class="font-condensed font-bold text-calmecac-gray uppercase text-[9.5px] tracking-wider">HEX:</span>
            <div class="flex items-center gap-1 bg-calmecac-surface border border-calmecac-border/80 px-1.5 py-0.5 rounded focus-within:border-calmecac-turquoise focus-within:shadow-[0_0_8px_rgba(0,176,155,0.3)] transition-all">
              <input 
                type="color" 
                v-model="customHex"
                @input="onHexChange"
                class="w-3.5 h-3.5 rounded cursor-pointer bg-transparent border-0 p-0" 
                title="Seleccionar color personalizado"
              />
              <input 
                type="text" 
                v-model="customHex"
                @input="onHexChange"
                placeholder="#00B09B"
                class="w-16 bg-transparent text-white font-mono text-[10.5px] focus:outline-none uppercase font-semibold"
              />
            </div>
          </div>
        </div>

        <!-- Height Slider -->
        <div class="flex items-center gap-2 border-l border-calmecac-border/80 pl-2.5">
          <span class="font-condensed font-bold text-calmecac-gray uppercase text-[9.5px] tracking-wider flex items-center gap-1">
            <svg class="w-3 h-3 text-calmecac-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
            ALTURA:
          </span>
          <input 
            type="range" 
            min="16" 
            max="48" 
            step="4" 
            v-model.number="selectedHeight"
            class="accent-calmecac-turquoise cursor-pointer w-18 h-1.5 bg-calmecac-surface rounded-lg appearance-none"
          />
          <span class="font-mono text-[10px] font-bold text-calmecac-turquoise rounded bg-calmecac-turquoise/15 px-1.5 py-0.5 border border-calmecac-turquoise/30">
            {{ selectedHeight }}px
          </span>
        </div>
      </div>

      <!-- Code Snippet Generator Bar -->
      <div class="shrink-0 flex items-center justify-between gap-2 bg-calmecac-black/95 border border-calmecac-border/90 px-2.5 py-1 rounded-lg font-mono text-[10.5px]">
        <div class="overflow-x-auto whitespace-nowrap flex items-center gap-1.5 text-calmecac-gray">
          <span class="text-calmecac-turquoise font-semibold">&lt;CalmecacGreca</span>
          <span>variant=<span class="text-amber-400">"{{ selectedVariant }}"</span></span>
          <span>height=<span class="text-amber-400">"{{ selectedHeight }}"</span></span>
          <span>color=<span class="text-amber-400">"{{ selectedColor }}"</span></span>
          <span class="text-calmecac-turquoise font-semibold">/&gt;</span>
        </div>
        <button 
          @click="copySnippet"
          class="shrink-0 flex items-center gap-1 px-2 py-0.5 text-[9.5px] font-condensed font-bold uppercase tracking-wider rounded border border-calmecac-turquoise/40 bg-calmecac-turquoise/10 text-calmecac-turquoise hover:bg-calmecac-turquoise hover:text-calmecac-black transition-all duration-200 shadow-sm"
        >
          <template v-if="copied">
            <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span class="text-emerald-400">¡COPIADO!</span>
          </template>
          <template v-else>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            <span>COPIAR</span>
          </template>
        </button>
      </div>
    </div>

    <!-- All Grecas Showcase View ("VER TODAS") -->
    <div v-else class="relative z-10 flex-1 min-h-0 flex flex-col justify-center my-1">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 h-full">
        <div 
          v-for="item in grecaItems" 
          :key="item.id"
          @click="selectedVariant = item.id"
          class="group cursor-pointer rounded-lg border border-calmecac-border bg-calmecac-black/90 p-2.5 flex flex-col justify-between transition-all duration-300 hover:border-calmecac-turquoise hover:shadow-[0_0_15px_rgba(0,176,155,0.25)] hover:scale-[1.01]"
        >
          <div class="flex items-center justify-between mb-1 border-b border-calmecac-border/60 pb-1 shrink-0">
            <span class="font-condensed font-bold text-[10.5px] uppercase tracking-widest text-calmecac-turquoise group-hover:text-white transition-colors">
              {{ item.name }}
            </span>
            <span class="text-[9px] font-mono text-calmecac-gray bg-calmecac-surface px-1.5 py-0.5 rounded border border-white/5">
              {{ item.ratioText }}
            </span>
          </div>
          
          <!-- Single Emblem Preview -->
          <div class="flex-1 min-h-0 flex items-center justify-center p-2 bg-calmecac-surface/60 border border-white/5 rounded-md mb-1.5 overflow-hidden group-hover:border-calmecac-turquoise/30 transition-colors">
            <CalmecacGreca 
              :variant="item.id" 
              mode="single" 
              :height="36" 
              :color="selectedColor" 
            />
          </div>

          <!-- Repeat Pattern Preview -->
          <div class="shrink-0">
            <div class="text-[9px] font-condensed uppercase tracking-wider text-calmecac-gray mb-1 flex justify-between items-center">
              <span>PATRÓN CONTINUO</span>
              <span class="text-calmecac-turquoise group-hover:underline font-bold">PROBAR →</span>
            </div>
            <div class="w-full overflow-hidden bg-calmecac-surface/40 p-1 border border-white/5 rounded group-hover:border-calmecac-turquoise/20 transition-colors">
              <CalmecacGreca :variant="item.id" mode="repeat" :height="18" :color="selectedColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalmecacGreca from './CalmecacGreca.vue'

const selectedVariant = ref<'01' | '02' | '03' | 'all'>('01')
const selectedColor = ref<string>('#00B09B')
const customHex = ref<string>('#00B09B')
const selectedHeight = ref<number>(28)
const copied = ref<boolean>(false)

const colorPresets = [
  { id: 'turquoise', name: 'Turquesa', value: '#00B09B', previewHex: '#00B09B' },
  { id: 'white', name: 'Blanco', value: '#FFFFFF', previewHex: '#FFFFFF' },
  { id: 'gold', name: 'Oro', value: '#FFB800', previewHex: '#FFB800' },
  { id: 'coral', name: 'Coral', value: '#FF6B35', previewHex: '#FF6B35' },
  { id: 'purple', name: 'Púrpura', value: '#9D4EDD', previewHex: '#9D4EDD' }
]

const grecaItems = [
  { id: '01' as const, name: 'GRECA 01', ratioText: '243 x 93' },
  { id: '02' as const, name: 'GRECA 02', ratioText: '93 x 93' },
  { id: '03' as const, name: 'GRECA 03', ratioText: '487 x 79' }
]

function selectPreset(val: string) {
  selectedColor.value = val
  customHex.value = val
}

function onHexChange() {
  if (customHex.value && customHex.value.trim() !== '') {
    selectedColor.value = customHex.value
  }
}

async function copySnippet() {
  const snippet = `<CalmecacGreca variant="${selectedVariant.value}" height="${selectedHeight.value}" color="${selectedColor.value}" />`
  try {
    await navigator.clipboard.writeText(snippet)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error copying to clipboard', err)
  }
}
</script>
