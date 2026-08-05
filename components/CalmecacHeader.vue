<template>
  <header class="flex items-center justify-between border-b border-calmecac-border pb-3 mb-6 shrink-0 relative z-10">
    <div class="flex items-center gap-3.5">
      <CalmecacSymbol size="40" class="text-calmecac-turquoise shrink-0" />
      <div class="flex items-center gap-3">
        <span 
          v-if="resolvedTitle" 
          class="font-condensed font-bold text-sm lg:text-base uppercase tracking-wider text-calmecac-gray"
        >
          {{ resolvedTitle }}
        </span>
        <span 
          v-if="resolvedTagline" 
          class="font-condensed text-xs lg:text-sm uppercase tracking-widest text-calmecac-turquoise/90 border-l border-calmecac-border pl-3"
        >
          {{ resolvedTagline }}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-3.5">
      <CalmecacBadge v-if="resolvedBadge" variant="outline" class="shrink-0">{{ resolvedBadge }}</CalmecacBadge>
      <CalmecacLogo size="32" layout="symbol-only" color="turquoise" class="shrink-0" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import CalmecacLogo from './CalmecacLogo.vue'
import CalmecacSymbol from './CalmecacSymbol.vue'
import CalmecacBadge from './CalmecacBadge.vue'

const props = defineProps<{
  title?: string
  tagline?: string
  badge?: string
}>()

const instance = getCurrentInstance()

const resolvedTitle = computed(() => {
  if (props.title) return props.title
  const proxy = instance?.proxy
  const frontmatter = proxy?.$frontmatter
  const globalFrontmatter = proxy?.$slidev?.nav?.frontmatter
  return (
    frontmatter?.headerTitle ||
    frontmatter?.title ||
    globalFrontmatter?.headerTitle ||
    globalFrontmatter?.title ||
    'CALMÉCAC'
  )
})

const resolvedTagline = computed(() => {
  if (props.tagline === false as any || props.tagline === '') return ''
  if (props.tagline) return props.tagline

  const proxy = instance?.proxy
  const frontmatter = proxy?.$frontmatter
  const globalFrontmatter = proxy?.$slidev?.nav?.frontmatter

  if (frontmatter?.tagline === false || frontmatter?.headerTagline === false) return ''
  if (frontmatter?.tagline) return frontmatter.tagline
  if (frontmatter?.headerTagline) return frontmatter.headerTagline

  if (globalFrontmatter?.tagline === false || globalFrontmatter?.headerTagline === false) return ''
  if (globalFrontmatter?.tagline) return globalFrontmatter.tagline
  if (globalFrontmatter?.headerTagline) return globalFrontmatter.headerTagline

  return ''
})

const resolvedBadge = computed(() => {
  if (props.badge === false as any || props.badge === '') return ''
  if (props.badge) return props.badge

  const proxy = instance?.proxy
  const frontmatter = proxy?.$frontmatter
  const globalFrontmatter = proxy?.$slidev?.nav?.frontmatter

  if (frontmatter?.badge === false) return ''
  if (frontmatter?.badge) return frontmatter.badge

  if (globalFrontmatter?.badge === false) return ''
  if (globalFrontmatter?.badge) return globalFrontmatter.badge

  return 'BRAND SYSTEM'
})
</script>
