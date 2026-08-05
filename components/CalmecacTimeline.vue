<template>
  <div 
    class="calmecac-timeline w-full relative z-10 my-auto"
    :class="[
      direction === 'vertical' ? 'py-4' : 'px-2 py-6'
    ]"
  >
    <!-- HORIZONTAL TIMELINE -->
    <div 
      v-if="direction !== 'vertical'" 
      class="horizontal-timeline flex flex-col justify-center"
    >
      <!-- Timeline Track & Nodes Container -->
      <div class="relative w-full">
        <!-- Connecting Track Line behind nodes -->
        <div class="absolute top-[22px] left-8 right-8 h-1 bg-calmecac-border rounded-full z-0 overflow-hidden">
          <!-- Active Gradient Fill Portion -->
          <div 
            class="h-full bg-gradient-to-r from-calmecac-turquoise via-calmecac-turquoise to-emerald-400 transition-all duration-500 shadow-[0_0_12px_rgba(0,176,155,0.8)]"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>

        <!-- Grid of Timeline Items -->
        <div 
          class="grid gap-4 md:gap-6 relative z-10 items-start"
          :style="{ gridTemplateColumns: `repeat(${itemsList.length}, minmax(0, 1fr))` }"
        >
          <div 
            v-for="(item, index) in itemsList" 
            :key="index"
            class="timeline-item flex flex-col items-center group cursor-pointer text-center"
          >
            <!-- Step Node Badge / Circle -->
            <div class="relative mb-5 flex items-center justify-center">
              <!-- Glow Aura for Active Step -->
              <div 
                v-if="isItemActive(item, index)"
                class="absolute -inset-2 rounded-full bg-calmecac-turquoise/30 animate-pulse blur-sm"
              ></div>

              <div 
                class="w-11 h-11 rounded-full flex items-center justify-center font-condensed font-bold text-sm tracking-wider transition-all duration-300 relative z-10 border-2"
                :class="[
                  isItemCompleted(item, index)
                    ? 'bg-calmecac-turquoise text-calmecac-black border-calmecac-turquoise shadow-[0_0_15px_rgba(0,176,155,0.5)]'
                    : isItemActive(item, index)
                    ? 'bg-calmecac-surface text-calmecac-turquoise border-calmecac-turquoise shadow-[0_0_20px_rgba(0,176,155,0.7)] scale-110'
                    : 'bg-calmecac-card-bg text-calmecac-gray border-calmecac-border hover:border-calmecac-turquoise/60'
                ]"
              >
                <!-- Icon or Checkmark or Step Number -->
                <span v-if="item.icon" class="text-base leading-none">{{ item.icon }}</span>
                <span v-else-if="isItemCompleted(item, index)" class="text-base font-black">✓</span>
                <span v-else>{{ item.step || (index + 1) }}</span>
              </div>
            </div>

            <!-- Content Card -->
            <div 
              class="w-full calmecac-card relative p-4 rounded-md transition-all duration-300 text-left flex flex-col justify-between min-h-[140px]"
              :class="[
                isItemActive(item, index)
                  ? 'bg-calmecac-surface/90 border-calmecac-turquoise shadow-[0_0_20px_rgba(0,176,155,0.25)] -translate-y-1'
                  : 'bg-calmecac-card-bg/80 border-calmecac-border hover:border-calmecac-turquoise/50'
              ]"
            >
              <!-- Top Header / Date Pill -->
              <div class="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-calmecac-border/40">
                <span 
                  class="font-condensed text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs"
                  :class="[
                    isItemActive(item, index) 
                      ? 'bg-calmecac-turquoise/20 text-calmecac-turquoise border border-calmecac-turquoise/40' 
                      : 'text-calmecac-gray bg-calmecac-black/40'
                  ]"
                >
                  {{ getItemDate(item, index) }}
                </span>
                
                <span 
                  v-if="item.tag || item.label || item.badge"
                  class="text-[10px] uppercase font-condensed tracking-wider text-calmecac-turquoise opacity-80"
                >
                  {{ item.tag || item.label || item.badge }}
                </span>
              </div>

              <!-- Title -->
              <h4 
                class="font-condensed text-base font-bold uppercase tracking-wide leading-tight mb-2 m-0"
                :class="[
                  isItemActive(item, index) ? 'text-white' : 'text-gray-200'
                ]"
              >
                {{ getItemTitle(item) }}
              </h4>

              <!-- Description -->
              <p class="text-xs text-calmecac-gray leading-relaxed flex-1 m-0">
                {{ getItemDescription(item) }}
              </p>

              <!-- Active Greca Accent line on bottom of card -->
              <div 
                v-if="isItemActive(item, index)"
                class="h-0.5 w-full bg-calmecac-turquoise mt-3 shadow-[0_0_8px_#00B09B]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VERTICAL TIMELINE -->
    <div 
      v-else 
      class="vertical-timeline max-w-3xl mx-auto relative pl-6 md:pl-10 space-y-6"
    >
      <!-- Vertical Connecting Line -->
      <div class="absolute top-2 bottom-2 left-[15px] md:left-[23px] w-1 bg-calmecac-border rounded-full z-0 overflow-hidden">
        <div 
          class="w-full bg-gradient-to-b from-calmecac-turquoise via-calmecac-turquoise to-emerald-400 transition-all duration-500 shadow-[0_0_12px_rgba(0,176,155,0.8)]"
          :style="{ height: progressPercentage + '%' }"
        ></div>
      </div>

      <!-- Vertical Timeline Items -->
      <div 
        v-for="(item, index) in itemsList" 
        :key="index"
        class="timeline-item relative flex items-start gap-4 md:gap-6 group"
      >
        <!-- Node Circle -->
        <div class="absolute -left-[24px] md:-left-[32px] top-1 z-10 flex items-center justify-center">
          <div 
            v-if="isItemActive(item, index)"
            class="absolute -inset-1.5 rounded-full bg-calmecac-turquoise/30 animate-pulse blur-xs"
          ></div>

          <div 
            class="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-condensed font-bold text-xs md:text-sm tracking-wider border-2"
            :class="[
              isItemCompleted(item, index)
                ? 'bg-calmecac-turquoise text-calmecac-black border-calmecac-turquoise shadow-[0_0_12px_rgba(0,176,155,0.5)]'
                : isItemActive(item, index)
                ? 'bg-calmecac-surface text-calmecac-turquoise border-calmecac-turquoise shadow-[0_0_15px_rgba(0,176,155,0.7)] scale-110'
                : 'bg-calmecac-card-bg text-calmecac-gray border-calmecac-border'
            ]"
          >
            <span v-if="item.icon" class="text-sm leading-none">{{ item.icon }}</span>
            <span v-else-if="isItemCompleted(item, index)" class="text-sm font-black">✓</span>
            <span v-else>{{ item.step || (index + 1) }}</span>
          </div>
        </div>

        <!-- Vertical Content Card -->
        <div 
          class="w-full calmecac-card relative p-4 rounded-md transition-all duration-300"
          :class="[
            isItemActive(item, index)
              ? 'bg-calmecac-surface/90 border-calmecac-turquoise shadow-[0_0_20px_rgba(0,176,155,0.25)]'
              : 'bg-calmecac-card-bg/80 border-calmecac-border hover:border-calmecac-turquoise/50'
          ]"
        >
          <div class="flex items-center justify-between gap-3 mb-1">
            <span class="font-condensed text-xs font-bold uppercase tracking-widest text-calmecac-turquoise">
              {{ getItemDate(item, index) }}
            </span>
            <span v-if="item.tag || item.label || item.badge" class="text-[10px] uppercase font-condensed tracking-wider text-calmecac-gray">
              {{ item.tag || item.label || item.badge }}
            </span>
          </div>
          <h4 class="font-condensed text-lg font-bold uppercase tracking-wide text-white m-0 mb-1">
            {{ getItemTitle(item) }}
          </h4>
          <p class="text-sm text-calmecac-gray leading-relaxed m-0">
            {{ getItemDescription(item) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TimelineItem {
  date?: string
  year?: string
  time?: string
  step?: string | number
  title?: string
  name?: string
  header?: string
  description?: string
  details?: string
  text?: string
  content?: string
  status?: 'completed' | 'active' | 'in-progress' | 'pending' | 'upcoming' | string
  active?: boolean
  completed?: boolean
  icon?: string
  tag?: string
  label?: string
  badge?: string
  color?: string
}

const props = withDefaults(defineProps<{
  items?: TimelineItem[]
  direction?: 'horizontal' | 'vertical'
  dense?: boolean
}>(), {
  items: () => [],
  direction: 'horizontal',
  dense: false
})

const itemsList = computed<TimelineItem[]>(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }
  // Default fallback example if items is empty
  return [
    { date: 'FASE 1', title: 'Planificación', description: 'Definición de objetivos y arquitectura inicial.', status: 'completed', icon: '📋' },
    { date: 'FASE 2', title: 'Diseño y Despliegue', description: 'Construcción del sistema visual y componentes.', status: 'active', icon: '⚡' },
    { date: 'FASE 3', title: 'Lanzamiento', description: 'Publicación oficial y monitoreo continuo.', status: 'pending', icon: '🚀' }
  ]
})

// Calculate active progress percentage along timeline bar
const progressPercentage = computed(() => {
  if (itemsList.value.length <= 1) return 100
  let activeIndex = itemsList.value.findIndex(item => isItemActive(item, itemsList.value.indexOf(item)))
  if (activeIndex === -1) {
    // Check for last completed
    for (let i = itemsList.value.length - 1; i >= 0; i--) {
      if (isItemCompleted(itemsList.value[i], i)) {
        activeIndex = i
        break
      }
    }
  }
  if (activeIndex === -1) activeIndex = 0
  
  const stepRatio = 100 / (itemsList.value.length - 1)
  return Math.min(100, Math.max(0, activeIndex * stepRatio))
})

function isItemActive(item: TimelineItem, index: number): boolean {
  if (item.active === true) return true
  if (item.status === 'active' || item.status === 'in-progress' || item.status === 'current') return true
  return false
}

function isItemCompleted(item: TimelineItem, index: number): boolean {
  if (item.completed === true) return true
  if (item.status === 'completed' || item.status === 'done') return true
  return false
}

function getItemDate(item: TimelineItem, index: number): string {
  return item.date || item.year || item.time || item.step?.toString() || `0${index + 1}`
}

function getItemTitle(item: TimelineItem): string {
  return item.title || item.name || item.header || 'Hito del Timeline'
}

function getItemDescription(item: TimelineItem): string {
  return item.description || item.details || item.text || item.content || ''
}
</script>

<style scoped>
.calmecac-timeline {
  font-family: 'Roboto', sans-serif;
}
</style>
