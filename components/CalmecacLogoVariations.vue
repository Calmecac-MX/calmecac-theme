<template>
  <div class="calmecac-logo-variations-container bg-calmecac-surface/90 border border-calmecac-border rounded-lg p-2 text-white shadow-2xl max-w-full max-h-[370px] flex flex-col justify-between overflow-hidden">
    <!-- TOP TOOLBAR: CONTROLS & FILTER TABS -->
    <div class="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-calmecac-border mb-1.5">
      <!-- LEFT: VIEW MODES -->
      <div class="flex items-center gap-1.5">
        <span class="text-[10px] font-condensed uppercase tracking-wider text-calmecac-gray">Filtrar:</span>
        <div class="inline-flex rounded p-0.5 bg-calmecac-black border border-calmecac-border text-[10px]">
          <button 
            @click="activeFilter = 'all'" 
            :class="[activeFilter === 'all' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-all flex items-center gap-1"
          >
            <span>❖ Todas (6)</span>
          </button>
          <button 
            @click="activeFilter = 'positivo'" 
            :class="[activeFilter === 'positivo' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-all flex items-center gap-1"
          >
            <span>✨ 3 Positivas</span>
          </button>
          <button 
            @click="activeFilter = 'negativo'" 
            :class="[activeFilter === 'negativo' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-all flex items-center gap-1"
          >
            <span>🔲 3 Negativas (B/N)</span>
          </button>
        </div>
      </div>

      <!-- RIGHT: B/N BACKGROUND POLARITY TOGGLE -->
      <div class="flex items-center gap-1.5">
        <span class="text-[9.5px] text-calmecac-gray font-condensed uppercase tracking-wider">Modo B/N:</span>
        <div class="inline-flex rounded p-0.5 bg-calmecac-black border border-calmecac-border text-[9.5px]">
          <button 
            @click="negativeBg = 'dark'" 
            :class="[negativeBg === 'dark' ? 'bg-white text-black font-bold shadow-[0_0_6px_rgba(255,255,255,0.4)]' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 rounded transition-all flex items-center gap-1"
          >
            <span>◼️ Fondo Negro</span>
          </button>
          <button 
            @click="negativeBg = 'light'" 
            :class="[negativeBg === 'light' ? 'bg-slate-200 text-black font-bold shadow-[0_0_6px_rgba(255,255,255,0.4)]' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 rounded transition-all flex items-center gap-1"
          >
            <span>◻️ Fondo Blanco</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN CARDS GRID (COMPACT 3-COLUMNS FIT FOR SLIDE WITH ZERO SCROLLBAR) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1 overflow-hidden">
      <div 
        v-for="item in displayItems" 
        :key="item.id"
        @click="selectItem(item)"
        class="group relative p-2 bg-calmecac-card/80 border rounded-sm transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg"
        :class="[
          selectedItem?.id === item.id ? 'border-calmecac-turquoise ring-1 ring-calmecac-turquoise/50 shadow-[0_0_12px_rgba(0,176,155,0.2)]' : 'border-calmecac-border hover:border-calmecac-turquoise/60',
          item.highlight ? 'border-t-2 border-t-calmecac-turquoise' : ''
        ]"
      >
        <!-- CARD HEADER -->
        <div class="flex items-center justify-between border-b border-calmecac-border/50 pb-1 mb-1">
          <div class="flex items-center gap-1 min-w-0">
            <span 
              class="w-1.5 h-1.5 rounded-full flex-shrink-0" 
              :class="item.polarity === 'positivo' ? 'bg-calmecac-turquoise shadow-[0_0_5px_#00B09B]' : (negativeBg === 'dark' ? 'bg-white shadow-[0_0_5px_#FFFFFF]' : 'bg-slate-800')"
            ></span>
            <h4 class="font-condensed font-bold text-[11px] uppercase tracking-wide text-white m-0 group-hover:text-calmecac-turquoise transition-colors truncate">
              {{ item.title }}
            </h4>
          </div>
          <span 
            class="text-[8.5px] font-mono uppercase tracking-wider px-1 py-0.2 rounded border flex-shrink-0 ml-1"
            :class="item.badgeClass"
          >
            {{ item.badge }}
          </span>
        </div>

        <!-- PREVIEW CONTAINER -->
        <div 
          class="h-[52px] flex items-center justify-center rounded-xs transition-all duration-300 relative overflow-hidden"
          :class="[item.bgClass, item.borderClass]"
        >
          <!-- Subtle Aztec pattern overlay or grid lines for preview container -->
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#00B09B_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none"></div>

          <CalmecacLogo 
            :variant="item.variant" 
            :polarity="item.polarity" 
            :color="item.color" 
            :size="item.logoSize" 
          />
        </div>

        <!-- CARD FOOTER / DESCRIPTION -->
        <div class="mt-1 pt-0.5 border-t border-calmecac-border/30 flex items-center justify-between">
          <p class="text-[9.5px] text-calmecac-gray m-0 leading-tight truncate">
            {{ item.description }}
          </p>
          <span class="text-[8.5px] text-calmecac-turquoise opacity-0 group-hover:opacity-100 transition-opacity font-mono flex-shrink-0 ml-1">
            🔍 Detalle
          </span>
        </div>
      </div>
    </div>

    <!-- MODAL / DETAIL DRAWER OVERLAY WHEN AN ITEM IS SELECTED -->
    <Transition name="fade">
      <div 
        v-if="selectedItem" 
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="selectedItem = null"
      >
        <div class="bg-[#121215] border border-calmecac-turquoise/60 rounded-md p-4 max-w-md w-full shadow-2xl relative text-white animate-in zoom-in-95 duration-200">
          <!-- CLOSE BUTTON -->
          <button 
            @click="selectedItem = null"
            class="absolute top-2.5 right-2.5 text-calmecac-gray hover:text-white text-base font-bold w-6 h-6 rounded-full bg-calmecac-black border border-calmecac-border flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          <!-- MODAL HEADER -->
          <div class="flex items-center gap-2 border-b border-calmecac-border pb-2 mb-3">
            <span 
              class="w-2.5 h-2.5 rounded-full" 
              :class="selectedItem.polarity === 'positivo' ? 'bg-calmecac-turquoise shadow-[0_0_8px_#00B09B]' : (negativeBg === 'dark' ? 'bg-white shadow-[0_0_8px_#FFFFFF]' : 'bg-black border border-white')"
            ></span>
            <div>
              <h3 class="font-condensed font-bold text-base text-white uppercase tracking-wide m-0">
                {{ selectedItem.title }}
              </h3>
              <p class="text-[11px] text-calmecac-turquoise font-mono m-0 mt-0.5">
                Especificación Técnica :: {{ selectedItem.badge }}
              </p>
            </div>
          </div>

          <!-- ENLARGED PREVIEW -->
          <div 
            class="h-28 flex items-center justify-center rounded border mb-3 p-3 transition-colors relative overflow-hidden"
            :class="[selectedItem.bgClass, selectedItem.borderClass]"
          >
            <CalmecacLogo 
              :variant="selectedItem.variant" 
              :polarity="selectedItem.polarity" 
              :color="selectedItem.color" 
              size="56px" 
            />
          </div>

          <!-- SPECS & RULES -->
          <div class="grid grid-cols-2 gap-2 text-[11px] mb-3">
            <div class="bg-calmecac-black p-2 rounded border border-calmecac-border">
              <span class="text-calmecac-gray block font-condensed uppercase tracking-wider text-[9px]">Uso Recomendado:</span>
              <span class="text-white font-medium block mt-0.5">{{ selectedItem.useCase }}</span>
            </div>
            <div class="bg-calmecac-black p-2 rounded border border-calmecac-border">
              <span class="text-calmecac-gray block font-condensed uppercase tracking-wider text-[9px]">Superficie / Fondo:</span>
              <span class="text-calmecac-turquoise font-mono block mt-0.5">{{ selectedItem.backgroundHex }}</span>
            </div>
          </div>

          <!-- DESCRIPTION & INSTRUCTIONS -->
          <p class="text-[11px] text-calmecac-gray leading-relaxed m-0 border-t border-calmecac-border/40 pt-2">
            {{ selectedItem.longDescription }}
          </p>

          <div class="mt-3 pt-2 border-t border-calmecac-border flex justify-end">
            <button 
              @click="selectedItem = null"
              class="px-3 py-1 bg-calmecac-turquoise text-black font-condensed font-bold text-xs uppercase tracking-wider rounded hover:bg-calmecac-turquoise/90 transition-colors"
            >
              Cerrar Vista
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalmecacLogo from './CalmecacLogo.vue'

interface VariationItem {
  id: string
  title: string
  variant: 'isotipo' | 'nombre' | 'vector'
  polarity: 'positivo' | 'negativo'
  color: 'turquoise' | 'white' | 'black'
  logoSize: string
  badge: string
  badgeClass: string
  bgType: 'dark' | 'light'
  bgClass: string
  borderClass: string
  description: string
  longDescription: string
  useCase: string
  backgroundHex: string
  highlight?: boolean
}

const activeFilter = ref<'all' | 'positivo' | 'negativo'>('all')
const negativeBg = ref<'dark' | 'light'>('dark')
const selectedItem = ref<VariationItem | null>(null)

const displayItems = computed<VariationItem[]>(() => {
  const isDark = negativeBg.value === 'dark'

  const list: VariationItem[] = [
    // 3 POSITIVAS (TURQUESA)
    {
      id: 'iso-pos',
      title: 'ISOTIPO (POSITIVO)',
      variant: 'isotipo',
      polarity: 'positivo',
      color: 'turquoise',
      logoSize: '36px',
      badge: 'Turquesa Base',
      badgeClass: 'bg-calmecac-turquoise/20 text-calmecac-turquoise border-calmecac-turquoise/40',
      bgType: 'dark',
      bgClass: 'bg-[#09090B]',
      borderClass: 'border border-calmecac-border',
      description: 'Símbolo circular azteca aislado.',
      longDescription: 'El Isotipo Positivo en turquesa Calmécac sobre superficie Monolithic Black (#09090B).',
      useCase: 'Avatares, Favicons, App Icons',
      backgroundHex: 'Monolithic Black (#09090B)',
      highlight: true
    },
    {
      id: 'wordmark-pos',
      title: 'NOMBRE (POSITIVO)',
      variant: 'nombre',
      polarity: 'positivo',
      color: 'turquoise',
      logoSize: '28px',
      badge: 'Turquesa Wordmark',
      badgeClass: 'bg-calmecac-turquoise/20 text-calmecac-turquoise border-calmecac-turquoise/40',
      bgType: 'dark',
      bgClass: 'bg-[#09090B]',
      borderClass: 'border border-calmecac-border',
      description: 'Wordmark "CALMÉCAC" vectorial solo.',
      longDescription: 'Wordmark tipográfico en turquesa sobre superficie Monolithic Black (#09090B).',
      useCase: 'Cabeceras, Footers, Titulares',
      backgroundHex: 'Monolithic Black (#09090B)'
    },
    {
      id: 'vector-pos',
      title: 'VECTOR (POSITIVO)',
      variant: 'vector',
      polarity: 'positivo',
      color: 'turquoise',
      logoSize: '30px',
      badge: 'Firma Principal',
      badgeClass: 'bg-calmecac-turquoise text-black font-bold border-calmecac-turquoise',
      bgType: 'dark',
      bgClass: 'bg-[#09090B]',
      borderClass: 'border border-calmecac-turquoise/70 shadow-[0_0_10px_rgba(0,176,155,0.15)]',
      description: 'Isotipo + Nombre combinados.',
      longDescription: 'Imagotipo completo primario en turquesa sobre Monolithic Black (#09090B).',
      useCase: 'Presentaciones, Portadas, Firmas',
      backgroundHex: 'Monolithic Black (#09090B)',
      highlight: true
    },

    // 3 NEGATIVAS (NEGRO Y BLANCO)
    {
      id: 'iso-neg',
      title: 'ISOTIPO (NEGATIVO)',
      variant: 'isotipo',
      polarity: 'negativo',
      color: isDark ? 'white' : 'black',
      logoSize: '36px',
      badge: isDark ? 'Blanco s/ Negro' : 'Negro s/ Blanco',
      badgeClass: isDark ? 'bg-white/10 text-white border-white/30 font-bold' : 'bg-slate-200 text-slate-800 border-slate-300 font-bold',
      bgType: isDark ? 'dark' : 'light',
      bgClass: isDark ? 'bg-[#000000]' : 'bg-[#ECEFF1]',
      borderClass: isDark ? 'border border-zinc-800' : 'border border-slate-300',
      description: isDark ? 'Símbolo blanco sobre fondo negro.' : 'Símbolo negro sobre fondo claro.',
      longDescription: isDark 
        ? 'Isotipo circular azteca en blanco puro sobre fondo negro absoluto (#000000) para alto impacto visual.' 
        : 'Isotipo circular azteca en negro sobre fondo claro (#ECEFF1) para impresión y papelería.',
      useCase: isDark ? 'Pantallas OLED, Tarjetas Negras, Iconos' : 'Sellos, Papelería Clara, Merchandising',
      backgroundHex: isDark ? 'Black Absoluto (#000000)' : 'Light Slate (#ECEFF1)'
    },
    {
      id: 'wordmark-neg',
      title: 'NOMBRE (NEGATIVO)',
      variant: 'nombre',
      polarity: 'negativo',
      color: isDark ? 'white' : 'black',
      logoSize: '28px',
      badge: isDark ? 'Blanco s/ Negro' : 'Negro s/ Blanco',
      badgeClass: isDark ? 'bg-white/10 text-white border-white/30 font-bold' : 'bg-slate-200 text-slate-800 border-slate-300 font-bold',
      bgType: isDark ? 'dark' : 'light',
      bgClass: isDark ? 'bg-[#000000]' : 'bg-[#ECEFF1]',
      borderClass: isDark ? 'border border-zinc-800' : 'border border-slate-300',
      description: isDark ? 'Wordmark blanco sobre fondo negro.' : 'Wordmark negro sobre fondo claro.',
      longDescription: isDark 
        ? 'Wordmark "CALMÉCAC" en blanco puro sobre fondo negro absoluto (#000000).' 
        : 'Wordmark "CALMÉCAC" en negro sobre fondo claro (#ECEFF1) para publicaciones impresas.',
      useCase: isDark ? 'Publicidad Digital, Video, Credenciales' : 'Documentación Monocromática, Libros',
      backgroundHex: isDark ? 'Black Absoluto (#000000)' : 'Light Slate (#ECEFF1)'
    },
    {
      id: 'vector-neg',
      title: 'VECTOR (NEGATIVO)',
      variant: 'vector',
      polarity: 'negativo',
      color: isDark ? 'white' : 'black',
      logoSize: '30px',
      badge: isDark ? 'Blanco s/ Negro' : 'Negro s/ Blanco',
      badgeClass: isDark ? 'bg-white/10 text-white border-white/30 font-bold' : 'bg-slate-200 text-slate-800 border-slate-300 font-bold',
      bgType: isDark ? 'dark' : 'light',
      bgClass: isDark ? 'bg-[#000000]' : 'bg-[#ECEFF1]',
      borderClass: isDark ? 'border border-zinc-800' : 'border border-slate-300',
      description: isDark ? 'Vector blanco sobre fondo negro.' : 'Vector negro sobre fondo claro.',
      longDescription: isDark 
        ? 'Imagotipo completo (Símbolo + Wordmark) en blanco sobre negro absoluto (#000000).' 
        : 'Imagotipo completo (Símbolo + Wordmark) en negro sobre fondo claro (#ECEFF1).',
      useCase: isDark ? 'Monitores OLED, Cierre de Video' : 'Facturación, Papelería Oficial, PDF',
      backgroundHex: isDark ? 'Black Absoluto (#000000)' : 'Light Slate (#ECEFF1)'
    }
  ]

  if (activeFilter.value === 'positivo') {
    return list.filter(i => i.polarity === 'positivo')
  }
  if (activeFilter.value === 'negativo') {
    return list.filter(i => i.polarity === 'negativo')
  }
  return list
})

function selectItem(item: VariationItem) {
  selectedItem.value = item
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
