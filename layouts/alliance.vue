<template>
  <div class="slidev-layout alliance relative flex flex-col justify-between h-full px-8 py-5 md:px-10 md:py-6 overflow-hidden">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col justify-center relative z-10 my-auto overflow-hidden">
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
