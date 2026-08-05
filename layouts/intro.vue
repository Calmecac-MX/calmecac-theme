<template>
  <div class="slidev-layout intro relative flex flex-col justify-between h-full p-10">
    <CalmecacBackground />
    <!-- Header -->
    <CalmecacHeader v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <main class="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-y-auto">
      <!-- Profile / Media Frame -->
      <div class="md:col-span-5 flex justify-center">
        <CalmecacFrame offset="-6px" class="max-w-xs">
          <img 
            :src="$frontmatter.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'" 
            :alt="$frontmatter.name || 'Presenter'"
            class="w-full h-64 object-cover filter grayscale contrast-125"
          />
        </CalmecacFrame>
      </div>

      <!-- Text Bio Area -->
      <div class="md:col-span-7 flex flex-col justify-center">
        <h2 class="font-condensed font-900 text-3xl text-calmecac-heading uppercase mb-1 border-none p-0">
          {{ $frontmatter.name || 'Speaker Name' }}
        </h2>
        <div class="text-calmecac-turquoise font-condensed font-bold text-sm uppercase tracking-wider mb-4">
          {{ $frontmatter.role || 'Title / Organization' }}
        </div>
        <div class="text-calmecac-gray text-sm leading-relaxed mb-6">
          <slot />
        </div>
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
import CalmecacFrame from '../components/CalmecacFrame.vue'
import CalmecacBackground from '../components/CalmecacBackground.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
