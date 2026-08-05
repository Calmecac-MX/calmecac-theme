<template>
  <div class="slidev-layout quote relative flex flex-col justify-between h-full p-10">
    <CalmecacBackground />

    <!-- Header -->
    <CalmecacHeader 
      v-if="$frontmatter.header !== false && !$frontmatter.hideHeader" 
      :title="$frontmatter.headerTitle || $frontmatter.title" 
      :tagline="$frontmatter.tagline || $frontmatter.headerTagline" 
      :badge="$frontmatter.badge" 
    />

    <!-- Main Quote Container -->
    <main class="max-w-4xl mx-auto w-full my-auto z-10 relative">
      <div class="calmecac-card calmecac-outline-frame relative p-8 md:p-10 bg-calmecac-card/90 backdrop-blur-md rounded-md">
        <!-- Giant Decorative Quote Mark -->
        <div class="absolute -top-6 left-6 text-6xl font-serif text-calmecac-turquoise opacity-80 leading-none select-none">
          “
        </div>

        <div class="relative z-10 pt-2">
          <!-- Quote Body -->
          <div class="font-condensed text-2xl md:text-3xl font-bold uppercase leading-relaxed text-calmecac-heading tracking-wide italic mb-6">
            <slot>
              {{ $frontmatter.quote }}
            </slot>
          </div>

          <CalmecacGreca pattern="01" height="14" color="turquoise" class="mb-4" />

          <!-- Author Info Section -->
          <div class="flex items-center justify-between pt-2 border-t border-calmecac-border/60">
            <div class="flex items-center gap-3">
              <!-- Author Avatar (Optional) -->
              <img 
                v-if="$frontmatter.avatar || $frontmatter.image"
                :src="$frontmatter.avatar || $frontmatter.image"
                :alt="$frontmatter.author || $frontmatter.by"
                class="w-12 h-12 rounded-full object-cover border-2 border-calmecac-turquoise"
              />
              <div>
                <div v-if="$frontmatter.author || $frontmatter.by" class="font-condensed font-bold text-base text-calmecac-heading uppercase tracking-wider">
                  {{ $frontmatter.author || $frontmatter.by }}
                </div>
                <div v-if="$frontmatter.role || $frontmatter.company || $frontmatter.title" class="text-xs text-calmecac-turquoise font-condensed uppercase tracking-widest">
                  {{ $frontmatter.role || $frontmatter.company || $frontmatter.title }}
                </div>
              </div>
            </div>

            <!-- Optional Quote Tag / Label -->
            <div v-if="$frontmatter.label" class="hidden sm:block">
              <CalmecacBadge variant="outline">{{ $frontmatter.label }}</CalmecacBadge>
            </div>
          </div>
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
import CalmecacBackground from '../components/CalmecacBackground.vue'
import CalmecacGreca from '../components/CalmecacGreca.vue'
import CalmecacBadge from '../components/CalmecacBadge.vue'

let slideContext: any = null
try {
  slideContext = useSlideContext()
} catch {}

const $frontmatter = computed(() => unref(slideContext?.$frontmatter) || {})
</script>
