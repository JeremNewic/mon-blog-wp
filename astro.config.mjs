import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321', 
   vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src/',
      },
    },
  },
  integrations: [
    sitemap({
      // Génère automatiquement le sitemap.xml
      filter: (page) => !page.includes('/admin/'),
    })
  ],
  image: {
    // Permet d'optimiser les images depuis WordPress
    domains: ['mon-blog-wp.local'], 
    remotePatterns: [{
      protocol: 'http',
      hostname: 'mon-blog-wp.local',
    }],
  },
  output: 'static', // Génération statique pour performance maximale
  build: {
    inlineStylesheets: 'auto',
  },
});