<template>
  <div class="slidev-layout end relative flex flex-col justify-center items-center h-full p-10 text-center overflow-hidden text-calmecac-fg">
    <!-- Calmécac Vector Background Pattern - Cierre adaptable al tema claro / oscuro -->
    <CalmecacBackground 
      :bg-pattern="true" 
      :bg-color="$frontmatter.bgColor" 
      :pattern-color="$frontmatter.patternColor" 
      :opacity="$frontmatter.patternOpacity || 0.75" 
      :alternate-odd="false" 
    />

    <!-- Background Radial Accent -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-calmecac-turquoise/20 via-transparent to-transparent pointer-events-none" />

    <!-- Optional Header -->
    <CalmecacHeader v-if="$frontmatter.header === true || $frontmatter.showHeader === true" :title="$frontmatter.headerTitle || $frontmatter.title" :tagline="$frontmatter.tagline || $frontmatter.headerTagline" :badge="$frontmatter.badge" />

    <div class="relative z-10 my-auto max-w-3xl mx-auto flex flex-col items-center">
      <CalmecacLogo size="64" layout="vertical" color="turquoise" class="mb-6" />

      <h1 class="font-condensed font-900 text-4xl lg:text-5xl uppercase tracking-wider text-calmecac-heading mb-4">
        {{ $frontmatter.title || 'GRACIAS' }}
      </h1>

      <p class="text-calmecac-gray text-lg max-w-xl font-light mb-6">
        <slot>
          Construyendo estructuras operativas monumentales para escalar con certeza.
        </slot>
      </p>

      <CalmecacGreca height="20" color="turquoise" class="max-w-md" />

      <div v-if="$frontmatter.cta" class="mt-6">
        <a 
          :href="$frontmatter.ctaUrl || $frontmatter.url || 'https://aplica.calmecac.lat'"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block px-6 py-3 bg-calmecac-turquoise text-calmecac-black font-condensed font-900 text-sm uppercase tracking-widest hover:bg-calmecac-gold hover:text-calmecac-black transition-all shadow-[0_0_15px_rgba(0,176,155,0.4)] no-underline rounded-xs cursor-pointer"
        >
          {{ $frontmatter.cta }}
        </a>
      </div>
    </div>

    <!-- Optional Footer -->
    <CalmecacFooter v-if="$frontmatter.footer === true || $frontmatter.showFooter === true" />
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'
import CalmecacHeader from '../components/CalmecacHeader.vue'
import CalmecacLogo from '../components/CalmecacLogo.vue'
import CalmecacGreca from '../components/CalmecacGreca.vue'
import CalmecacFooter from '../components/CalmecacFooter.vue'
import CalmecacBackground from '../components/CalmecacBackground.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
