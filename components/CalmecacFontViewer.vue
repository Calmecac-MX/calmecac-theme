<template>
  <div class="calmecac-font-viewer border border-calmecac-border bg-calmecac-surface/95 p-3.5 rounded-lg shadow-xl text-white">
    <!-- Top Bar: Title & Tab Switcher -->
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-calmecac-border/80 pb-2.5">
      <div class="flex items-center gap-2">
        <span class="font-condensed font-bold text-xs uppercase tracking-widest text-calmecac-turquoise">
          VISOR INTERACTIVO DE TIPOGRAFÍAS
        </span>
        <span class="px-2 py-0.5 text-[9px] font-mono bg-calmecac-turquoise/15 text-calmecac-turquoise border border-calmecac-turquoise/30 rounded">
          TYPE SYSTEM
        </span>
      </div>

      <!-- Tab Switcher -->
      <div class="flex items-center gap-1 bg-calmecac-black p-0.5 rounded border border-calmecac-border/60">
        <button 
          @click="activeTab = 'condensed'"
          class="px-2.5 py-0.5 text-[10.5px] font-condensed font-bold uppercase tracking-wider rounded transition-all duration-200"
          :class="activeTab === 'condensed' 
            ? 'bg-calmecac-turquoise text-calmecac-black font-extrabold shadow-[0_0_8px_rgba(0,176,155,0.4)]' 
            : 'text-calmecac-gray hover:text-white'"
        >
          PRIMARIA (CONDENSED)
        </button>
        <button 
          @click="activeTab = 'regular'"
          class="px-2.5 py-0.5 text-[10.5px] font-condensed font-bold uppercase tracking-wider rounded transition-all duration-200"
          :class="activeTab === 'regular' 
            ? 'bg-calmecac-turquoise text-calmecac-black font-extrabold shadow-[0_0_8px_rgba(0,176,155,0.4)]' 
            : 'text-calmecac-gray hover:text-white'"
        >
          SECUNDARIA (REGULAR)
        </button>
        <button 
          @click="activeTab = 'compare'"
          class="px-2.5 py-0.5 text-[10.5px] font-condensed font-bold uppercase tracking-wider rounded transition-all duration-200"
          :class="activeTab === 'compare' 
            ? 'bg-calmecac-turquoise text-calmecac-black font-extrabold shadow-[0_0_8px_rgba(0,176,155,0.4)]' 
            : 'text-calmecac-gray hover:text-white'"
        >
          COMPARATIVA
        </button>
        <button 
          @click="activeTab = 'glyphs'"
          class="px-2.5 py-0.5 text-[10.5px] font-condensed font-bold uppercase tracking-wider rounded transition-all duration-200"
          :class="activeTab === 'glyphs' 
            ? 'bg-calmecac-turquoise text-calmecac-black font-extrabold shadow-[0_0_8px_rgba(0,176,155,0.4)]' 
            : 'text-calmecac-gray hover:text-white'"
        >
          GLIFOS
        </button>
      </div>
    </div>

    <!-- Live Controls Bar (Compact single block) -->
    <div class="bg-calmecac-black border border-calmecac-border/80 p-2.5 rounded mb-3 space-y-2">
      <!-- Input text & presets -->
      <div class="flex items-center gap-2">
        <span class="font-condensed font-bold text-[11px] text-calmecac-turquoise uppercase tracking-wider shrink-0">TEXTO:</span>
        <input 
          v-model="sampleText" 
          type="text" 
          placeholder="Escribe tu texto de prueba..." 
          class="flex-1 bg-calmecac-surface border border-calmecac-border text-white text-xs px-2.5 py-1 rounded focus:border-calmecac-turquoise focus:outline-none transition-colors"
        />
        <div class="hidden sm:flex items-center gap-1 shrink-0">
          <button 
            v-for="preset in presets" 
            :key="preset"
            @click="sampleText = preset"
            class="px-2 py-0.5 text-[9.5px] font-mono border rounded transition-colors"
            :class="sampleText === preset 
              ? 'border-calmecac-turquoise text-calmecac-turquoise bg-calmecac-turquoise/10' 
              : 'border-calmecac-border text-calmecac-gray hover:text-white'"
          >
            {{ preset.length > 16 ? preset.slice(0, 14) + '...' : preset }}
          </button>
        </div>
      </div>

      <!-- Sliders & Formatting Options (All inline) -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-1.5 border-t border-calmecac-border/40 text-xs">
        <!-- Font Size Slider -->
        <div class="flex items-center gap-1.5">
          <span class="text-calmecac-gray font-mono text-[10px]">TAMAÑO:</span>
          <input 
            v-model.number="fontSize" 
            type="range" 
            min="14" 
            max="44" 
            class="w-24 accent-calmecac-turquoise" 
          />
          <span class="font-mono text-[10px] text-calmecac-turquoise w-7 text-right">{{ fontSize }}px</span>
        </div>

        <!-- Tracking Slider -->
        <div class="flex items-center gap-1.5">
          <span class="text-calmecac-gray font-mono text-[10px]">TRACKING:</span>
          <input 
            v-model.number="letterSpacing" 
            type="range" 
            min="0" 
            max="0.20" 
            step="0.01" 
            class="w-24 accent-calmecac-turquoise" 
          />
          <span class="font-mono text-[10px] text-calmecac-turquoise w-9 text-right">{{ letterSpacing }}em</span>
        </div>

        <!-- Font Weight Selector -->
        <div class="flex items-center gap-1.5">
          <span class="text-calmecac-gray font-mono text-[10px]">PESO:</span>
          <div class="flex gap-1">
            <button 
              v-for="w in availableWeights" 
              :key="w"
              @click="fontWeight = w"
              class="px-1.5 py-0.5 text-[9.5px] font-mono border rounded transition-colors"
              :class="fontWeight === w ? 'border-calmecac-turquoise bg-calmecac-turquoise text-calmecac-black font-bold' : 'border-calmecac-border text-calmecac-gray hover:text-white'"
            >
              {{ w }}
            </button>
          </div>
        </div>

        <!-- Transform Toggle -->
        <div class="flex items-center gap-1.5">
          <span class="text-calmecac-gray font-mono text-[10px]">MAYÚS:</span>
          <button 
            @click="isUppercase = !isUppercase"
            class="px-2 py-0.5 text-[9.5px] font-mono border rounded transition-colors"
            :class="isUppercase ? 'border-calmecac-turquoise text-calmecac-turquoise bg-calmecac-turquoise/20' : 'border-calmecac-border text-calmecac-gray'"
          >
            {{ isUppercase ? 'MAYÚSCULAS' : 'NORMAL' }}
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 1: ROBOTO CONDENSED (PRIMARIA) -->
    <div v-if="activeTab === 'condensed'" class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <!-- Preview Canvas (2 cols) -->
      <div class="lg:col-span-2 bg-calmecac-black border border-calmecac-border p-3 rounded flex flex-col justify-between relative overflow-hidden">
        <div class="flex items-center justify-between text-[11px] font-condensed font-bold text-calmecac-turquoise mb-2">
          <span class="tracking-widest">DEMOSTRACIÓN PRIMARIA — ROBOTO CONDENSED</span>
          <span class="font-mono text-[9.5px] text-calmecac-gray">font-family: 'Roboto Condensed'</span>
        </div>

        <!-- Specimen Box -->
        <div class="my-auto py-4 px-2 min-h-[95px] flex items-center justify-center text-center border-y border-calmecac-border/30 bg-[radial-gradient(circle_at_center,rgba(0,176,155,0.05)_0%,transparent_70%)]">
          <div 
            :style="{
              fontFamily: `'Roboto Condensed', sans-serif`,
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}em`,
              textTransform: isUppercase ? 'uppercase' : 'none',
              lineHeight: 1.15
            }"
            class="text-white transition-all duration-150 break-words max-w-full"
          >
            {{ sampleText || 'CALMÉCAC BRAND IDENTITY' }}
          </div>
        </div>

        <div class="mt-2 text-[10px] font-mono text-calmecac-gray flex justify-between">
          <span>USO: LOGOTIPO & TITULARES</span>
          <span>ESTILO: CONDENSADO MONUMENTAL</span>
        </div>
      </div>

      <!-- Specs Sidebar (1 col) -->
      <div class="bg-calmecac-surface border border-calmecac-border p-3 rounded flex flex-col justify-between text-xs">
        <div>
          <div class="font-condensed font-bold text-calmecac-turquoise text-xs mb-1 uppercase tracking-wide">
            ROBOTO CONDENSED BLACK
          </div>
          <div class="text-[10.5px] text-calmecac-gray mb-2 leading-tight">
            Tipografía principal. Transmite fuerza, estructura y carácter monumental.
          </div>
        </div>

        <!-- CSS Snippet Box -->
        <div class="bg-calmecac-black border border-calmecac-border/80 p-2 rounded font-mono text-[9.5px] text-calmecac-turquoise">
          <div class="text-calmecac-gray text-[8.5px] uppercase tracking-wider mb-0.5">CSS GENERADO:</div>
          <div>font-family: 'Roboto Condensed';</div>
          <div>font-weight: {{ fontWeight }}; letter-spacing: {{ letterSpacing }}em;</div>
        </div>
      </div>
    </div>

    <!-- TAB 2: ROBOTO REGULAR (SECUNDARIA) -->
    <div v-if="activeTab === 'regular'" class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div class="lg:col-span-2 bg-calmecac-black border border-calmecac-border p-3 rounded flex flex-col justify-between">
        <div class="flex items-center justify-between text-[11px] font-condensed font-bold text-calmecac-turquoise mb-2">
          <span class="tracking-widest">DEMOSTRACIÓN SECUNDARIA — ROBOTO REGULAR</span>
          <span class="font-mono text-[9.5px] text-calmecac-gray">font-family: 'Roboto'</span>
        </div>

        <div class="my-auto py-4 px-3 min-h-[95px] flex items-center justify-center border-y border-calmecac-border/30">
          <div 
            :style="{
              fontFamily: `'Roboto', sans-serif`,
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}em`,
              textTransform: isUppercase ? 'uppercase' : 'none',
              lineHeight: 1.4
            }"
            class="text-white transition-all duration-150 break-words max-w-full"
          >
            {{ sampleText || 'Utilizada para párrafos de texto, descripciones y cuerpo de presentación.' }}
          </div>
        </div>

        <div class="mt-2 text-[10px] font-mono text-calmecac-gray flex justify-between">
          <span>USO: BODY COPY & PÁRRAFOS</span>
          <span>ESTILO: LEGIBILIDAD PANTALLA</span>
        </div>
      </div>

      <div class="bg-calmecac-surface border border-calmecac-border p-3 rounded flex flex-col justify-between text-xs">
        <div>
          <div class="font-condensed font-bold text-calmecac-turquoise text-xs mb-1 uppercase tracking-wide">
            ROBOTO REGULAR
          </div>
          <div class="text-[10.5px] text-calmecac-gray mb-2 leading-tight">
            Tipografía de lectura continua. Alta legibilidad y neutralidad estética.
          </div>
        </div>

        <div class="bg-calmecac-black border border-calmecac-border/80 p-2 rounded font-mono text-[9.5px] text-calmecac-turquoise">
          <div class="text-calmecac-gray text-[8.5px] uppercase tracking-wider mb-0.5">CSS GENERADO:</div>
          <div>font-family: 'Roboto', sans-serif;</div>
          <div>font-weight: {{ fontWeight }}; line-height: 1.4;</div>
        </div>
      </div>
    </div>

    <!-- TAB 3: COMPARATIVA -->
    <div v-if="activeTab === 'compare'" class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-calmecac-black border border-calmecac-border p-3 rounded">
        <div class="text-[11px] font-condensed font-bold text-calmecac-turquoise uppercase tracking-widest mb-2 border-b border-calmecac-border/60 pb-1 flex justify-between">
          <span>ROBOTO CONDENSED (TITULARES)</span>
          <span class="font-mono text-[9px] text-calmecac-gray">WEIGHT {{ fontWeight }}</span>
        </div>
        <div 
          :style="{
            fontFamily: `'Roboto Condensed', sans-serif`,
            fontSize: `${Math.max(fontSize, 18)}px`,
            fontWeight: 900,
            letterSpacing: `${letterSpacing}em`,
            textTransform: 'uppercase',
            lineHeight: 1.15
          }"
          class="text-white my-2"
        >
          {{ sampleText || 'SISTEMA Y ESTRATEGIA CALMÉCAC' }}
        </div>
      </div>

      <div class="bg-calmecac-black border border-calmecac-border p-3 rounded">
        <div class="text-[11px] font-condensed font-bold text-calmecac-turquoise uppercase tracking-widest mb-2 border-b border-calmecac-border/60 pb-1 flex justify-between">
          <span>ROBOTO REGULAR (CUERPO)</span>
          <span class="font-mono text-[9px] text-calmecac-gray">REGULAR 400</span>
        </div>
        <div 
          :style="{
            fontFamily: `'Roboto', sans-serif`,
            fontSize: `${Math.min(fontSize, 20)}px`,
            fontWeight: 400,
            lineHeight: 1.4
          }"
          class="text-calmecac-gray my-2"
        >
          {{ sampleText || 'El sistema que transforma emprendedores en empresarios organizados.' }}
        </div>
      </div>
    </div>

    <!-- TAB 4: GLIFOS -->
    <div v-if="activeTab === 'glyphs'" class="bg-calmecac-black border border-calmecac-border p-3 rounded space-y-2.5">
      <div class="flex items-center justify-between text-[11px] font-condensed font-bold text-calmecac-turquoise border-b border-calmecac-border/60 pb-1.5">
        <span class="tracking-widest">MAPA DE CARACTERES INSTITUCIONALES</span>
        <span class="font-mono text-[9px] text-calmecac-gray">A-Z, 0-9 & ACENTOS</span>
      </div>

      <div class="space-y-2">
        <div>
          <div class="text-[9.5px] font-mono text-calmecac-gray uppercase mb-1">MAYÚSCULAS CON ACENTOS:</div>
          <div class="flex flex-wrap gap-1 font-condensed font-bold text-xs text-white">
            <span 
              v-for="char in uppercaseChars" 
              :key="char"
              class="w-6 h-6 flex items-center justify-center bg-calmecac-surface border border-calmecac-border rounded text-calmecac-turquoise hover:border-calmecac-turquoise transition-colors"
            >
              {{ char }}
            </span>
          </div>
        </div>

        <div>
          <div class="text-[9.5px] font-mono text-calmecac-gray uppercase mb-1">NÚMEROS Y MONEDA:</div>
          <div class="flex flex-wrap gap-1 font-condensed font-bold text-xs text-white">
            <span 
              v-for="num in numberChars" 
              :key="num"
              class="w-6 h-6 flex items-center justify-center bg-calmecac-surface border border-calmecac-border rounded text-white hover:border-calmecac-turquoise transition-colors font-mono text-[11px]"
            >
              {{ num }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref<'condensed' | 'regular' | 'compare' | 'glyphs'>('condensed')

const sampleText = ref('CALMÉCAC: DEJA DE IMPROVISAR. EMPIEZA A CONSTRUIR.')
const fontSize = ref(24)
const letterSpacing = ref(0.06)
const fontWeight = ref(900)
const isUppercase = ref(true)

const uppercaseChars = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ'.split('')
const numberChars = '0123456789$%€MXN'.split('')

const presets = [
  'CALMÉCAC 2026',
  'DEJA DE IMPROVISAR',
  '0123456789 - ABCDEF'
]

const availableWeights = computed(() => {
  if (activeTab.value === 'condensed') {
    return [400, 700, 900]
  }
  return [300, 400, 500, 700]
})
</script>

<style scoped>
.calmecac-font-viewer input[type="range"] {
  height: 4px;
  border-radius: 2px;
}
</style>
