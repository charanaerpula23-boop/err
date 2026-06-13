import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://erripuku.engineer',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [],
      serialize(item) {
        // Boost individual sound pages
        if (item.url.includes('/sounds/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (item.url === 'https://erripuku.engineer/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        return item;
      },
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
});
