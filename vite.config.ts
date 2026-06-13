import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolves Figma Make specific protocols to standard local paths
function figmaMakePlugin() {
  // Map of known figma:asset hashes to local public files
  const assetMap: Record<string, string> = {
    'c99ae1da33620770f0b3857576d2e7512ef1ce15.png': '/logo.png',
  }

  return {
    name: 'vite-plugin-figma-make',
    resolveId(id: string) {
      // Resolve figma:asset/hash.png -> /public/logo.png
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        const mapped = assetMap[filename]
        if (mapped) return `\0figma-asset:${mapped}`
        // Fallback: strip the protocol and serve from public root
        return `\0figma-asset:/${filename}`
      }
      // Strip versioned package imports: pkg@1.2.3 -> pkg
      if (/@\d+\.\d+\.\d+/.test(id)) {
        return { id: id.replace(/@\d+\.\d+\.\d+/, ''), external: false }
      }
      return null
    },
    load(id: string) {
      if (id.startsWith('\0figma-asset:')) {
        const url = id.replace('\0figma-asset:', '')
        return `export default ${JSON.stringify(url)}`
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    figmaMakePlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
