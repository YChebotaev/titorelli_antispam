import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AntispamClient',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => format === 'cjs' ? `antispam-client.${format}` : `antispam-client.${format}.js`,
    },
    rollupOptions: {
      external: ['axios'],
      output: {
        globals: {
          axios: "axios"
        },
      },
    }
  }
})
