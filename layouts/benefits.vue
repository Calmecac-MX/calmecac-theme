<template>
  <div class="slidev-layout benefits relative flex flex-col justify-between h-full p-10">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col justify-center overflow-y-auto relative z-10 my-auto">
      <div v-if="$frontmatter.subtitle" class="mb-4">
        <h2 class="text-xl font-condensed uppercase tracking-wider text-calmecac-heading border-b-2 border-calmecac-turquoise pb-1 mb-2 inline-block">
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
