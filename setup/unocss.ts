import { defineUnoSetup } from '@slidev/types'

export default defineUnoSetup(() => ({
  theme: {
    colors: {
      calmecac: {
        bg: 'var(--calmecac-bg)',
        fg: 'var(--calmecac-fg)',
        black: '#09090B',
        turquoise: '#00B09B',
        white: '#FFFFFF',
        surface: 'var(--calmecac-surface)',
        card: 'var(--calmecac-card-bg)',
        border: 'var(--calmecac-border)',
        gray: 'var(--calmecac-gray)',
        darkgray: 'var(--calmecac-gray-dark)',
        heading: 'var(--calmecac-heading)',
        // Paleta Secundaria para Resaltados y Acentos
        gold: '#FFB800',
        coral: '#FF6B35',
        magenta: '#FF4EA8',
        mint: '#2ECDB7',
        violet: '#9D4EDD',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      condensed: ['"Roboto Condensed"', 'sans-serif'],
    },
  },
  shortcuts: {
    'bg-main': 'bg-[var(--calmecac-bg)] text-[var(--calmecac-fg)]',
    'text-accent': 'text-calmecac-turquoise',
    'border-accent': 'border-calmecac-turquoise',
    'bg-card': 'bg-[var(--calmecac-card-bg)] border border-[var(--calmecac-border)] border-t-2 border-t-calmecac-turquoise',
    'font-header': 'font-condensed font-bold uppercase tracking-wider',
  },
}))

