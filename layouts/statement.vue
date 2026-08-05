<template>
  <div class="slidev-layout statement relative flex flex-col justify-between h-full p-10">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto w-full border-l-4 border-calmecac-turquoise pl-8 py-6 bg-calmecac-surface/50 relative my-auto z-10">
      <div class="text-calmecac-turquoise font-condensed font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
        <span>{{ $frontmatter.label || 'CORE MANIFESTO' }}</span>
      </div>

      <div class="font-condensed text-3xl lg:text-4xl font-bold uppercase leading-snug tracking-wide text-calmecac-heading italic">
        <slot />
      </div>

      <div v-if="$frontmatter.author" class="mt-6 text-sm text-calmecac-gray font-condensed tracking-wider">
        — {{ $frontmatter.author }}
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
import CalmecacBackground from '../components/CalmecacBackground.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
