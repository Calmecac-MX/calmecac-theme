<template>
  <div class="slidev-layout cover relative flex flex-col justify-between h-full p-12 overflow-hidden text-calmecac-fg">
    <!-- Calmécac Vector Background Pattern - Adaptable dinámicamente al tema claro / oscuro -->
    <CalmecacBackground 
      :bg-pattern="true" 
      :bg-color="$frontmatter.bgColor" 
      :pattern-color="$frontmatter.patternColor" 
      :opacity="$frontmatter.patternOpacity || 0.75" 
      :alternate-odd="false" 
    />

    <!-- Glow Accent Overlay -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-calmecac-turquoise/15 via-transparent to-transparent pointer-events-none z-1" />

    <!-- Top Header Bar -->
    <div class="relative z-10 flex items-center justify-between border-b border-calmecac-border/40 pb-4">
      <div class="flex items-center gap-3">
        <CalmecacSymbol size="32" class="text-calmecac-turquoise" />
        <div v-if="$frontmatter.subtitle" class="font-condensed text-xs uppercase tracking-widest text-calmecac-gray border-l-2 border-calmecac-turquoise pl-3">
          {{ $frontmatter.subtitle }}
        </div>
      </div>
      <CalmecacBadge v-if="$frontmatter.badge" variant="solid">{{ $frontmatter.badge }}</CalmecacBadge>
    </div>

    <!-- Main Content Center -->
    <div class="relative z-10 my-auto max-w-4xl">
      <div v-if="$frontmatter.tagline" class="inline-block px-2.5 py-1 mb-4 text-[11px] font-condensed uppercase tracking-widest bg-calmecac-turquoise/15 text-calmecac-turquoise border border-calmecac-turquoise/30 rounded-xs backdrop-blur-xs">
        {{ $frontmatter.tagline }}
      </div>

      <h1 class="text-5xl lg:text-7xl font-900 tracking-tight leading-none mb-4 text-calmecac-heading">
        <slot />
      </h1>

      <p v-if="$frontmatter.description" class="text-xl text-calmecac-gray font-light max-w-2xl leading-relaxed mb-6">
        {{ $frontmatter.description }}
      </p>

      <div class="w-32 h-1 bg-calmecac-turquoise rounded-full shadow-[0_0_12px_#00B09B]" />
    </div>

    <!-- Bottom Metadata Bar -->
    <div class="relative z-10 flex items-center justify-between border-t border-calmecac-border/80 pt-4 text-xs font-condensed tracking-wider text-calmecac-gray">
      <div class="flex items-center gap-2">
        <span v-if="$frontmatter.author" class="font-bold text-calmecac-fg">{{ $frontmatter.author }}</span>
        <span v-if="$frontmatter.author && $frontmatter.date" class="mx-2 text-calmecac-turquoise">|</span>
        <span v-if="$frontmatter.date">{{ $frontmatter.date }}</span>
      </div>

      <div class="flex items-center gap-6">
        <a 
          href="https://calmecac.lat" 
          target="_blank" 
          class="text-calmecac-turquoise hover:text-calmecac-fg font-mono text-[11px] tracking-wider transition-colors no-underline"
        >
          calmecac.lat
        </a>
        <div class="text-calmecac-turquoise font-bold uppercase tracking-widest">
          CALMÉCAC SYSTEM
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'
import CalmecacSymbol from '../components/CalmecacSymbol.vue'
import CalmecacBadge from '../components/CalmecacBadge.vue'
import CalmecacBackground from '../components/CalmecacBackground.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
