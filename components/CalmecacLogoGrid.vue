<template>
  <div class="calmecac-logo-grid-container bg-calmecac-surface border border-calmecac-border rounded-lg p-2 px-3 text-white shadow-xl max-w-full my-0 max-h-[350px] overflow-hidden">
    <!-- TOOLBAR CONTROLS (COMPACT HEADER WITH VARIANT & MODE SELECTORS) -->
    <div class="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-calmecac-border mb-2">
      <!-- LEFT: VARIANT SELECTOR -->
      <div class="flex items-center gap-1.5">
        <span class="text-[10px] font-condensed uppercase tracking-wider text-calmecac-gray">Variante:</span>
        <div class="inline-flex rounded p-0.5 bg-calmecac-black border border-calmecac-border text-[10px]">
          <button 
            @click="selectVariant('vector')" 
            :class="[activeVariant === 'vector' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-colors flex items-center gap-1"
          >
            <span>🔹 Vector</span>
          </button>
          <button 
            @click="selectVariant('isotipo')" 
            :class="[activeVariant === 'isotipo' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-colors flex items-center gap-1"
          >
            <span>🌀 Isotipo</span>
          </button>
          <button 
            @click="selectVariant('nombre')" 
            :class="[activeVariant === 'nombre' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-colors flex items-center gap-1"
          >
            <span>🔤 Nombre</span>
          </button>
        </div>
      </div>

      <!-- RIGHT: MODE TABS & POLARITY -->
      <div class="flex items-center gap-1.5">
        <div class="inline-flex rounded p-0.5 bg-calmecac-black border border-calmecac-border text-[10px]">
          <button 
            @click="activeMode = 'reserva'" 
            :class="[activeMode === 'reserva' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-colors"
          >
            Reserva (1X)
          </button>
          <button 
            @click="activeMode = 'reticula'" 
            :class="[activeMode === 'reticula' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-colors"
          >
            Retícula
          </button>
          <button 
            @click="activeMode = 'minimo'" 
            :class="[activeMode === 'minimo' ? 'bg-calmecac-turquoise text-black font-bold' : 'text-calmecac-gray hover:text-white']"
            class="px-2 py-0.5 font-condensed uppercase tracking-wider rounded transition-colors"
          >
            Simulador Mínimo
          </button>
        </div>

        <button 
          @click="togglePolarity" 
          class="px-1.5 py-0.5 text-[10px] font-condensed uppercase border border-calmecac-border bg-calmecac-black hover:border-calmecac-turquoise text-calmecac-gray hover:text-white rounded transition-colors"
          :title="'Cambiar fondo'"
        >
          <span>{{ isDarkBg ? '🌙' : '☀️' }}</span>
        </button>
      </div>
    </div>

    <!-- 2-COLUMN SPLIT LAYOUT -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-stretch">
      
      <!-- LEFT COLUMN: VISUAL DIAGRAM / SIMULATOR (7/12) -->
      <div 
        class="md:col-span-7 relative rounded border border-calmecac-border p-2 flex flex-col items-center justify-center transition-colors overflow-hidden h-[210px]"
        :class="[isDarkBg ? 'bg-[#060608]' : 'bg-[#F4F6F8] text-slate-900']"
      >
        <!-- BACKGROUND GRID -->
        <div 
          class="absolute inset-0 pointer-events-none opacity-20" 
          :style="{
            backgroundImage: isDarkBg 
              ? 'linear-gradient(to right, #00B09B 1px, transparent 1px), linear-gradient(to bottom, #00B09B 1px, transparent 1px)'
              : 'linear-gradient(to right, #008070 1px, transparent 1px), linear-gradient(to bottom, #008070 1px, transparent 1px)',
            backgroundSize: '14px 14px'
          }"
        ></div>

        <!-- DYNAMIC TOOLTIP OVERLAY ON HOVER -->
        <div 
          v-if="hoveredGuideText"
          class="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 px-2 py-0.5 rounded bg-black/90 text-calmecac-turquoise text-[10px] font-mono border border-calmecac-turquoise/40 shadow-lg pointer-events-none transition-all animate-fade-in flex items-center gap-1.5"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-calmecac-turquoise animate-ping"></span>
          <span>{{ hoveredGuideText }}</span>
        </div>

        <!-- MODE 1: ÁREA DE RESERVA (CLEAR SPACE 1X FOR ACTIVE VARIANT) -->
        <div v-if="activeMode === 'reserva'" class="w-full flex flex-col items-center justify-center h-full">
          <svg 
            :viewBox="diagramViewBox" 
            class="w-full h-auto max-h-[165px] block select-none drop-shadow-sm transition-all"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="clearSpaceHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" :stroke="isDarkBg ? 'rgba(0,176,155,0.3)' : 'rgba(0,140,120,0.35)'" stroke-width="2" />
              </pattern>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" :fill="isDarkBg ? '#00B09B' : '#008070'" />
              </marker>
            </defs>

            <!-- 1X PROTECTION OUTER ZONE -->
            <rect 
              x="-33.21" y="-33.21" :width="variantConfig.logoWidth + 66.42" :height="variantConfig.logoHeight + 66.42" 
              fill="url(#clearSpaceHatch)" 
              :stroke="isDarkBg ? '#00B09B' : '#008070'" 
              stroke-width="1.5" stroke-dasharray="4 3" rx="2"
              class="cursor-pointer transition-all hover:stroke-[2.5px]"
              @mouseenter="hoveredGuide = 'total_protected'"
              @mouseleave="hoveredGuide = null"
            />

            <!-- LOGO BOUNDING BOX -->
            <rect 
              x="0" y="0" :width="variantConfig.logoWidth" :height="variantConfig.logoHeight" fill="none" 
              :stroke="isDarkBg ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'" stroke-width="1" stroke-dasharray="2 2"
              class="cursor-pointer hover:stroke-white hover:stroke-width-2 transition-all"
              @mouseenter="hoveredGuide = 'logo_box'"
              @mouseleave="hoveredGuide = null"
            />

            <!-- LOGO CONTENT BASED ON VARIANT -->
            <g :fill="isDarkBg ? '#FFFFFF' : '#09090B'" :stroke="isDarkBg ? '#FFFFFF' : '#09090B'">
              <!-- VECTOR FULL (SÍMBOLO + WORDMARK) -->
              <g v-if="activeVariant === 'vector'">
                <g class="symbol-paths" fill="none">
                  <path class="stroke-6" d="M19.33,102.52c5.9-5.92,9.85-12.03,15.75-17.95-1.42-1.44-3.45-3.84-5.02-7.28-1.7-3.72-2.15-7.07-2.27-9.17-7.54,0-15.09.01-22.63.02.31,4.62.4,8.02,2.99,15.18,2.52,6.98,6.9,13.18,9.54,16.87l1.64,2.33Z"/>
                  <path class="stroke-6" d="M19.33,77.55c.41,2.44,1.33,6.07,3.55,9.93,1.61,2.8,3.41,4.89,4.88,6.34"/>
                  <path class="stroke-613" d="M106.09,105.08c-6.2-6.37-10.83-10.73-17.03-17.1-1.32,1.75-7.1,4.27-10.38,6.35-3.54,2.24-6.81,3.02-8.86,3.32.51,8.73,1.02,17.46,1.53,26.19,4.52-.7,10.73-2.23,17.6-5.76,6.7-3.44,11.75-7.61,15.2-10.95l1.94-2.04Z"/>
                  <path class="stroke-613" d="M79.63,106.72c2.37-.66,5.87-1.99,9.53-4.85,2.65-2.07,4.58-4.31,5.91-6.13"/>
                  <path class="stroke-6" d="M23.54,17.51c6.37,5.47,12.74,10.95,19.11,16.42,1.39-1.48,3.72-3.6,7.15-5.33,3.7-1.87,7.09-2.5,9.23-2.74-.43-7.42-.86-14.83-1.29-22.25-4.69.56-11.15,1.8-18.31,4.73-6.98,2.86-12.26,6.36-15.88,9.16h0Z"/>
                  <path class="stroke-6" d="M48.94,18.07c-2.47.54-6.11,1.64-9.93,4.03-2.77,1.73-4.79,3.62-6.2,5.15"/>
                  <path class="stroke-6" d="M68.08,3.47c-.06,7.81-.11,15.61-.17,23.42,2.16.02,5.49.27,9.26,1.52,4.07,1.34,6.92,3.27,8.58,4.58,5.73-4.97,11.46-9.94,17.19-14.92-3.69-2.86-9.15-6.48-16.47-9.53-7.14-2.97-13.62-4.37-18.39-5.07Z"/>
                  <path class="stroke-6" d="M77.92,17.61c2.55.58,6.29,1.72,10.19,4.11,2.83,1.73,4.88,3.58,6.3,5.08"/>
                  <path class="stroke-6" d="M60.53,123.48c-.29-8.73-.59-17.47-.88-26.2-2.12.08-5.4-.05-9.16-1.27-4.06-1.32-6.94-3.34-8.63-4.73-5.4,5.83-10.8,11.65-16.21,17.48,3.75,3.02,9.27,6.83,16.6,9.9,7.14,2.99,13.57,4.26,18.28,4.83h0Z"/>
                  <path class="stroke-6" d="M43,104.46c2.16,1.41,5.59,3.26,10.13,4.28,3.29.74,6.18.82,8.34.71"/>
                  <path class="stroke-6" d="M3.36,59.57c8.73-.39,17.46-.78,26.19-1.16-.1-2.12,0-5.4,1.17-9.17,1.27-4.07,3.26-6.98,4.63-8.68l-17.65-16.02c-2.98,3.78-6.73,9.34-9.72,16.7-2.91,7.17-4.11,13.61-4.63,18.33h0Z"/>
                  <path class="stroke-6" d="M18.61,49.11c.5-2.53,1.57-6.27,4.01-10.23,1.77-2.87,3.73-4.99,5.32-6.47"/>
                </g>
                <path class="wordmark-fill" d="M64.74,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.74-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.9.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6-.14,1.08-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM88.56,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h0ZM93.39,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM93.65,66.19v6.18h-14.39v-6.18h14.39ZM123.32,72.42v6.16h-13.96v-6.16h13.96ZM112.1,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM130.6,45.37h6.32l5.22,23.11,5.22-23.11h6.3l-8.94,33.21h-5.16l-8.97-33.21h0ZM126.7,45.37h6.55l1.25,25.46v7.76h-7.8v-33.21h0ZM151.02,45.37h6.57v33.21h-7.82v-7.76l1.26-25.46h0ZM181.77,72.42v6.16h-14.53v-6.16h14.53ZM169.95,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM179.87,58.55v5.95h-12.64v-5.95h12.64ZM181.84,45.37v6.18h-14.6v-6.18h14.6ZM169.27,41.63l4.52-7.16h8.12l-6.36,7.16h-6.28ZM200.43,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM224.24,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h-.01ZM229.08,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM229.33,66.19v6.18h-14.39v-6.18h14.39ZM254.99,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02Z"/>
                <!-- HIGHLIGHT MODULE X FOR VECTOR -->
                <g class="cursor-pointer group" @mouseenter="hoveredGuide = 'module_x'" @mouseleave="hoveredGuide = null">
                  <rect x="50.0" y="45.37" width="22.54" height="33.21" fill="rgba(0,176,155,0.3)" stroke="#00B09B" stroke-width="1.5"/>
                  <text x="61.27" y="64" font-family="Roboto Condensed" font-size="12" font-weight="bold" fill="#00B09B" text-anchor="middle">X</text>
                </g>
              </g>

              <!-- ISOTIPO (SÍMBOLO SOLO) -->
              <g v-else-if="activeVariant === 'isotipo'">
                <g class="symbol-paths" fill="none">
                  <path class="stroke-6" d="M19.33,102.52c5.9-5.92,9.85-12.03,15.75-17.95-1.42-1.44-3.45-3.84-5.02-7.28-1.7-3.72-2.15-7.07-2.27-9.17-7.54,0-15.09.01-22.63.02.31,4.62.4,8.02,2.99,15.18,2.52,6.98,6.9,13.18,9.54,16.87l1.64,2.33Z"/>
                  <path class="stroke-6" d="M19.33,77.55c.41,2.44,1.33,6.07,3.55,9.93,1.61,2.8,3.41,4.89,4.88,6.34"/>
                  <path class="stroke-613" d="M106.09,105.08c-6.2-6.37-10.83-10.73-17.03-17.1-1.32,1.75-7.1,4.27-10.38,6.35-3.54,2.24-6.81,3.02-8.86,3.32.51,8.73,1.02,17.46,1.53,26.19,4.52-.7,10.73-2.23,17.6-5.76,6.7-3.44,11.75-7.61,15.2-10.95l1.94-2.04Z"/>
                  <path class="stroke-613" d="M79.63,106.72c2.37-.66,5.87-1.99,9.53-4.85,2.65-2.07,4.58-4.31,5.91-6.13"/>
                  <path class="stroke-6" d="M23.54,17.51c6.37,5.47,12.74,10.95,19.11,16.42,1.39-1.48,3.72-3.6,7.15-5.33,3.7-1.87,7.09-2.5,9.23-2.74-.43-7.42-.86-14.83-1.29-22.25-4.69.56-11.15,1.8-18.31,4.73-6.98,2.86-12.26,6.36-15.88,9.16h0Z"/>
                  <path class="stroke-6" d="M48.94,18.07c-2.47.54-6.11,1.64-9.93,4.03-2.77,1.73-4.79,3.62-6.2,5.15"/>
                  <path class="stroke-6" d="M68.08,3.47c-.06,7.81-.11,15.61-.17,23.42,2.16.02,5.49.27,9.26,1.52,4.07,1.34,6.92,3.27,8.58,4.58,5.73-4.97,11.46-9.94,17.19-14.92-3.69-2.86-9.15-6.48-16.47-9.53-7.14-2.97-13.62-4.37-18.39-5.07Z"/>
                  <path class="stroke-6" d="M77.92,17.61c2.55.58,6.29,1.72,10.19,4.11,2.83,1.73,4.88,3.58,6.3,5.08"/>
                  <path class="stroke-6" d="M60.53,123.48c-.29-8.73-.59-17.47-.88-26.2-2.12.08-5.4-.05-9.16-1.27-4.06-1.32-6.94-3.34-8.63-4.73-5.4,5.83-10.8,11.65-16.21,17.48,3.75,3.02,9.27,6.83,16.6,9.9,7.14,2.99,13.57,4.26,18.28,4.83h0Z"/>
                  <path class="stroke-6" d="M43,104.46c2.16,1.41,5.59,3.26,10.13,4.28,3.29.74,6.18.82,8.34.71"/>
                  <path class="stroke-6" d="M3.36,59.57c8.73-.39,17.46-.78,26.19-1.16-.1-2.12,0-5.4,1.17-9.17,1.27-4.07,3.26-6.98,4.63-8.68l-17.65-16.02c-2.98,3.78-6.73,9.34-9.72,16.7-2.91,7.17-4.11,13.61-4.63,18.33h0Z"/>
                  <path class="stroke-6" d="M18.61,49.11c.5-2.53,1.57-6.27,4.01-10.23,1.77-2.87,3.73-4.99,5.32-6.47"/>
                </g>
                <!-- MODULE X HIGHLIGHT FOR ISOTIPO -->
                <g class="cursor-pointer group" @mouseenter="hoveredGuide = 'module_x'" @mouseleave="hoveredGuide = null">
                  <rect x="43.5" y="47.4" width="22.54" height="33.21" fill="rgba(0,176,155,0.3)" stroke="#00B09B" stroke-width="1.5"/>
                  <text x="54.7" y="68" font-family="Roboto Condensed" font-size="12" font-weight="bold" fill="#00B09B" text-anchor="middle">X</text>
                </g>
              </g>

              <!-- NOMBRE (WORDMARK SOLO) -->
              <g v-else-if="activeVariant === 'nombre'">
                <g transform="translate(-50, -30)">
                  <path class="wordmark-fill" d="M64.74,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.74-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6-.14,1.08-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM88.56,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h0ZM93.39,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM93.65,66.19v6.18h-14.39v-6.18h14.39ZM123.32,72.42v6.16h-13.96v-6.16h13.96ZM112.1,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM130.6,45.37h6.32l5.22,23.11,5.22-23.11h6.3l-8.94,33.21h-5.16l-8.97-33.21h0ZM126.7,45.37h6.55l1.25,25.46v7.76h-7.8v-33.21h0ZM151.02,45.37h6.57v33.21h-7.82v-7.76l1.26-25.46h0ZM181.77,72.42v6.16h-14.53v-6.16h14.53ZM169.95,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM179.87,58.55v5.95h-12.64v-5.95h12.64ZM181.84,45.37v6.18h-14.6v-6.18h14.6ZM169.27,41.63l4.52-7.16h8.12l-6.36,7.16h-6.28ZM200.43,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM224.24,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h-.01ZM229.08,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM229.33,66.19v6.18h-14.39v-6.18h14.39ZM254.99,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02Z"/>
                  <!-- HIGHLIGHT MODULE X FOR WORDMARK -->
                  <g class="cursor-pointer group" @mouseenter="hoveredGuide = 'module_x'" @mouseleave="hoveredGuide = null">
                    <rect x="50.0" y="45.37" width="22.54" height="33.21" fill="rgba(0,176,155,0.3)" stroke="#00B09B" stroke-width="1.5"/>
                    <text x="61.27" y="64" font-family="Roboto Condensed" font-size="12" font-weight="bold" fill="#00B09B" text-anchor="middle">X</text>
                  </g>
                </g>
              </g>
            </g>

            <!-- 1X ANNOTATIONS -->
            <g class="cursor-pointer" @mouseenter="hoveredGuide = 'margin_left'" @mouseleave="hoveredGuide = null">
              <line :x1="-33.21" :y1="variantConfig.logoHeight / 2" :x2="0" :y2="variantConfig.logoHeight / 2" stroke="#00B09B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
              <rect :x="-24" :y="variantConfig.logoHeight / 2 - 7" width="15" height="14" rx="2" fill="#00B09B" />
              <text :x="-16.5" :y="variantConfig.logoHeight / 2 + 3.5" font-family="Roboto Condensed" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">1X</text>
            </g>

            <g class="cursor-pointer" @mouseenter="hoveredGuide = 'margin_right'" @mouseleave="hoveredGuide = null">
              <line :x1="variantConfig.logoWidth" :y1="variantConfig.logoHeight / 2" :x2="variantConfig.logoWidth + 33.21" :y2="variantConfig.logoHeight / 2" stroke="#00B09B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
              <rect :x="variantConfig.logoWidth + 8" :y="variantConfig.logoHeight / 2 - 7" width="15" height="14" rx="2" fill="#00B09B" />
              <text :x="variantConfig.logoWidth + 15.5" :y="variantConfig.logoHeight / 2 + 3.5" font-family="Roboto Condensed" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">1X</text>
            </g>

            <g class="cursor-pointer" @mouseenter="hoveredGuide = 'margin_top'" @mouseleave="hoveredGuide = null">
              <line :x1="variantConfig.logoWidth / 2" :y1="-33.21" :x2="variantConfig.logoWidth / 2" :y2="0" stroke="#00B09B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
              <rect :x="variantConfig.logoWidth / 2 - 7.5" :y="-24" width="15" height="14" rx="2" fill="#00B09B" />
              <text :x="variantConfig.logoWidth / 2" :y="-13.5" font-family="Roboto Condensed" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">1X</text>
            </g>

            <g class="cursor-pointer" @mouseenter="hoveredGuide = 'margin_bottom'" @mouseleave="hoveredGuide = null">
              <line :x1="variantConfig.logoWidth / 2" :y1="variantConfig.logoHeight" :x2="variantConfig.logoWidth / 2" :y2="variantConfig.logoHeight + 33.21" stroke="#00B09B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
              <rect :x="variantConfig.logoWidth / 2 - 7.5" :y="variantConfig.logoHeight + 8" width="15" height="14" rx="2" fill="#00B09B" />
              <text :x="variantConfig.logoWidth / 2" :y="variantConfig.logoHeight + 18.5" font-family="Roboto Condensed" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">1X</text>
            </g>
          </svg>
          
          <div class="mt-0.5 text-center">
            <span class="text-[9px] font-mono text-calmecac-turquoise bg-calmecac-turquoise/10 px-1.5 py-0.5 rounded border border-calmecac-turquoise/20">
              💡 Pasa el cursor sobre las líneas para ver los valores exactos
            </span>
          </div>
        </div>

        <!-- MODE 2: RETÍCULA GEOMÉTRICA (INTERACTIVE HOVER GUIDELINES) -->
        <div v-else-if="activeMode === 'reticula'" class="w-full flex flex-col items-center justify-center h-full">
          <svg 
            :viewBox="reticulaViewBox" 
            class="w-full h-auto max-h-[165px] block select-none drop-shadow-sm transition-all"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- GUIDELINES -->
            <g class="cursor-pointer group" @mouseenter="hoveredGuide = 'cap'" @mouseleave="hoveredGuide = null">
              <line :x1="-15" :y1="capLineY" :x2="variantConfig.logoWidth + 15" :y2="capLineY" stroke="transparent" stroke-width="12" />
              <line :x1="-15" :y1="capLineY" :x2="variantConfig.logoWidth + 15" :y2="capLineY" :stroke="hoveredGuide === 'cap' ? '#FF5555' : '#EF4444'" :stroke-width="hoveredGuide === 'cap' ? '2.5' : '1'" stroke-dasharray="3 3" />
            </g>

            <g class="cursor-pointer group" @mouseenter="hoveredGuide = 'base'" @mouseleave="hoveredGuide = null">
              <line :x1="-15" :y1="baseLineY" :x2="variantConfig.logoWidth + 15" :y2="baseLineY" stroke="transparent" stroke-width="12" />
              <line :x1="-15" :y1="baseLineY" :x2="variantConfig.logoWidth + 15" :y2="baseLineY" :stroke="hoveredGuide === 'base' ? '#60A5FA' : '#3B82F6'" :stroke-width="hoveredGuide === 'base' ? '2.5' : '1'" stroke-dasharray="3 3" />
            </g>

            <!-- RENDER VECTOR CONTENT IN RETÍCULA -->
            <g :fill="isDarkBg ? '#FFFFFF' : '#09090B'" :stroke="isDarkBg ? '#FFFFFF' : '#09090B'">
              <g v-if="activeVariant === 'vector'">
                <g class="symbol-paths" fill="none">
                  <path class="stroke-6" d="M19.33,102.52c5.9-5.92,9.85-12.03,15.75-17.95-1.42-1.44-3.45-3.84-5.02-7.28-1.7-3.72-2.15-7.07-2.27-9.17-7.54,0-15.09.01-22.63.02.31,4.62.4,8.02,2.99,15.18,2.52,6.98,6.9,13.18,9.54,16.87l1.64,2.33Z"/>
                  <path class="stroke-6" d="M19.33,77.55c.41,2.44,1.33,6.07,3.55,9.93,1.61,2.8,3.41,4.89,4.88,6.34"/>
                  <path class="stroke-613" d="M106.09,105.08c-6.2-6.37-10.83-10.73-17.03-17.1-1.32,1.75-7.1,4.27-10.38,6.35-3.54,2.24-6.81,3.02-8.86,3.32.51,8.73,1.02,17.46,1.53,26.19,4.52-.7,10.73-2.23,17.6-5.76,6.7-3.44,11.75-7.61,15.2-10.95l1.94-2.04Z"/>
                  <path class="stroke-613" d="M79.63,106.72c2.37-.66,5.87-1.99,9.53-4.85,2.65-2.07,4.58-4.31,5.91-6.13"/>
                  <path class="stroke-6" d="M23.54,17.51c6.37,5.47,12.74,10.95,19.11,16.42,1.39-1.48,3.72-3.6,7.15-5.33,3.7-1.87,7.09-2.5,9.23-2.74-.43-7.42-.86-14.83-1.29-22.25-4.69.56-11.15,1.8-18.31,4.73-6.98,2.86-12.26,6.36-15.88,9.16h0Z"/>
                  <path class="stroke-6" d="M48.94,18.07c-2.47.54-6.11,1.64-9.93,4.03-2.77,1.73-4.79,3.62-6.2,5.15"/>
                  <path class="stroke-6" d="M68.08,3.47c-.06,7.81-.11,15.61-.17,23.42,2.16.02,5.49.27,9.26,1.52,4.07,1.34,6.92,3.27,8.58,4.58,5.73-4.97,11.46-9.94,17.19-14.92-3.69-2.86-9.15-6.48-16.47-9.53-7.14-2.97-13.62-4.37-18.39-5.07Z"/>
                  <path class="stroke-6" d="M77.92,17.61c2.55.58,6.29,1.72,10.19,4.11,2.83,1.73,4.88,3.58,6.3,5.08"/>
                  <path class="stroke-6" d="M60.53,123.48c-.29-8.73-.59-17.47-.88-26.2-2.12.08-5.4-.05-9.16-1.27-4.06-1.32-6.94-3.34-8.63-4.73-5.4,5.83-10.8,11.65-16.21,17.48,3.75,3.02,9.27,6.83,16.6,9.9,7.14,2.99,13.57,4.26,18.28,4.83h0Z"/>
                  <path class="stroke-6" d="M43,104.46c2.16,1.41,5.59,3.26,10.13,4.28,3.29.74,6.18.82,8.34.71"/>
                  <path class="stroke-6" d="M3.36,59.57c8.73-.39,17.46-.78,26.19-1.16-.1-2.12,0-5.4,1.17-9.17,1.27-4.07,3.26-6.98,4.63-8.68l-17.65-16.02c-2.98,3.78-6.73,9.34-9.72,16.7-2.91,7.17-4.11,13.61-4.63,18.33h0Z"/>
                  <path class="stroke-6" d="M18.61,49.11c.5-2.53,1.57-6.27,4.01-10.23,1.77-2.87,3.73-4.99,5.32-6.47"/>
                </g>
                <path class="wordmark-fill" d="M64.74,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.74-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.9.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6-.14,1.08-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM88.56,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h0ZM93.39,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM93.65,66.19v6.18h-14.39v-6.18h14.39ZM123.32,72.42v6.16h-13.96v-6.16h13.96ZM112.1,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM130.6,45.37h6.32l5.22,23.11,5.22-23.11h6.3l-8.94,33.21h-5.16l-8.97-33.21h0ZM126.7,45.37h6.55l1.25,25.46v7.76h-7.8v-33.21h0ZM151.02,45.37h6.57v33.21h-7.82v-7.76l1.26-25.46h0ZM181.77,72.42v6.16h-14.53v-6.16h14.53ZM169.95,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM179.87,58.55v5.95h-12.64v-5.95h12.64ZM181.84,45.37v6.18h-14.6v-6.18h14.6ZM169.27,41.63l4.52-7.16h8.12l-6.36,7.16h-6.28ZM200.43,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM224.24,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h-.01ZM229.08,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM229.33,66.19v6.18h-14.39v-6.18h14.39ZM254.99,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02Z"/>
              </g>

              <g v-else-if="activeVariant === 'isotipo'">
                <g class="symbol-paths" fill="none">
                  <path class="stroke-6" d="M19.33,102.52c5.9-5.92,9.85-12.03,15.75-17.95-1.42-1.44-3.45-3.84-5.02-7.28-1.7-3.72-2.15-7.07-2.27-9.17-7.54,0-15.09.01-22.63.02.31,4.62.4,8.02,2.99,15.18,2.52,6.98,6.9,13.18,9.54,16.87l1.64,2.33Z"/>
                  <path class="stroke-6" d="M19.33,77.55c.41,2.44,1.33,6.07,3.55,9.93,1.61,2.8,3.41,4.89,4.88,6.34"/>
                  <path class="stroke-613" d="M106.09,105.08c-6.2-6.37-10.83-10.73-17.03-17.1-1.32,1.75-7.1,4.27-10.38,6.35-3.54,2.24-6.81,3.02-8.86,3.32.51,8.73,1.02,17.46,1.53,26.19,4.52-.7,10.73-2.23,17.6-5.76,6.7-3.44,11.75-7.61,15.2-10.95l1.94-2.04Z"/>
                  <path class="stroke-613" d="M79.63,106.72c2.37-.66,5.87-1.99,9.53-4.85,2.65-2.07,4.58-4.31,5.91-6.13"/>
                  <path class="stroke-6" d="M23.54,17.51c6.37,5.47,12.74,10.95,19.11,16.42,1.39-1.48,3.72-3.6,7.15-5.33,3.7-1.87,7.09-2.5,9.23-2.74-.43-7.42-.86-14.83-1.29-22.25-4.69.56-11.15,1.8-18.31,4.73-6.98,2.86-12.26,6.36-15.88,9.16h0Z"/>
                  <path class="stroke-6" d="M48.94,18.07c-2.47.54-6.11,1.64-9.93,4.03-2.77,1.73-4.79,3.62-6.2,5.15"/>
                  <path class="stroke-6" d="M68.08,3.47c-.06,7.81-.11,15.61-.17,23.42,2.16.02,5.49.27,9.26,1.52,4.07,1.34,6.92,3.27,8.58,4.58,5.73-4.97,11.46-9.94,17.19-14.92-3.69-2.86-9.15-6.48-16.47-9.53-7.14-2.97-13.62-4.37-18.39-5.07Z"/>
                  <path class="stroke-6" d="M77.92,17.61c2.55.58,6.29,1.72,10.19,4.11,2.83,1.73,4.88,3.58,6.3,5.08"/>
                  <path class="stroke-6" d="M60.53,123.48c-.29-8.73-.59-17.47-.88-26.2-2.12.08-5.4-.05-9.16-1.27-4.06-1.32-6.94-3.34-8.63-4.73-5.4,5.83-10.8,11.65-16.21,17.48,3.75,3.02,9.27,6.83,16.6,9.9,7.14,2.99,13.57,4.26,18.28,4.83h0Z"/>
                  <path class="stroke-6" d="M43,104.46c2.16,1.41,5.59,3.26,10.13,4.28,3.29.74,6.18.82,8.34.71"/>
                  <path class="stroke-6" d="M3.36,59.57c8.73-.39,17.46-.78,26.19-1.16-.1-2.12,0-5.4,1.17-9.17,1.27-4.07,3.26-6.98,4.63-8.68l-17.65-16.02c-2.98,3.78-6.73,9.34-9.72,16.7-2.91,7.17-4.11,13.61-4.63,18.33h0Z"/>
                  <path class="stroke-6" d="M18.61,49.11c.5-2.53,1.57-6.27,4.01-10.23,1.77-2.87,3.73-4.99,5.32-6.47"/>
                </g>
              </g>

              <g v-else-if="activeVariant === 'nombre'">
                <g transform="translate(-50, -30)">
                  <path class="wordmark-fill" d="M64.74,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.74-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6-.14,1.08-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM88.56,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h0ZM93.39,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM93.65,66.19v6.18h-14.39v-6.18h14.39ZM123.32,72.42v6.16h-13.96v-6.16h13.96ZM112.1,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM130.6,45.37h6.32l5.22,23.11,5.22-23.11h6.3l-8.94,33.21h-5.16l-8.97-33.21h0ZM126.7,45.37h6.55l1.25,25.46v7.76h-7.8v-33.21h0ZM151.02,45.37h6.57v33.21h-7.82v-7.76l1.26-25.46h0ZM181.77,72.42v6.16h-14.53v-6.16h14.53ZM169.95,45.37v33.21h-7.8v-33.21s7.8,0,7.8,0ZM179.87,58.55v5.95h-12.64v-5.95h12.64ZM181.84,45.37v6.18h-14.6v-6.18h14.6ZM169.27,41.63l4.52-7.16h8.12l-6.36,7.16h-6.28ZM200.43,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02ZM224.24,52.35l-6.18,26.23h-8.39l10.24-33.21h5.25l-.91,6.98h-.01ZM229.08,78.58l-6.18-26.23-1.03-6.98h5.34l10.27,33.21h-8.4ZM229.33,66.19v6.18h-14.39v-6.18h14.39ZM254.99,67.33h7.8c.02,2.49-.47,4.62-1.46,6.39-.97,1.75-2.35,3.07-4.13,3.97s-3.86,1.35-6.25,1.35c-1.93,0-3.64-.33-5.13-1s-2.75-1.64-3.76-2.92c-1.02-1.28-1.79-2.82-2.3-4.63-.52-1.82-.78-3.89-.78-6.2v-4.63c0-2.3.27-4.36.82-6.18.56-1.82,1.35-3.38,2.37-4.65,1.03-1.28,2.28-2.25,3.74-2.92,1.48-.67,3.12-1,4.93-1,2.54,0,4.68.48,6.43,1.44,1.76.94,3.12,2.31,4.06,4.11.94,1.78,1.44,3.92,1.51,6.41h-7.8c.08-1.44-.02-2.58-.27-3.4-.26-.84-.71-1.42-1.37-1.76-.64-.35-1.49-.52-2.55-.52-.73,0-1.35.14-1.85.43s-.91.77-1.21,1.44c-.3.65-.52,1.52-.66,2.6s-.21,2.4-.21,3.97v4.68c0,1.6.05,2.94.16,4.01.11,1.08.3,1.95.59,2.62.3.65.71,1.13,1.23,1.41.53.29,1.22.43,2.05.43.88,0,1.63-.14,2.26-.43.62-.3,1.09-.84,1.41-1.62.32-.79.44-1.92.36-3.38v-.02Z"/>
                </g>
              </g>
            </g>

            <!-- LOGO BOUNDING BOX -->
            <rect 
              x="0" y="0" :width="variantConfig.logoWidth" :height="variantConfig.logoHeight" fill="none" 
              :stroke="hoveredGuide === 'box' ? '#00B09B' : 'rgba(0,176,155,0.4)'" 
              :stroke-width="hoveredGuide === 'box' ? '2' : '1'"
              class="cursor-pointer transition-all"
              @mouseenter="hoveredGuide = 'box'"
              @mouseleave="hoveredGuide = null"
            />
          </svg>

          <div class="mt-0.5 text-center">
            <span class="text-[9px] font-mono text-calmecac-turquoise bg-calmecac-turquoise/10 px-1.5 py-0.5 rounded border border-calmecac-turquoise/20">
              💡 Pasa el cursor sobre las líneas para ver los valores exactos
            </span>
          </div>
        </div>

        <!-- MODE 3: SIMULADOR MÍNIMO RENDERIZA CADA UNO DE LOS 3 LOGOS SIMULTÁNEAMENTE -->
        <div v-else-if="activeMode === 'minimo'" class="w-full flex flex-col justify-between h-full py-0.5">
          <!-- TOOLBAR COMPACTO DEL SIMULADOR -->
          <div class="flex items-center justify-between gap-1.5 px-0.5">
            <div class="flex items-center gap-1 text-[9px]">
              <button 
                @click="isPrintUnit = false" 
                :class="[!isPrintUnit ? 'bg-calmecac-turquoise text-black font-bold' : 'bg-calmecac-black border border-calmecac-border text-calmecac-gray']"
                class="px-1.5 py-0.5 font-condensed uppercase rounded transition-colors"
              >
                💻 Digital (px)
              </button>
              <button 
                @click="isPrintUnit = true" 
                :class="[isPrintUnit ? 'bg-calmecac-turquoise text-black font-bold' : 'bg-calmecac-black border border-calmecac-border text-calmecac-gray']"
                class="px-1.5 py-0.5 font-condensed uppercase rounded transition-colors"
              >
                🖨️ Impresión (mm)
              </button>
            </div>

            <!-- CONTROL DE ESCALA SIMULTÁNEA -->
            <div class="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-calmecac-border text-[9px]">
              <span class="text-calmecac-gray">Escala:</span>
              <input type="range" min="50" max="200" v-model.number="simScale" class="w-14 accent-[#00B09B] cursor-pointer h-1" />
              <span class="font-mono text-calmecac-turquoise font-bold w-7 text-right">{{ simScale }}%</span>
            </div>
          </div>

          <!-- RENDERIZADO SIMULTÁNEO DE LAS 3 VARIANTES -->
          <div class="grid grid-cols-3 gap-1.5 mt-1 flex-1 items-stretch">
            <!-- 1. VECTOR (COMPLETO) -->
            <div 
              @click="selectVariant('vector')"
              :class="[
                activeVariant === 'vector' 
                  ? 'border-calmecac-turquoise bg-calmecac-turquoise/10' 
                  : (isDarkBg ? 'border-calmecac-border bg-black/40' : 'border-slate-300 bg-white/80')
              ]"
              class="border rounded p-1.5 flex flex-col items-center justify-between cursor-pointer transition-all hover:border-calmecac-turquoise"
            >
              <div class="text-[8px] font-condensed font-bold uppercase text-calmecac-turquoise flex items-center gap-1">
                <span>🔹 Vector</span>
              </div>
              <div 
                :class="[isDarkBg ? 'border-calmecac-turquoise/30 bg-black/30' : 'border-slate-400/40 bg-slate-100']"
                class="flex-1 flex items-center justify-center p-1 my-1 border border-dashed rounded w-full min-h-[55px]"
              >
                <div class="flex items-center justify-center transition-all">
                  <CalmecacLogo 
                    variant="vector" 
                    :color="isDarkBg ? 'turquoise' : 'black'" 
                    :size="Math.round((isPrintUnit ? 25 * 3.78 : 150) * (simScale / 100))" 
                    plain
                  />
                </div>
              </div>
              <div class="text-[8px] font-mono text-calmecac-gray text-center">
                {{ isPrintUnit ? '25.0 mm' : '150 px' }}
                <span v-if="simScale !== 100" class="text-calmecac-turquoise font-bold">({{ Math.round((isPrintUnit ? 25 : 150) * (simScale/100)) }}{{ isPrintUnit?'mm':'px' }})</span>
              </div>
            </div>

            <!-- 2. ISOTIPO (SÍMBOLO SOLO) -->
            <div 
              @click="selectVariant('isotipo')"
              :class="[
                activeVariant === 'isotipo' 
                  ? 'border-calmecac-turquoise bg-calmecac-turquoise/10' 
                  : (isDarkBg ? 'border-calmecac-border bg-black/40' : 'border-slate-300 bg-white/80')
              ]"
              class="border rounded p-1.5 flex flex-col items-center justify-between cursor-pointer transition-all hover:border-calmecac-turquoise"
            >
              <div class="text-[8px] font-condensed font-bold uppercase text-calmecac-turquoise flex items-center gap-1">
                <span>🌀 Isotipo</span>
              </div>
              <div 
                :class="[isDarkBg ? 'border-calmecac-turquoise/30 bg-black/30' : 'border-slate-400/40 bg-slate-100']"
                class="flex-1 flex items-center justify-center p-1 my-1 border border-dashed rounded w-full min-h-[55px]"
              >
                <div class="flex items-center justify-center transition-all">
                  <CalmecacLogo 
                    variant="isotipo" 
                    :color="isDarkBg ? 'turquoise' : 'black'" 
                    :size="Math.round((isPrintUnit ? 5 * 3.78 : 32) * (simScale / 100))" 
                    plain
                  />
                </div>
              </div>
              <div class="text-[8px] font-mono text-calmecac-gray text-center">
                {{ isPrintUnit ? '5.0 mm' : '32 px' }}
                <span v-if="simScale !== 100" class="text-calmecac-turquoise font-bold">({{ Math.round((isPrintUnit ? 5 : 32) * (simScale/100)) }}{{ isPrintUnit?'mm':'px' }})</span>
              </div>
            </div>

            <!-- 3. NOMBRE (WORDMARK SOLO) -->
            <div 
              @click="selectVariant('nombre')"
              :class="[
                activeVariant === 'nombre' 
                  ? 'border-calmecac-turquoise bg-calmecac-turquoise/10' 
                  : (isDarkBg ? 'border-calmecac-border bg-black/40' : 'border-slate-300 bg-white/80')
              ]"
              class="border rounded p-1.5 flex flex-col items-center justify-between cursor-pointer transition-all hover:border-calmecac-turquoise"
            >
              <div class="text-[8px] font-condensed font-bold uppercase text-calmecac-turquoise flex items-center gap-1">
                <span>🔤 Nombre</span>
              </div>
              <div 
                :class="[isDarkBg ? 'border-calmecac-turquoise/30 bg-black/30' : 'border-slate-400/40 bg-slate-100']"
                class="flex-1 flex items-center justify-center p-1 my-1 border border-dashed rounded w-full min-h-[55px]"
              >
                <div class="flex items-center justify-center transition-all">
                  <CalmecacLogo 
                    variant="nombre" 
                    :color="isDarkBg ? 'turquoise' : 'black'" 
                    :size="Math.round((isPrintUnit ? 15 * 3.78 : 100) * (simScale / 100))" 
                    plain
                  />
                </div>
              </div>
              <div class="text-[8px] font-mono text-calmecac-gray text-center">
                {{ isPrintUnit ? '15.0 mm' : '100 px' }}
                <span v-if="simScale !== 100" class="text-calmecac-turquoise font-bold">({{ Math.round((isPrintUnit ? 15 : 100) * (simScale/100)) }}{{ isPrintUnit?'mm':'px' }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: HIGH-DENSITY SPECS PANEL FOR ACTIVE VARIANT -->
      <div class="md:col-span-5 flex flex-col justify-between space-y-1">
        <!-- KEY CARDS FOR ACTIVE VARIANT -->
        <div class="grid grid-cols-2 gap-1.5">
          <div class="bg-calmecac-black border border-calmecac-border p-1 px-1.5 rounded">
            <span class="block text-[8px] font-condensed uppercase text-calmecac-gray">Límite Digital ({{ activeVariant }})</span>
            <span class="text-xs font-bold font-mono text-calmecac-turquoise">{{ variantConfig.minPx }} px</span>
            <span class="block text-[8px] text-calmecac-gray">Ancho mínimo web</span>
          </div>

          <div class="bg-calmecac-black border border-calmecac-border p-1 px-1.5 rounded">
            <span class="block text-[8px] font-condensed uppercase text-calmecac-gray">Límite Impresión ({{ activeVariant }})</span>
            <span class="text-xs font-bold font-mono text-calmecac-turquoise">{{ variantConfig.minMm }} mm</span>
            <span class="block text-[8px] text-calmecac-gray">Ancho mínimo offset</span>
          </div>
        </div>

        <!-- SPECS DYNAMIC TABLE -->
        <div class="border border-calmecac-border rounded overflow-hidden">
          <table class="w-full text-left text-[9px] border-collapse">
            <thead>
              <tr class="bg-calmecac-black text-calmecac-turquoise font-condensed uppercase border-b border-calmecac-border">
                <th class="p-1 px-1.5">Parámetro ({{ activeVariant }})</th>
                <th class="p-1 px-1.5 text-center">Vector</th>
                <th class="p-1 px-1.5 text-center">Digital</th>
                <th class="p-1 px-1.5 text-right">Impresión</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-calmecac-border/60 text-slate-300">
              <tr 
                class="hover:bg-white/10 cursor-pointer transition-colors"
                :class="{'bg-white/10': hoveredGuide === 'box'}"
                @mouseenter="hoveredGuide = 'box'" @mouseleave="hoveredGuide = null"
              >
                <td class="p-1 px-1.5 font-bold text-white">Ancho Base (W)</td>
                <td class="p-1 px-1.5 text-center font-mono text-calmecac-gray">{{ variantConfig.logoWidth.toFixed(2) }} u</td>
                <td class="p-1 px-1.5 text-center font-mono text-calmecac-turquoise font-bold">{{ variantConfig.minPx }} px</td>
                <td class="p-1 px-1.5 text-right font-mono text-calmecac-turquoise font-bold">{{ variantConfig.minMm.toFixed(1) }} mm</td>
              </tr>
              <tr 
                class="hover:bg-white/10 cursor-pointer transition-colors"
                :class="{'bg-white/10': hoveredGuide === 'box'}"
                @mouseenter="hoveredGuide = 'box'" @mouseleave="hoveredGuide = null"
              >
                <td class="p-1 px-1.5 font-bold text-white">Alto Base (H)</td>
                <td class="p-1 px-1.5 text-center font-mono text-calmecac-gray">{{ variantConfig.logoHeight.toFixed(2) }} u</td>
                <td class="p-1 px-1.5 text-center font-mono">{{ (variantConfig.minPx * (variantConfig.logoHeight / variantConfig.logoWidth)).toFixed(1) }} px</td>
                <td class="p-1 px-1.5 text-right font-mono">{{ (variantConfig.minMm * (variantConfig.logoHeight / variantConfig.logoWidth)).toFixed(1) }} mm</td>
              </tr>
              <tr 
                class="hover:bg-white/10 cursor-pointer transition-colors bg-calmecac-turquoise/5"
                :class="{'bg-calmecac-turquoise/20': hoveredGuide === 'module_x' || hoveredGuide === 'margin_left' || hoveredGuide === 'margin_right' || hoveredGuide === 'margin_top' || hoveredGuide === 'margin_bottom'}"
                @mouseenter="hoveredGuide = 'module_x'" @mouseleave="hoveredGuide = null"
              >
                <td class="p-1 px-1.5 font-bold text-calmecac-turquoise">Reserva (1X)</td>
                <td class="p-1 px-1.5 text-center font-mono text-calmecac-turquoise">33.21 u</td>
                <td class="p-1 px-1.5 text-center font-mono font-bold text-calmecac-turquoise">{{ (variantConfig.minPx * (33.21 / variantConfig.logoWidth)).toFixed(1) }} px</td>
                <td class="p-1 px-1.5 text-right font-mono font-bold text-calmecac-turquoise">{{ (variantConfig.minMm * (33.21 / variantConfig.logoWidth)).toFixed(2) }} mm</td>
              </tr>
              <tr 
                class="hover:bg-white/10 cursor-pointer transition-colors"
                :class="{'bg-white/10': hoveredGuide === 'total_protected'}"
                @mouseenter="hoveredGuide = 'total_protected'" @mouseleave="hoveredGuide = null"
              >
                <td class="p-1 px-1.5 font-bold text-white">Área Protegida Ancho</td>
                <td class="p-1 px-1.5 text-center font-mono text-calmecac-gray">{{ (variantConfig.logoWidth + 66.42).toFixed(2) }} u</td>
                <td class="p-1 px-1.5 text-center font-mono">{{ (variantConfig.minPx * ((variantConfig.logoWidth + 66.42) / variantConfig.logoWidth)).toFixed(1) }} px</td>
                <td class="p-1 px-1.5 text-right font-mono">{{ (variantConfig.minMm * ((variantConfig.logoWidth + 66.42) / variantConfig.logoWidth)).toFixed(1) }} mm</td>
              </tr>
              <tr 
                class="hover:bg-white/10 cursor-pointer transition-colors"
                :class="{'bg-white/10': hoveredGuide === 'total_protected'}"
                @mouseenter="hoveredGuide = 'total_protected'" @mouseleave="hoveredGuide = null"
              >
                <td class="p-1 px-1.5 font-bold text-white">Área Protegida Alto</td>
                <td class="p-1 px-1.5 text-center font-mono text-calmecac-gray">{{ (variantConfig.logoHeight + 66.42).toFixed(2) }} u</td>
                <td class="p-1 px-1.5 text-center font-mono">{{ (variantConfig.minPx * ((variantConfig.logoHeight + 66.42) / variantConfig.logoWidth)).toFixed(1) }} px</td>
                <td class="p-1 px-1.5 text-right font-mono">{{ (variantConfig.minMm * ((variantConfig.logoHeight + 66.42) / variantConfig.logoWidth)).toFixed(1) }} mm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- FOOTER BRAND RULE SUMMARY -->
        <div class="bg-calmecac-black/80 border border-calmecac-border p-1 px-1.5 rounded text-[9px] text-calmecac-gray leading-tight">
          <span class="text-calmecac-turquoise font-bold uppercase block mb-0.5 text-[8px]">Norma Intransigente:</span>
          Protección permitida libre = <strong class="text-white">1X (altura "C")</strong> alrededor de {{ variantConfig.label }}.
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalmecacLogo from './CalmecacLogo.vue'

type LogoVariant = 'vector' | 'isotipo' | 'nombre'

const activeVariant = ref<LogoVariant>('vector')
const activeMode = ref<'reserva' | 'reticula' | 'minimo'>('reserva')
const isDarkBg = ref(true)
const isPrintUnit = ref(false)
const simScale = ref(100)
const hoveredGuide = ref<string | null>(null)

const selectVariant = (v: LogoVariant) => {
  activeVariant.value = v
}

const togglePolarity = () => {
  isDarkBg.value = !isDarkBg.value
}

const variantConfig = computed(() => {
  switch (activeVariant.value) {
    case 'isotipo':
      return {
        label: 'Isotipo (Símbolo Solo)',
        logoWidth: 110,
        logoHeight: 128,
        minPx: 32,
        minMm: 5.0
      }
    case 'nombre':
      return {
        label: 'Nombre (Wordmark Solo)',
        logoWidth: 215,
        logoHeight: 55,
        minPx: 100,
        minMm: 15.0
      }
    case 'vector':
    default:
      return {
        label: 'Logotipo Completo (Vector)',
        logoWidth: 263.35,
        logoHeight: 127.37,
        minPx: 150,
        minMm: 25.0
      }
  }
})

const diagramViewBox = computed(() => {
  const w = variantConfig.value.logoWidth
  const h = variantConfig.value.logoHeight
  return `-45 -40 ${w + 90} ${h + 80}`
})

const reticulaViewBox = computed(() => {
  const w = variantConfig.value.logoWidth
  const h = variantConfig.value.logoHeight
  return `-20 -15 ${w + 40} ${h + 30}`
})

const capLineY = computed(() => {
  if (activeVariant.value === 'nombre') return 15.37
  return 45.37
})

const baseLineY = computed(() => {
  if (activeVariant.value === 'nombre') return 48.58
  return 78.58
})

const hoveredGuideText = computed(() => {
  switch (hoveredGuide.value) {
    case 'cap':
      return `Línea de Capitales (Cap Height): y = ${capLineY.value} u`
    case 'base':
      return `Línea de Base (Baseline): y = ${baseLineY.value} u`
    case 'center':
      return 'Centro Geométrico del Símbolo'
    case 'isotipo_box':
      return 'Caja del Isotipo: 110.00 u × 128.00 u'
    case 'wordmark_box':
      return 'Caja del Wordmark: 213.35 u × 44.11 u'
    case 'box':
      return `Caja de ${variantConfig.value.label}: ${variantConfig.value.logoWidth} u × ${variantConfig.value.logoHeight} u`
    case 'module_x':
      return 'Módulo X = 33.21 u (Altura de la letra "C")'
    case 'margin_left':
      return 'Margen Izquierdo 1X = 33.21 u'
    case 'margin_right':
      return 'Margen Derecho 1X = 33.21 u'
    case 'margin_top':
      return 'Margen Superior 1X = 33.21 u'
    case 'margin_bottom':
      return 'Margen Inferior 1X = 33.21 u'
    case 'total_protected':
      return `Área Protegida Total (${activeVariant.value}): ${(variantConfig.value.logoWidth + 66.42).toFixed(2)} u × ${(variantConfig.value.logoHeight + 66.42).toFixed(2)} u`
    default:
      return null
  }
})
</script>

<style scoped>
.stroke-6, .stroke-613 {
  stroke-miterlimit: 10;
  fill: none;
}
.stroke-6 { stroke-width: 6px; }
.stroke-613 { stroke-width: 6.13px; }
.wordmark-fill {
  stroke-miterlimit: 10;
}
</style>
