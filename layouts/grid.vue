<template>
  <div class="slidev-layout grid relative flex flex-col justify-between h-full p-10">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto relative z-10 my-auto flex flex-col justify-center">
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
