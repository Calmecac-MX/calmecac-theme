<template>
  <div class="slidev-layout benefits relative flex flex-col justify-between h-full p-8 md:p-10 overflow-hidden">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col justify-center relative z-10 my-auto overflow-hidden">
      <div v-if="$frontmatter.subtitle" class="mb-3 shrink-0">
        <h2 class="text-base md:text-lg font-condensed uppercase tracking-wider text-calmecac-heading border-b-2 border-calmecac-turquoise pb-1 mb-1 inline-block">
          {{ $frontmatter.subtitle }}
        </h2>
      </div>
      <slot />
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
