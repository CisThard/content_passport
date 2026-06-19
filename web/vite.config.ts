import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// extensionAlias lets us import the node-ESM library in ../src (which uses
// explicit `.js` specifiers) directly as TypeScript source.
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensionAlias: { '.js': ['.ts', '.js'] },
  },
})
