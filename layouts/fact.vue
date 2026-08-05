<template>
  <div class="slidev-layout fact relative flex flex-col justify-between h-full p-10 text-center">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Big Stat -->
    <main class="my-auto relative z-10 flex flex-col items-center justify-center">
      <div class="font-condensed font-900 text-7xl lg:text-9xl text-calmecac-turquoise leading-none tracking-tight mb-2 drop-shadow-[0_0_25px_rgba(0,176,155,0.3)]">
        {{ $frontmatter.number || $frontmatter.fact || '100%' }}
      </div>

      <div v-if="$frontmatter.unit || $frontmatter.subtitle" class="font-condensed font-bold text-xl uppercase tracking-widest text-calmecac-heading mb-4">
        {{ $frontmatter.unit || $frontmatter.subtitle }}
      </div>

      <CalmecacGreca height="18" color="turquoise" class="mb-4" />

      <div v-if="$frontmatter.label || $frontmatter.description" class="text-sm lg:text-base text-calmecac-gray font-light max-w-xl leading-relaxed">
        {{ $frontmatter.label || $frontmatter.description }}
      </div>

      <div class="mt-4">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <CalmecacFooter v-if="$frontmatter.footer !== false && !$frontmatter.hideFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'
import CalmecacHeader from '../components/CalmecacHeader.vue'
import CalmecacFooter from '../components/CalmecacFooter.vue'
import CalmecacGreca from '../components/CalmecacGreca.vue'
import CalmecacBackground from '../components/CalmecacBackground.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
