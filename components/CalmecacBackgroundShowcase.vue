<template>
  <div class="h-full flex flex-col justify-between gap-4">
    <div class="shrink-0">
      <p class="text-sm text-calmecac-gray leading-relaxed m-0">
        El fondo de la presentación utiliza el patrón geométrico vectorial **CALMÉCAC**. Permite personalizar dinámicamente **ambos tonos**: el color de fondo (<code class="text-calmecac-turquoise font-mono">bgColor</code>) y el color del patrón (<code class="text-calmecac-turquoise font-mono">patternColor</code>), así como la opacidad global o por slide.
      </p>
    </div>

    <!-- Live Preview & Interactive Controls -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0 items-center">
      <!-- Interactive Preview Panel -->
      <div class="md:col-span-7 h-64 md:h-full relative rounded-md border border-calmecac-border overflow-hidden shadow-2xl flex items-center justify-center">
        <CalmecacBackground 
          :bg-color="previewBgColor" 
          :pattern-color="previewPatternColor" 
          :opacity="previewOpacity"
          :bg-pattern="true" 
        />
        
        <div class="relative z-10 p-6 bg-black/60 backdrop-blur-md border border-calmecac-border/60 rounded-md text-center max-w-sm">
          <div class="text-xs font-condensed font-bold text-calmecac-turquoise uppercase tracking-widest mb-1">
            VISTA PREVIA EN VIVO
          </div>
          <div class="font-mono text-xs text-white space-y-1 text-left">
            <div><span class="text-calmecac-gray">bgColor:</span> <span class="text-calmecac-turquoise font-bold">{{ previewBgColor }}</span></div>
            <div><span class="text-calmecac-gray">patternColor:</span> <span class="text-calmecac-turquoise font-bold">{{ previewPatternColor }}</span></div>
            <div><span class="text-calmecac-gray">patternOpacity:</span> <span class="text-calmecac-turquoise font-bold">{{ previewOpacity }}</span></div>
          </div>
        </div>
      </div>

      <!-- Control Sliders & Presets -->
      <div class="md:col-span-5 flex flex-col gap-3 justify-center">
        <!-- Preset Theme Buttons -->
        <div class="p-3 bg-calmecac-surface border border-calmecac-border rounded-md">
          <div class="text-xs font-condensed font-bold uppercase text-white mb-2 tracking-wider">
            PRESETS RÁPIDOS
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button 
              @click="setPreset('#09090B', '#00B09B', 0.2)"
              class="px-2.5 py-1.5 rounded text-xs font-condensed uppercase tracking-wider bg-calmecac-black border border-calmecac-turquoise text-calmecac-turquoise hover:bg-calmecac-turquoise hover:text-black transition-colors"
            >
              🌙 Turquesa / Oscuro
            </button>
            <button 
              @click="setPreset('#FFFFFF', '#000000', 0.85)"
              class="px-2.5 py-1.5 rounded text-xs font-condensed uppercase tracking-wider bg-white border border-gray-300 text-black hover:bg-gray-200 transition-colors"
            >
              ☀️ Negro / Blanco
            </button>
            <button 
              @click="setPreset('#09090B', '#FFFFFF', 0.25)"
              class="px-2.5 py-1.5 rounded text-xs font-condensed uppercase tracking-wider bg-calmecac-black border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              ⚪ Blanco / Oscuro
            </button>
            <button 
              @click="setPreset('#00B09B', '#09090B', 0.35)"
              class="px-2.5 py-1.5 rounded text-xs font-condensed uppercase tracking-wider bg-calmecac-turquoise border border-black text-black font-bold hover:brightness-110 transition-all"
            >
              💎 Negro / Turquesa
            </button>
          </div>
        </div>

        <!-- Custom Color Inputs -->
        <div class="p-3 bg-calmecac-surface border border-calmecac-border rounded-md space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-condensed text-calmecac-gray uppercase font-bold">Color de Fondo (bgColor):</label>
            <input type="color" v-model="previewBgColor" class="w-8 h-6 rounded cursor-pointer bg-transparent border border-calmecac-border p-0" />
          </div>

          <div class="flex items-center justify-between">
            <label class="text-xs font-condensed text-calmecac-gray uppercase font-bold">Color de Figuras (patternColor):</label>
            <input type="color" v-model="previewPatternColor" class="w-8 h-6 rounded cursor-pointer bg-transparent border border-calmecac-border p-0" />
          </div>

          <div>
            <div class="flex justify-between text-xs font-condensed text-calmecac-gray mb-1">
              <span>Opacidad:</span>
              <span class="text-calmecac-turquoise font-mono font-bold">{{ Math.round(previewOpacity * 100) }}%</span>
            </div>
            <input type="range" min="0.05" max="1" step="0.05" v-model.number="previewOpacity" class="w-full accent-calmecac-turquoise cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalmecacBackground from './CalmecacBackground.vue'

const previewBgColor = ref('#09090B')
const previewPatternColor = ref('#00B09B')
const previewOpacity = ref(0.2)

function setPreset(bg: string, pattern: string, opacity: number) {
  previewBgColor.value = bg
  previewPatternColor.value = pattern
  previewOpacity.value = opacity
}
</script>
