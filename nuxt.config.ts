// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxt/icon'],
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
});