<template>
  <div class="slidev-layout section relative flex flex-col justify-between h-full p-10 text-center overflow-hidden">
    <CalmecacBackground />
    <!-- Geometric Glow Background -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-calmecac-turquoise/10 via-transparent to-transparent pointer-events-none" />

    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge || $frontmatter.category" />

    <div class="relative z-10 max-w-3xl w-full mx-auto my-auto">
      <div v-if="$frontmatter.sectionNumber" class="font-condensed text-calmecac-turquoise font-900 text-6xl tracking-widest opacity-80 mb-2">
        {{ $frontmatter.sectionNumber }}
      </div>

      <h1 class="font-condensed text-4xl lg:text-5xl font-900 uppercase tracking-wider text-calmecac-heading mb-6">
        <slot />
      </h1>

      <CalmecacGreca height="24" color="turquoise" />

      <p v-if="$frontmatter.subtitle" class="text-lg text-calmecac-gray font-light mt-4">
        {{ $frontmatter.subtitle }}
      </p>
    </div>

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
