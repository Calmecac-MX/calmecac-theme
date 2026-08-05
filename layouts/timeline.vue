<template>
  <div class="slidev-layout timeline relative flex flex-col justify-between h-full p-10">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader 
      v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" 
      :title="$frontmatter.headerTitle || $frontmatter.title" 
      :tagline="$frontmatter.tagline || $frontmatter.headerTagline" 
      :badge="$frontmatter.badge || 'TIMELINE'" 
    />

    <!-- Main Content Container -->
    <main class="flex-1 overflow-y-auto relative z-10 my-auto flex flex-col justify-center gap-4 py-2">
      <!-- Slot for Slide Title/Intro text if present in markdown -->
      <div v-if="hasSlotContent" class="timeline-intro mb-2">
        <slot />
      </div>

      <!-- Main Timeline Visual Component -->
      <CalmecacTimeline 
        :items="timelineItems" 
        :direction="timelineDirection"
        :dense="$frontmatter.dense" 
      />
    </main>

    <!-- Footer -->
    <CalmecacFooter v-if="$frontmatter.footer !== false && !$frontmatter.hideFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed, unref, useSlots } from 'vue'
import { useSlideContext } from '@slidev/client'
import CalmecacHeader from '../components/CalmecacHeader.vue'
import CalmecacFooter from '../components/CalmecacFooter.vue'
import CalmecacBackground from '../components/CalmecacBackground.vue'
import CalmecacTimeline from '../components/CalmecacTimeline.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const slots = useSlots()
const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})

const hasSlotContent = computed(() => {
  return Boolean(slots.default)
})

const timelineItems = computed(() => {
  const fm = $frontmatter.value
  return fm.items || fm.steps || fm.timeline || fm.hitos || fm.roadmap || []
})

const timelineDirection = computed(() => {
  return $frontmatter.value.direction || $frontmatter.value.layout || 'horizontal'
})
</script>

<style>
/* Additional helper styles for markdown lists inside timeline layout */
.slidev-layout.timeline .timeline-intro h1,
.slidev-layout.timeline .timeline-intro h2 {
  margin-top: 0;
}
</style>
