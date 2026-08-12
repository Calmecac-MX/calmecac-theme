<template>
  <div class="slidev-layout benefits relative flex flex-col justify-between h-full px-8 py-4 overflow-hidden">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col justify-center relative z-10 overflow-hidden">
      <div v-if="$frontmatter.subtitle" class="mb-2 shrink-0">
        <h2 class="text-xs md:text-sm font-condensed uppercase tracking-wider text-calmecac-heading border-b-2 border-calmecac-turquoise pb-0.5 m-0 inline-block">
          {{ $frontmatter.subtitle }}
        </h2>
      </div>
      <div class="flex-1 flex flex-col justify-center">
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
import CalmecacBackground from '../components/CalmecacBackground.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
